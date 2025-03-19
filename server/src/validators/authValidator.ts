import { body } from "express-validator";

export const loginValidator = [
    body('email','Email does not empty').not().isEmpty(),
    body('email','Invalid email').isEmail(),
    body('password','The password length should be minimum 8 characters').isLength({min:8}),
]

// Register validators
export const registerValidator = [
    body('name', 'Name must not be empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('email', 'Email must not be empty').not().isEmpty(),
    body('password', 'Password must not be empty').not().isEmpty(),
    body('password', 'Password length should be minimum 8 characters').isLength({ min: 8 }),
    body('phoneNumber', 'Phone number must not be empty').not().isEmpty(),
    body('phoneNumber', 'Phone number must be a valid number').isNumeric(),
    body('gender', 'Gender must not be empty').not().isEmpty(),
    body('designation', 'Designation must not be empty').not().isEmpty(),
];
