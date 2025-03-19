import { Request, Response } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { bookingServise } from '../services/booking.services';
import logger from '../utils/logger';

jest.mock('../services/booking.services');
jest.mock('../utils/logger');

describe('Booking Controller', () => {
    describe('getBookingController', () => {
        it('should return booking history for a given sapId', async () => {
            const req = { params: { sapId: '12345' } } as unknown as Request;
            const res = { send: jest.fn() } as unknown as Response;
            const mockBookingHistory = [{ id: 1, sapId: '12345', details: 'Booking details' }];
            (bookingServise.getBookingHistory as jest.Mock).mockResolvedValue(mockBookingHistory);

            await bookingController.getBookingController(req, res);

            expect(res.send).toHaveBeenCalledWith(mockBookingHistory);
            expect(bookingServise.getBookingHistory).toHaveBeenCalledWith('12345');
        });

        it('should log error and return 500 if an error occurs', async () => {
            const req = { params: { sapId: '12345' } } as unknown as Request;
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
            const mockError = new Error('Database error');
            (bookingServise.getBookingHistory as jest.Mock).mockRejectedValue(mockError);

            await bookingController.getBookingController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(mockError);
            expect(logger.error).toHaveBeenCalledWith(mockError);
        });
    });

    describe('addBookingController', () => {
        it('should add a booking and return the result', async () => {
            const req = { body: { id: 1, sapId: '12345', details: 'Booking details' } } as unknown as Request;
            const res = { send: jest.fn() } as unknown as Response;
            const bookingData = { id: 1, sapId: '12345', details: 'Booking details' };
            (bookingServise.addBooking as jest.Mock).mockResolvedValue(bookingData);

            await bookingController.addBookingController(req, res);

            expect(res.send).toHaveBeenCalledWith(bookingData);
            expect(bookingServise.addBooking).toHaveBeenCalledWith(req.body);
        });

        it('should log error and return 500 if an error occurs', async () => {
            const req = { body: { id: 1, sapId: '12345', details: 'Booking details' } } as unknown as Request;
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
            const mockError = new Error('Database error');
            (bookingServise.addBooking as jest.Mock).mockRejectedValue(mockError);

            await bookingController.addBookingController(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(mockError);
            expect(logger.error).toHaveBeenCalledWith(mockError);
        });
    });
});