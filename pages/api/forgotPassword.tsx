import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/Models/User';
import connectDb from '@/Middleware/mongoose';
var CryptoJS = require("crypto-js");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let friend = CryptoJS.AES.decrypt(user.friend, process.env.SECRET_KEY1).toString(CryptoJS.enc.Utf8);
        let password = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (req.body.email === user.email && req.body.friend === friend) {
          res.status(200).send({
            success: true,
            email: user.email,
            password,
          });
        } else {
          res.status(500).send({
            success: false,
            message: 'Invalid Credentials',
          });
        }
      } else {
        res.status(402).send({
          success: false,
          message: 'No user found',
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: 'This method is not allowed',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in reset password',
      error,
    });
  }
};

export default connectDb(handler);
