import { Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { userRegister, userLogin } from '../services/auth.services';
import logger from '../utils/logger';

jest.mock('../services/auth.services');
jest.mock('../utils/logger', () => ({
  error: jest.fn()
}));

let req: Partial<Request>;
let res: Partial<Response>;

describe('Auth Controller', () => {
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    beforeEach(() => {
      req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '1234567890',
          email: 'john.doe@example.com',
          password: 'password123',
          gender: 'male',
        }
      };
    });

    it('should register a user and return status 201', async () => {
      (userRegister as jest.Mock).mockResolvedValue({
        status: 201,
        data: { message: 'Registered successfully' },
      });

      await registerUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Registered successfully' });
    });

    it('should return status 500 on server error', async () => {
      (userRegister as jest.Mock).mockRejectedValue(new Error('Server error'));

      await registerUser(req as Request, res as Response);

      expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
  });

  describe('loginUser', () => {
    beforeEach(() => {
      req = {
        body: {
          email: 'Kiran@mail.com',
          password: 'Kiran123'
        }
      };
    });

    it('should login a user and return status 200', async () => {
      (userLogin as jest.Mock).mockResolvedValue({
        status: 200,
        data: { token: 'fake-jwt-token' },
      });

      await loginUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ data: { token: 'fake-jwt-token' } });
    });

    it('should return status 500 on server error', async () => {
      (userLogin as jest.Mock).mockRejectedValue(new Error('Server error'));

      await loginUser(req as Request, res as Response);

      expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
  });
});