import express, { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../validators/authValidator';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, registerUser);
authRouter.post('/login', loginValidator, (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, loginUser);

export default authRouter;