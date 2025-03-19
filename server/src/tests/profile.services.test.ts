import bcrypt from 'bcryptjs';
import { SERVER_ERROR, UPDATE_PROFILE_SUCCESS, USER_DETAILS_FETCHED, USER_NOT_EXISTS } from "../constants";
import User from "../models/user.model";
import { userDetails, userUpdateProfile } from '../services/profile.services';

jest.mock('../models/user.model');
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const mockFindById = jest.fn();
const mockFindOne = jest.fn();
const mockSave = jest.fn();
User.findById = mockFindById;
User.findOne = mockFindOne;
User.prototype.save = mockSave;

describe('Profile Services', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('userDetails', () => {
      it('should return 400 if user does not exist', async () => {
        mockFindById.mockResolvedValue(null);
  
        const result = await userDetails({ userId: '123' });
  
        expect(mockFindById).toHaveBeenCalledWith('123');
        expect(result).toEqual({ status: 400, data: { message: USER_NOT_EXISTS } });
      });
  
      it('should return 200 and user details if user exists', async () => {
        mockFindById.mockResolvedValue({ name: 'John Doe', email: 'john.doe@example.com' });
  
        const result = await userDetails({ userId: '123' });
  
        expect(mockFindById).toHaveBeenCalledWith('123');
        expect(result).toEqual({
          status: 200,
          data: {
            message: USER_DETAILS_FETCHED,
            user: { name: 'John Doe', email: 'john.doe@example.com' },
          },
        });
      });
  
      it('should return 500 on server error', async () => {
        mockFindById.mockRejectedValue(new Error('Server error'));
  
        await expect(userDetails({ userId: '123' })).rejects.toThrow(SERVER_ERROR);
      });
    });
  
    describe('userUpdateProfile', () => {
      it('should return 400 if user does not exist', async () => {
        mockFindOne.mockResolvedValue(null);
  
        const result = await userUpdateProfile({
          userId: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: 1234567890,
          age: 30,
          height: 180,
          weight: 75,
        });
  
        expect(mockFindOne).toHaveBeenCalledWith({ _id: '123' });
        expect(result).toEqual({ status: 400, data: { message: USER_NOT_EXISTS } });
      });
  
      it('should return 200 and update user profile if user exists', async () => {
        mockFindOne.mockResolvedValue({
          save: mockSave,
          email: 'john.doe@example.com',
          name: 'John Doe',
          phoneNumber: 1234567890,
          age: 30,
          height: 180,
          weight: 75,
        });
  
        const result = await userUpdateProfile({
          userId: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: 1234567890,
          age: 30,
          height: 180,
          weight: 75,
        });
  
        expect(mockFindOne).toHaveBeenCalledWith({ _id: '123' });
        expect(mockSave).toHaveBeenCalled();
        expect(result).toEqual({
          status: 200,
          data: {
            message: UPDATE_PROFILE_SUCCESS,
            user: {
              email: 'john.doe@example.com',
              name: 'John Doe',
              phoneNumber: 1234567890,
              age: 30,
              height: 180,
              weight: 75,
            },
          },
        });
      });
  
      it('should return 500 on server error', async () => {
        mockFindOne.mockRejectedValue(new Error('Server error'));
  
        await expect(userUpdateProfile({
          userId: '123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: 1234567890,
          age: 30,
          height: 180,
          weight: 75,
        })).rejects.toThrow(SERVER_ERROR);
      });
    });
  });