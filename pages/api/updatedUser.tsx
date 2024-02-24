import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/Middleware/mongoose';
import User, { IUser } from '@/Models/User';
var jsonwebtoken = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'PUT') {
            const token: string = req.body.token;
            const user: any = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            const updatedUser: Partial<IUser> = {
                address: req.body.address,
                phone: req.body.phone,
                name: req.body.name
            };
            const dbUser: IUser | null = await User.findOneAndUpdate({ email: user.email }, updatedUser, { new: true });
            if (dbUser) {
                res.status(200).json({ success: true });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } else {
            res.status(400).json({ error: "Invalid request method" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Server Error', error });
    }
};

export default connectDb(handler);
