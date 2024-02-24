import connectDb from '@/Middleware/mongoose';
import User, { IUser } from '@/Models/User';
import { NextApiRequest, NextApiResponse } from 'next';
var jsonwebtoken = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'PUT') {
      const token: string = req.body.token;
      const user: any = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      const dbuser: IUser | null = await User.findOneAndUpdate(
        { email: user.email },
        {
          address: req.body.address,
          pincode: req.body.pincode,
          phone: req.body.phone,
          name: req.body.name,
        },
        { new: true }
      );

      if (dbuser) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } else {
      res.status(400).json({ error: 'Bad request' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in updating user', error });
  }
};

export default connectDb(handler);
