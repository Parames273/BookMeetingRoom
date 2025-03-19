import { all } from "@redux-saga/core/effects";
import rootSaga from "./rootSaga";
import watchLoginSaga from './authSaga';
import watchOrdersSaga from './orderSaga';

describe('Given rootSaga',()=>{
    describe('When root saga',()=>{
        it('should combine all sagas',()=>{
            const gen = rootSaga();
            const expected = all([
                    watchLoginSaga(),
                    watchOrdersSaga()
            ]);
            expect(gen.next().value).toEqual(expected);
            expect(gen.next().done).toBe(true);
        })
    })
})