import { all } from 'redux-saga/effects';
import watchLoginSaga from './authSaga';

export default function* rootSaga() {
    yield all([
        watchLoginSaga(),
    ]);
}