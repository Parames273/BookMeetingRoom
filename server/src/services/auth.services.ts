import bcrypt from 'bcryptjs';
import { INVALID_CREDENTIALS, LOGIN_SUCCESS, REGISTRATION_SUCCESS, SERVER_ERROR, USER_ALREADY_EXISTS, USER_NOT_EXISTS } from "../constants"
import User, { IUser } from "../models/user.model";
import { LoginUserParams } from "../typings";
import { generateToken } from '../utils/jwtHelper';

/**
 * Registers a new employee.
 * @param {Object} params - The user details.
 * @param {string} params.name - The name of the user.
 * @param {string} params.phoneNumber - The phone number of the user.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @param {string} params.gender - The gender of the user.
 * @returns {Promise<Object>} The response object containing status and data.
 */
export const userRegister = async ({ name, email, phoneNumber, password, gender, designation }: IUser) => {
    try {
        // Check existing user by email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return { status: 'IN001', data: { message: USER_ALREADY_EXISTS } };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Generate random SapId with 8 digits
        const genSapId = Math.floor(Math.random() * 100000000);

        // Create new user
        const newUser = new User({
            name,
            sapId: genSapId,
            email,
            phoneNumber,
            password: hashedPassword,
            role: "employee",
            gender,
            designation,
        });

        await newUser.save();

        return {
            status: 'IN003',
            data: {
                message: REGISTRATION_SUCCESS,
                userName: newUser.name,
                sapId: newUser.sapId,
                email: newUser.email
            }
        };
    } catch (error) {
        return { status: 'IN011', data: { message: SERVER_ERROR } };
    }
};

/**
 * LogIn an user.
 * @param {Object} params - The login details.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @returns {Promise<Object>} The response object containing status and data.
 */
export const userLogin = async({email, password}:LoginUserParams) => {
    try{
        //check for user
        const user = await User.findOne({email});
        if(!user){
            return {status:404, data: { message: USER_NOT_EXISTS}}
        };

        //comparing password with db
        if(!(await bcrypt.compare(password, user.password))){
            return { status: 400, data: {message: INVALID_CREDENTIALS}}
        }
        return {
            status:200,
            data: {
                token: generateToken(String(user._id), user.role),
                data:{name: user.name, _id:user._id,role:user.role},
                message: LOGIN_SUCCESS
            }
        };
    }catch(error){
        throw new Error(SERVER_ERROR);
    }
};