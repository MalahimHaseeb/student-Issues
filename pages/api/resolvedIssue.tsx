// pages/api/updateUserRole.ts

import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Issue, { IIssue } from '@/Models/Issue';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Parse the request body
    const { userId, resolved }: { userId?: string; resolved?: string } = req.body;

    // Check if userId or role is undefined
    if (!userId || !resolved) {
      return res.status(400).json({ message: 'userId or role is missing' });
    }

    // Connect to the MongoDB database
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI || ' ');
    }

    // Find and update the user
    const updatedUser: IIssue | null = await Issue.findOneAndUpdate(
      { _id: userId },
      { $set: { resolved } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
