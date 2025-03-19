import { Request, Response } from 'express'
import logger from '../utils/logger';
import { bookingServise } from '../services/booking.services';

/**
 * Controller to handle Book.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */

const getBookingController = async (req: Request, res: Response) => {
    try{
        const {sapId} = req.params
        const result = await bookingServise.getBookingHistory(sapId);
        res.send(result);
    } catch (e) {
        logger.error(e);
        res.status(500).send(e);
    }
}

const addBookingController = async (req: Request, res: Response) => {
    try{
        const body = req.body
        const result = await bookingServise.addBooking(body);
        res.send(result);
    } catch (e) {
        logger.error(e);
        res.status(500).send(e);
    }
}

export const bookingController = {addBookingController, getBookingController}