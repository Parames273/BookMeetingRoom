import bookingModel from "../models/booking.model";
import logger from "../utils/logger";

const getBookingHistory = async (sapId : string) => {
    try{
        return await bookingModel.find({sapId: sapId});
    }
    catch(e){
        logger.error(e)
        console.log(e)
    }
};
const addBooking = async (body : object) => {
    try{
        return await bookingModel.insertOne(body);
    }
    catch(e){
        logger.error(e)
        console.log(e)
    }
};

export const bookingServise = {addBooking, getBookingHistory}