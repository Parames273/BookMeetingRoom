import { SERVER_ERROR, UPDATE_PROFILE_SUCCESS, USER_DETAILS_FETCHED, USER_NOT_EXISTS } from "../constants";
import User from "../models/user.model";
import { IUpdateProfile, IUserDetails } from "../typings";

/**
 * Fetches a user's details.
 * @param {Object} params - The user details.
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<Object>} The response object containing status and data.
 */
export const userDetails = async ({ userId }: IUserDetails): Promise<{ status: number; data: any }> => {
    try {
        // Check for user
        const user = await User.findById(userId).select('-password');;
        if (!user) {
            return { status: 400, data: { message: USER_NOT_EXISTS } };
        }

        return {
            status: 200,
            data: {
                message: USER_DETAILS_FETCHED,
                user,
            },
        };
    } catch (error) {
        throw new Error(SERVER_ERROR);
    }
};

/**
 * Updates a user's profile.
 * @param {Object} params - The profile details.
 * @param {string} req.body.userId - The id of the user.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {number} req.body.phoneNumber - The phone number of the user.
 * @param {number} req.body.age - The age of the user.
 * @param {number} req.body.height - The height of the user.
 * @param {number} req.body.weight - The weight of the user.
 * @returns {Promise<Object>} The response object containing status and data.
 */
export const userUpdateProfile = async ({ userId, name, email, phoneNumber, age, height, weight }: IUpdateProfile): Promise<{ status: number; data: any }> => {
    try {
        // Check for user
        const _id = userId;
        const user = await User.findOne({ _id }).select('-password');;
        if (!user) {
            return { status: 400, data: { message: USER_NOT_EXISTS } };
        }

        // Update user profile
        user.email = email;
        user.name = name;
        user.phoneNumber = phoneNumber;
        user.age = age;
        user.height = height;
        user.weight = weight;

        await user.save();

        return {
            status: 200,
            data: {
                message: UPDATE_PROFILE_SUCCESS,
                user,
            },
        };
    } catch (error) {
        throw new Error(SERVER_ERROR);
    }
};