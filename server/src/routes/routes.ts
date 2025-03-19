import express from "express";
import authRouter from "./auth.router";
import profileRouter from "./profile.router";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

export default router;