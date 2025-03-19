import bcrypt from 'bcryptjs';
import { INVALID_CREDENTIALS, LOGIN_SUCCESS, REGISTRATION_SUCCESS, SERVER_ERROR, USER_ALREADY_EXISTS, USER_NOT_EXISTS } from "../constants"
import User, { IUser } from "../models/user.model";
import { LoginUserParams } from "../typings";
import { generateToken } from '../utils/jwtHelper';

/**
 * Registers a new user.
 * @param {Object} params - The user details.
 * @param {string} params.name - The name of the user.
 * @param {string} params.phoneNumber - The phone number of the user.
 * @param {string} params.email - The email of the user.
 * @param {string} params.password - The password of the user.
 * @param {string} params.gender - The gender of the user.
 * @param {number} params.age - The age of the user.
 * @param {number} params.height - The height of the user.
 * @param {number} params.weight - The weight of the user.
 * @param {string} params.bloodGroup - The blood group of the user.
 * @param {string} [params.assignedDoctor] - The ID of the assigned doctor (for patients).
 * @param {string[]} [params.assignedPatients] - The IDs of assigned patients (for doctors).
 * @returns {Promise<Object>} The response object containing status and data.
 */
export const userRegister = async ({ name, email, phoneNumber, password, gender, age, height, weight, bloodGroup, assignedDoctor, assignedPatients }: IUser) => {
    try {
        // Check existing user by email & phone
        const existingUserByEmail = await User.findOne({ email });
 
        if (existingUserByEmail) {
            return { status: 409, data: { message: USER_ALREADY_EXISTS } };
        }
 
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
 
        // Determine role and create new user
        let newUser;
        if (!assignedDoctor) {
            newUser = new User({
                name,
                email,
                phoneNumber,
                password: hashedPassword,
                role: "patient",
                gender,
                age,
                height,
                weight,
                bloodGroup,
                assignedDoctor,
                healthMetrics: [],
                messages: []
            });
        } else {
            newUser = new User({
                name,
                email,
                phoneNumber,
                password: hashedPassword,
                role: "doctor",
                gender,
                age,
                height,
                weight,
                bloodGroup,
                assignedPatients: assignedPatients || [],
                healthMetrics: [],
                messages: []
            });
        }

        await newUser.save();
 
        // Update assigned doctor and patients
        if (assignedDoctor) {
            await User.findByIdAndUpdate(assignedDoctor, { $push: { assignedPatients: newUser._id } });
        }
 
        if (assignedPatients && assignedPatients.length > 0) {
            await User.updateMany({ _id: { $in: assignedPatients } }, { $set: { assignedDoctor: newUser._id } });
        }
 
        return {
            status: 201,
            data: {
                message: REGISTRATION_SUCCESS,
                userName: newUser.name
            }
        };
    } catch (error) {
        return { status: 500, data: { message: error } };
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