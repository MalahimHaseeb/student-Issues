import connectDb from '@/Middleware/mongoose';
import User from '@/Models/User';
import { NextApiRequest, NextApiResponse } from 'next';
var jsonwebtoken = require('jsonwebtoken');

var CryptoJS = require("crypto-js");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const token: string = req.body.token;
      const user: any = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      const dbuser: any = await User.findOne({ email: user.email });

      if (!dbuser) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      const decryptedPassword: string = CryptoJS.AES.decrypt(dbuser.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === req.body.password && req.body.newpassword === req.body.cpassword) {
        const newPasswordEncrypted: string = CryptoJS.AES.encrypt(req.body.cpassword, process.env.SECRET_KEY).toString();

        await User.findOneAndUpdate({ email: user.email }, { password: newPasswordEncrypted });

        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, message: 'Invalid password or new password mismatch' });
      }
    } else {
      res.status(400).json({ error: 'Bad request' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in updating password', error });
  }
};

export default connectDb(handler);
