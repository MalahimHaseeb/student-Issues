import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from "@/Models/User";

const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email } = req.body;
        // console.log(email)
         // Get the email from the request body
        const user: IUser | null = await User.findOne({ email });
        if (!user ) { //|| user.role !== 1
            return false; // Return false if user is not an admin
        }
        return true; // Return true if user is an admin
    } catch (error) {
        console.error("Error in admin middleware:", error);
        res.status(500).json({
            success: false,
            error,
            message: "Error in admin middleware",
        });
        return false; // Return false in case of error
    }
};

export default isAdmin;
