import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/Middleware/mongoose';
import Issue, { IIssue } from '@/Models/Issue';
import isAdmin from './adminApi';
var jsonwebtoken = require('jsonwebtoken');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const token = req.body.token;
            if (!token) {
                return res.status(400).json({ error: 'Token is required' });
            }

            // Verify the token
            const decodedToken = jsonwebtoken.verify(token, process.env.JWT_SECRET) as { email: string };

            // Check if the user is an admin
            const admin = await isAdmin(req, res);
            if (!admin) {
                return res.status(403).json({ error: 'Forbidden' });
            }

            // Fetch the issue data from the database
            const dbIssues: IIssue[] = await Issue.find({ email: decodedToken.email }); // Fetch all issues for the user
            return res.status(200).json(dbIssues);
        } else {
            return res.status(400).json({ error: 'Bad request' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default connectDb(handler);
