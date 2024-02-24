import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from "@/Middleware/mongoose";
import IssueModel, { IIssue } from "@/Models/Issue"; // Assuming you have an Issue model defined

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') { // Change method to GET
            const { id } = req.query; // Use req.query to get the ID from the query parameters
            if (!id) {
                return res.status(400).json({ error: "ID parameter is required" });
            }
            const issue: IIssue | null = await IssueModel.findById(id);
            if (issue) {
                res.status(200).json(issue);
            } else {
                res.status(404).json({ error: "Issue not found" });
            }
        } else {
            res.status(400).json({ error: "Bad request" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getting issue data',
            error
        });
    }
};


export default connectDb(handler);
