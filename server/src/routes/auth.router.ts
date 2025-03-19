import express, { NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { loginUser } from '../controllers/auth.controller';
import { loginValidator } from '../validators/authValidator';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, (req: any, res: any, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, loginUser);

export default authRouter;