import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../../constants";
import { ErrorResponse, Credentials } from "../../typings";

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: {
    credentials: Credentials;
    callBack: (success: boolean, error: ErrorResponse | null, token: string) => void;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: ErrorResponse;
}

export const loginRequest = (credentials: Credentials, callBack: (success: boolean, error: ErrorResponse | null, token: string) => void): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: { credentials, callBack },
});

export const loginSuccess = (token: string, user: object): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: { token, user },
});

export const loginFailure = (error: ErrorResponse): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export type AuthActionTypes = 
  | LoginRequestAction 
  | LoginSuccessAction 
  | LoginFailureAction;