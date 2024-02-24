import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/Middleware/mongoose';
import Issue, { IIssue } from '@/Models/Issue';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { name, department, semester, description, email, gender,  contactNumber , shift }: IIssue = req.body;
            const newIssue: IIssue = new Issue({
                name,
                department,
                semester,
                description,
                email,
                gender,
                contactNumber,
                shift
            });
            const savedIssue: IIssue = await newIssue.save();
            res.status(201).json(savedIssue);
        } else if (req.method === 'GET') {
            const issues: IIssue[] = await Issue.find();
            res.status(200).json(issues);
        } else {
            res.status(400).json({ message: 'This method is not allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default connectDb(handler);
