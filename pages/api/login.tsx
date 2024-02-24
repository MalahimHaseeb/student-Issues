import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/Models/User';
import connectDb from '@/Middleware/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const user: IUser | null = await User.findOne({ "email": req.body.email });
            if (user) {
                const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
                if (req.body.email === user.email && req.body.password === decryptedPassword) {
                    const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '3d' });
                    res.status(200).json({ success: true, token, email: user.email });
                } else {
                    res.status(500).json({ success: false, message: "Invalid Credentials" });
                }
            } else {
                res.status(402).json({ success: false, message: "No user found" });
            }
        } else {
            res.status(400).json({ success: false, message: 'This method is not allowed' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error in login', error });
    }
};

export default connectDb(handler);
