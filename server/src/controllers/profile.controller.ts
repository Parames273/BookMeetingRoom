import { Request, Response, NextFunction } from 'express';
import { userDetails, userUpdateProfile } from "../services/profile.services"
import logger from '../utils/logger';
import { SERVER_ERROR } from "../constants"

/**
 * Fetch user profile
 * 
 * @param req - request object containing userId in params
 * @param res - response object to send the user profile data
 */
export const profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const response = await userDetails({ userId });
        res.status(response.status).json({ data: response.data });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: SERVER_ERROR });
    }
};

/**
 * Update users
 * 
 * @param req - update profile from req body
 * @param res - send proper message and payload after login
 */
export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId, name, email, phoneNumber, age, height, weight } = req.body;
        const result = await userUpdateProfile({ userId, name, email, phoneNumber, age, height, weight });
        res.status(result.status).json({ data: result.data });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: SERVER_ERROR });
    }
};