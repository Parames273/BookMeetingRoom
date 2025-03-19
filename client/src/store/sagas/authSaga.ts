import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from '../actions/authActions';
import { loginApi } from '../../api/authApi';
import { ErrorResponse } from '../../typings';
import { LOGIN_REQUEST } from '../../constants';

export function* loginSaga(action: any): Generator {
  try {
    const { credentials, callBack } = action.payload;
    const response:any = yield call(loginApi, credentials);
    const { token } = response.data.data;
    const  user  = response.data.data.data;
    yield put(loginSuccess(token, user));
    callBack(true, null, token, user);
  } catch (error: any) {
    yield put(loginFailure(error as ErrorResponse));
    action.payload.callBack(false, error as ErrorResponse, '', null);
  }
}

export default function* watchAuthSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}