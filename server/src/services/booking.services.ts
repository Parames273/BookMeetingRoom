import bookingModel from "../models/booking.model";
import logger from "../utils/logger";

/**
 * Retrieves the booking history for a given SAP ID.
 * @param {string} sapId - The SAP ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of booking history objects.
 */
const getBookingHistory = async (sapId: string) => {
    try {
        return await bookingModel.find({ sapId: sapId });
    } catch (e) {
        logger.error(e);
        console.log(e);
    }
};

/**
 * Adds a new booking to the database.
 * @param {object} body - The booking details.
 * @returns {Promise<object>} - A promise that resolves to the added booking object.
 */
const addBooking = async (body: object) => {
    try {
        return await bookingModel.insertOne(body);
    } catch (e) {
        logger.error(e);
        console.log(e);
    }
};

export const bookingServise = { addBooking, getBookingHistory };