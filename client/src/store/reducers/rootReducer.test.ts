import rootReducer from './rootReducer';
import { LOGIN_REQUEST, ADD_TO_CART, ADD_TO_WISHLIST } from '../../constants';
import { AuthState } from './authReducer';
import { CartState } from './cartReducer';
import { OrderState } from './orderReducer';

describe('rootReducer', () => {
  const initialAuthState: AuthState = {
    isAuthenticated: false,
    token: null,
    loading: false,
    userInfo: null,
    error: null,
    message: null,
  };

  const initialCartState: CartState = {
    cart: [],
    wishlist: [],
    loading: false,
  };

  const initialOrderState: OrderState = {
    userId: '',
    orders: [],
    loading: false,
    error: null,
    message: null
  };

  const initialState = {
    auth: initialAuthState,
    cart: initialCartState,
    orders: initialOrderState,
  };

  it('should handle LOGIN_REQUEST', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const callBack = jest.fn();
    const action = { type: LOGIN_REQUEST, payload: { credentials, callBack } };
    const expectedState = {
      ...initialState,
      auth: {
        ...initialAuthState,
        loading: true,
        error: null,
      },
    };
    const newState = rootReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle ADD_TO_CART', () => {
    const action = {
      type: ADD_TO_CART,
      payload: {
        userId: '123',
        productId: 'product',
        quantity: 1,
      },
    };
    const expectedState = {
      ...initialState,
      cart: {
        ...initialCartState,
        cart: action.payload,
      },
    };
    const newState = rootReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('should handle ADD_TO_WISHLIST', () => {
    const action = {
      type: ADD_TO_WISHLIST,
      payload: {
        productId: 'product',
      },
    };
    const expectedState = {
      ...initialState,
      cart: {
        ...initialCartState,
        wishlist: action.payload.productId,
      },
    };
    const newState = rootReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});