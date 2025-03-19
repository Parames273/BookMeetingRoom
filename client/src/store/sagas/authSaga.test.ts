import { call, put, takeLatest } from "@redux-saga/core/effects";
import watchAuthSaga, { loginSaga } from "./authSaga"
import { LOGIN_REQUEST } from "../../constants";
import { loginFailure, loginSuccess } from "../actions/authActions";
import { loginApi } from "../../api/authApi";
import { ErrorResponse } from "../../typings";

describe('Given authSaga', () => {
    describe('When watchAuthSaga', () => {
        it('should watch watchAuthSaga', () => {
            const res = watchAuthSaga();
            expect(res.next().value).toEqual(takeLatest(LOGIN_REQUEST, loginSaga));
            expect(res.next().done).toBe(true);
        })
    })

    describe('When loginSaga', () => {
        const action = {
            payload: {
                credentials: { email: 'test', password: 'test' },
                callBack: jest.fn(),
            },
        };
        it('should handle login successfully', () => {
            const response: any= {
                data: {
                    data: {
                        token: 'test-token',
                        data:{
                            id: 1, name: 'Kiran' ,
                        },
                    },
                },
            };
    
            const generator = loginSaga(action);
    
            expect(generator.next().value).toEqual(call(loginApi, action.payload.credentials));
            expect(generator.next(response).value).toEqual(put(loginSuccess(response.data.data.token, response.data.data.data)));
            expect(generator.next().done).toBe(true);
        });
    
        it('should handle login failure', () => {
            const error1: ErrorResponse = {
                status: 400,
                response: {
                    data: {
                        message: 'Login failed'
                    },
                }
            };

            const generator = loginSaga(action);

            expect(generator.next().value).toEqual(call(loginApi, action.payload.credentials));
            expect(generator.throw(error1).value).toEqual(put(loginFailure(error1)));
            expect(generator.next().done).toBe(true);
        });
    })
})