import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/Models/User';
import connectDb from '@/Middleware/mongoose';
var CryptoJS = require("crypto-js");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { name, email, friend, password } = req.body;

            const encryptedFriend = CryptoJS.AES.encrypt(friend, process.env.SECRET_KEY1).toString();
            const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

            const u = new User({ name, email, friend: encryptedFriend, password: encryptedPassword });
            await u.save();

            res.status(200).json({
                success: true,
                message: 'Your account has been created',
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'This method is not allowed',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in adding User',
            error,
        });
    }
};

export default connectDb(handler);
