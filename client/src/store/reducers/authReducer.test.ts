import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../../constants"
import { Credentials, ErrorResponse } from "../../typings"
import { LoginFailureAction, LoginRequestAction, LoginSuccessAction } from "../actions/authActions"
import authReducer, { AuthState } from "./authReducer"

describe('authReducer',()=>{
    const initialState: AuthState = {
        isAuthenticated: false,
        token: null,
        loading: false,
        userInfo: null,
        error: null,
        message: null,
    }
    it('Login Request',()=>{
        const credentials: Credentials = { email: 'test@example.com', password: 'password123' };
        const callBack = jest.fn();
        const action: LoginRequestAction = { type: LOGIN_REQUEST, payload: { credentials, callBack } };
        const expectedState: AuthState = {
            ...initialState,
            loading: true,
            error: null,
        };
        const newState = authReducer(initialState,action)
        expect(newState).toEqual(expectedState);
    })
    it('should handle LOGIN_SUCCESS', () => {
        const payload = { token: 'token123', userInfo: { userName: 'John', _id: '1', role: 'user', email: 'john@example.com' } };
        const action: LoginSuccessAction = { type: LOGIN_SUCCESS, payload };
        const expectedState: AuthState = {
          ...initialState,
          isAuthenticated: true,
          token: action.payload,
          userInfo: action.payload,
          loading: false,
          error: null,
        };
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
    
      it('should handle LOGIN_FAILURE', () => {
        const error: ErrorResponse = { status: 400, response: { data: { message: 'Invalid credentials' } } };
        const action: LoginFailureAction = { type: LOGIN_FAILURE, payload: error };
        const expectedState: AuthState = {
          ...initialState,
          isAuthenticated: false,
          token: null,
          loading: false,
          error,
        };
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expectedState);
      });
})