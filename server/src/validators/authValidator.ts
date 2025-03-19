import { body } from "express-validator";

export const loginValidator = [
    body('email','Email does not empty').not().isEmpty(),
    body('email','Invalid email').isEmail(),
    body('password','The password length should be minimum 8 characters').isLength({min:8}),
]

export const registerValidator = [
    body('userName','Username does not empty').not().isEmpty(),
    body('email','Inavalid email').isEmail(),
    body('email','Invalid does not empty').not().isEmpty(),
    body('password','Password does not empty').not().isEmpty(),
    body('password','The password length should be minimum 8 characters').isLength({min:8}),
    body('phoneNumber','Phone number does not empty').not().isEmpty(),
    body('gender','Gender does not empty').not().isEmpty(),
]