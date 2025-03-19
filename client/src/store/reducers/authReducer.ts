import { AuthActionTypes } from '../actions/authActions';
import { ErrorResponse } from '../../typings';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../constants';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  userInfo:{
    userName: string;
    _id: string;
    role: string;
    email: string
  } | null;
  error: ErrorResponse | null;
  message: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  userInfo: null,
  error: null,
  message: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;