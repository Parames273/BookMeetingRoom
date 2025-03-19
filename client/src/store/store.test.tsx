import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer';
import configStore from './store';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

jest.mock('redux-persist/lib/storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('configStore', () => {
  it('should configure the store with middleware and persist the state', () => {
    const sagaMiddleware = createSagaMiddleware();
    const logger = createLogger();
    const middlewares = [logger, sagaMiddleware, thunk];

    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const mockStore = configureStore();

    const { store, persistor } = configStore();

    expect(store.getState()).toEqual(mockStore(persistedReducer).getState());
    expect(persistor).toBeDefined();
  });
});