import { Document, ObjectId } from 'mongoose';

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface IUpdateProfile {
    userId:string;
    name: string;
    email: string;
    phoneNumber: number;
    age: number;
    height: number;
    weight: number;
}

export interface IUserDetails{
    userId: string
}



export interface IBooking extends Document {
  SapId: ObjectId;
  RoomId: ObjectId;
  Date: string;
  StartTime: string;
  EndTime: string;
  Status: 'Pending' | 'Rejected' | 'Approved';
}