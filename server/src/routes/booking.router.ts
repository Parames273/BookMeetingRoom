import express from 'express';
import { bookingController } from '../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.get('/:sapId', bookingController.getBookingController);
bookingRouter.post('/:sapId', bookingController.addBookingController );

export default bookingRouter;