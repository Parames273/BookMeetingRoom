import jwt from "jsonwebtoken";
import config from "../configs/env.config";


export const generateToken = (userId: string, role: string) => {
    return jwt.sign({userId, role}, config.jwtSecret, {expiresIn: '1d'})
}