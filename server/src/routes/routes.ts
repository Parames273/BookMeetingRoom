import express from "express";
import authRouter from "./auth.router";
import profileRouter from "./profile.router";
import bookingRouter from "./booking.router";
const router = express.Router();

router.use('/auth', authRouter);

router.use('/profile', profileRouter);
router.use('/booking', bookingRouter);


export default router;