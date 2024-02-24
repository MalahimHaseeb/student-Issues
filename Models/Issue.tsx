// In the Issue module (Issue.tsx)
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIssue extends Document {
    name: string;
    department: string;
    semester: string;
    description: string;
    email: string;
    gender?: string;
    contactNumber: string; // Changed to string as it's more suitable for phone numbers
    shift : String ;
    resolved: string
    createdAt: Date;
    updatedAt: Date;
}

const IssueSchema: Schema<IIssue> = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String  ,required:true },
    contactNumber: { type: String,required:true }, // Changed type to String
    shift  : {type : String , required : true} ,
    resolved  : {type : String , default: "0"} ,
}, { timestamps: true });

const Issue: Model<IIssue> = mongoose.models.Issue || mongoose.model<IIssue>('Issue', IssueSchema);

export default Issue;
