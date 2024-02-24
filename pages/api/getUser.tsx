import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from "@/Middleware/mongoose";
import User, { IUser } from "@/Models/User";
var jsonwebtoken = require('jsonwebtoken');
import isAdmin from "./adminApi"; // Adjusted import statement

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const token = req.body.token;
            const user = jsonwebtoken.verify(token, process.env.JWT_SECRET) as { email: string };
            // Call isAdmin function to check if the user is an admin
            const admin = await isAdmin(req, res); // Call isAdmin and await its result
            if (admin) {
                const dbuser: IUser | null = await User.findOne({ email: user.email });
                if (dbuser) {
                    const { name, email, address, phone } = dbuser;
                    // console.log(name, email, address, phone)
                    res.status(200).json({ name, email, address, phone });
                } else {
                    res.status(404).json({ error: "User not found" });
                }
            } else {
                res.status(403).json({ error: "Forbidden" }); // Return Forbidden status if user is not an admin
            }
        } else {
            res.status(400).json({ error: "Bad request" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getting user data',
            error
        });
    }
};

export default connectDb(handler);
