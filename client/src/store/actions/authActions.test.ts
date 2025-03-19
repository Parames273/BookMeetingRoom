import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../constants";
import { Credentials, ErrorResponse } from "../../typings";

import { loginFailure, loginRequest, loginSuccess } from "./authActions";

describe('Auth Actions', () => {
    describe('Given Login request', () => {
        it('when login request', () => {
            const credentials: Credentials = { email: 'Kiran@mail.com', password: 'Kiran123' };
            const callBack = jest.fn((_success: boolean, _error: ErrorResponse | null, _token: string) => { });
            const expectedAction = {
                type: LOGIN_REQUEST,
                payload: { credentials, callBack },
            };
            const response = loginRequest(credentials, callBack);
            expect(response).toEqual(expectedAction);
        });
    })
    describe('Given Login success', () => {
        it('when login success', () => {
            const token: string = "token123";
            const user: object = { name: "kiran" };
            const expectedAction = {
                type: LOGIN_SUCCESS,
                payload: { token, user },
            };
            const response = loginSuccess(token, user);
            expect(response).toEqual(expectedAction);
        });
    })
    describe('Given Login failure', () => {
        it('when login fails', () => {
            const error: ErrorResponse = {
                status: 400,
                response: {
                    data: {
                        message: "Invalid credentials"
                    }
                }
            };
            const expectedAction = {
                type: LOGIN_FAILURE,
                payload: error,
            };
            const response = loginFailure(error);
            expect(response).toEqual(expectedAction);
        });
    });
})

