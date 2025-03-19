import bookingModel from "../models/booking.model";
import { bookingServise } from "../services/booking.services";
import logger from "../utils/logger";

jest.mock("../models/booking.model");
jest.mock("../utils/logger");

describe("Booking Service", () => {
    describe("getBookingHistory", () => {
        it("should return booking history for a given sapId", async () => {
            const sapId = "12345";
            const mockBookingHistory = [{ id: 1, sapId: "12345", details: "Booking details" }];
            bookingModel.find.mockResolvedValue(mockBookingHistory);

            const result = await bookingServise.getBookingHistory(sapId);

            expect(result).toEqual(mockBookingHistory);
            expect(bookingModel.find).toHaveBeenCalledWith({ sapId });
        });

        it("should log error and return undefined if an error occurs", async () => {
            const sapId = "12345";
            const mockError = new Error("Database error");
            bookingModel.find.mockRejectedValue(mockError);

            const result = await bookingServise.getBookingHistory(sapId);

            expect(result).toBeUndefined();
            expect(logger.error).toHaveBeenCalledWith(mockError);
            expect(console.log).toHaveBeenCalledWith(mockError);
        });
    });

    describe("addBooking", () => {
        it("should add a booking and return the result", async () => {
            const bookingData = { id: 1, sapId: "12345", details: "Booking details" };
            bookingModel.insertOne.mockResolvedValue(bookingData);

            const result = await bookingServise.addBooking(bookingData);

            expect(result).toEqual(bookingData);
            expect(bookingModel.insertOne).toHaveBeenCalledWith(bookingData);
        });

        it("should log error and return undefined if an error occurs", async () => {
            const bookingData = { id: 1, sapId: "12345", details: "Booking details" };
            const mockError = new Error("Database error");
            bookingModel.insertOne.mockRejectedValue(mockError);

            const result = await bookingServise.addBooking(bookingData);

            expect(result).toBeUndefined();
            expect(logger.error).toHaveBeenCalledWith(mockError);
            expect(console.log).toHaveBeenCalledWith(mockError);
        });
    });
});