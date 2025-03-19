import { Request, Response, NextFunction } from 'express';
import { profile, updateProfile } from '../controllers/profile.controller';
import { userDetails, userUpdateProfile } from '../services/profile.services';
import logger from '../utils/logger';

jest.mock('../services/profile.services');
jest.mock('../utils/logger', () => ({
  error: jest.fn()
}));

let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

describe('Profile Controller', () => {
    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      next = jest.fn();
      jest.clearAllMocks();
    });
  
    describe('profile', () => {
      beforeEach(() => {
        req = {
          params: {
            userId: '123'
          }
        };
      });
  
      it('should fetch user profile and return status 200', async () => {
        (userDetails as jest.Mock).mockResolvedValue({
          status: 200,
          data: { user: { name: 'John Doe' } },
        });
  
        await profile(req as Request, res as Response, next as NextFunction);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: { user: { name: 'John Doe' } } });
      });
  
      it('should return status 500 on server error', async () => {
        (userDetails as jest.Mock).mockRejectedValue(new Error('Server error'));
  
        await profile(req as Request, res as Response, next as NextFunction);
  
        expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
      });
    });
  
    describe('updateProfile', () => {
      beforeEach(() => {
        req = {
          body: {
            userId: '123',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890',
            age: 30,
            height: 180,
            weight: 75
          }
        };
      });
  
      it('should update user profile and return status 200', async () => {
        (userUpdateProfile as jest.Mock).mockResolvedValue({
          status: 200,
          data: { message: 'Profile updated successfully' },
        });
  
        await updateProfile(req as Request, res as Response, next as NextFunction);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: { message: 'Profile updated successfully' } });
      });
  
      it('should return status 500 on server error', async () => {
        (userUpdateProfile as jest.Mock).mockRejectedValue(new Error('Server error'));
  
        await updateProfile(req as Request, res as Response, next as NextFunction);
  
        expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
      });
    });
  });