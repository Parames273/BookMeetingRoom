import express from 'express';
import { profile, updateProfile } from '../controllers/profile.controller';

const profileRouter = express.Router();

profileRouter.get('/:userId', profile);
profileRouter.patch('/', updateProfile);

export default profileRouter;