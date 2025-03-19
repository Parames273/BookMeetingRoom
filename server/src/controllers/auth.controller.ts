import { Request, Response } from "express"
import { SERVER_ERROR } from "../constants";
import { userLogin, userRegister } from "../services/auth.services";
import logger from "../utils/logger";

/**
 * Register users
 *
 * @param req - register the users using details from req body
 * @param res - send proper message and payload after register
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        // const { userName, email, phoneNumber, password, gender } = req.body;
        const result = await userRegister(req.body);
        res.status(result.status).json(result.data);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: SERVER_ERROR });
    }
};

/**
 * Login users
 * 
 * @param req - login using mail-id and password from req body
 * @param res - send proper message and payload after login
 */
export const loginUser = async(req: Request, res:Response) => {
    try{
        const { email, password } = req.body;
        const result = await userLogin({ email, password });
        res.status(result.status).json({data:result.data});
    }catch(error){
        logger.error(error);
        res.status(500).json({message:SERVER_ERROR});
    }
};