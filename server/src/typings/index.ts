
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

export interface IResponse<T = undefined> {
    data: T | undefined,
    httpCode: number;
    statusCode: string;
    message: string,
    error?: string | unknown | null,
}