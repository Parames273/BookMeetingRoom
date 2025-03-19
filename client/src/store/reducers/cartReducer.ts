import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST, SET_CART_EMPTY } from '../../constants';
import { ICart, IProduct } from '../../typings';

export interface CartState {
    cart: ICart[];
    wishlist: IProduct[];
    loading: boolean
}

export const initialState: CartState = {
    cart: [],
    wishlist: [],
    loading: false
};

const cartReducer = (state = initialState, action: any): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
            return { 
                ...state, 
                cart: action.payload 
            };
        case REMOVE_FROM_CART:
            return { 
                ...state, 
                cart: action.payload 
            };
        case SET_CART_EMPTY:
            return {
                ...state,
                cart: [],
            };
        case ADD_TO_WISHLIST:
            return { 
                ...state, 
                wishlist: action.payload.productId 
            };
        case REMOVE_FROM_WISHLIST:
            return { 
                ...state, 
                wishlist: action.payload.productId
            };
        default:
            return state;
    }
};

export default cartReducer;