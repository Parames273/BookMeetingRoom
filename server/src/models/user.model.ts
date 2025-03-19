import mongoose, { Schema, Document } from 'mongoose';

// Define the IUser interface
export interface IUser extends Document {
    _id: string;
    name: string;
    sapId: number;
    email: string;
    password: string;
    phoneNumber: number;
    gender: string;
    designation: string;
    role: string;
}

// Define the schema for the User collection
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    sapId: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    gender: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, required: true },
});

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;