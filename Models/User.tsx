import mongoose, { Schema, Document, Model } from 'mongoose';



export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    address?: string;
    friend: string;
    phone?: string;
    role: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String, default: '' },
        friend: { type: String, required: true },
        phone: { type: String, default: '' },
        role: { type: String, default: "0" }
    },
    { timestamps: true }
);

// Ensure model is registered properly
mongoose.models = {};
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
