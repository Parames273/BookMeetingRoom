import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
    _id:string
    name: string;
    email: string;
    password: string;
    phoneNumber: number;
    gender: string;
    role: string;
    age: number;
    height: number;
    weight: number;
    bloodGroup: string;
    healthMetrics: {
        date: Date;
        bloodPressure: string;
        bloodSugar: number;
        heartRate: number;
        bodyTemperature: number;
        medications: string;
    }[];
    assignedDoctor?: mongoose.Schema.Types.ObjectId;
    assignedPatients?: mongoose.Schema.Types.ObjectId[];
    messages: {
        date: Date;
        message: string;
        doctorId: mongoose.Schema.Types.ObjectId;
    }[];
}

// Define the schema for the User collection
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    gender: { type: String, required: true },
    role: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    healthMetrics: [{
        date: { type: Date, default: Date.now },
        bloodPressure: { type: String, required: true },
        bloodSugar: { type: Number, required: true },
        heartRate: { type: Number, required: true },
        bodyTemperature: { type: Number, required: true },
        medications: { type: String, required: true },
    }],
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    assignedPatients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    messages: [{
        date: { type: Date, default: Date.now },
        message: { type: String, required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    }],
});
 
// Middleware to handle doctor-patient assignments
UserSchema.pre('save', async function (next) {
    if (this.role === 'patient') {
        this.assignedPatients = undefined;
    } else if (this.role === 'doctor') {
        this.assignedDoctor = undefined;
    }
    next();
});
 
// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;