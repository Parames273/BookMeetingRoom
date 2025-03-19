import { Request, Response } from 'express';
import logger from '../utils/logger';
import { bookingServise } from '../services/booking.services';

/**
 * Controller to handle fetching booking history.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const getBookingController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sapId } = req.params;
        const result = await bookingServise.getBookingHistory(sapId);
        res.send(result);
    } catch (e) {
        logger.error(e);
        res.status(500).send(e);
    }
};

/**
 * Controller to handle adding a new booking.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
const addBookingController = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const result = await bookingServise.addBooking(body);
        res.send(result);
    } catch (e) {
        logger.error(e);
        res.status(500).send(e);
    }
};

export const bookingController = { addBookingController, getBookingController };