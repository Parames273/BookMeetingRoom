import { AnyAction, applyMiddleware, legacy_createStore as createStore, Dispatch, Middleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import { createLogger } from "redux-logger"; 
import { thunk } from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage
};
 
// To persist the data
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// Created a saga middle ware
const sagaMiddleware = createSagaMiddleware();

// Logger to track actions
const logger = createLogger();

// Explicitly type the middleware array
const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [logger, sagaMiddleware, thunk];

// Created store to handle and store in local storage
const configStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};
 
export type RootState = ReturnType<typeof rootReducer>;
export default configStore;