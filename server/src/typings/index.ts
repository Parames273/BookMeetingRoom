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

