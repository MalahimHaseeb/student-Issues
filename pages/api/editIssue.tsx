// Backend: editIssue API

import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '@/Middleware/mongoose';
import Issue, { IIssue } from '@/Models/Issue';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'PUT') {
            const { id } = req.query; // Use req.query to get the ID from the query parameters
            if (!id) {
                return res.status(400).json({ error: "ID parameter is required" });
            }
            const {  name, department, semester, description, email, gender, contactNumber, shift }: IIssue = req.body;
            console.log(id)
            const updatedIssue: IIssue | null = await Issue.findByIdAndUpdate(id, {
                name,
                department,
                semester,
                description,
                email,
                gender,
                contactNumber,
                shift
            }, { new: true });
            if (!updatedIssue) {
                return res.status(404).json({ message: 'Issue not found' });
            }
            res.status(200).json(updatedIssue);
        } else {
            res.status(400).json({ message: 'This method is not allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export default connectDb(handler);
