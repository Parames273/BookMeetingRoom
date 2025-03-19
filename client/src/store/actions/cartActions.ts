import axios from "axios";
import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART, REMOVE_FROM_WISHLIST, SET_CART_EMPTY } from "../../constants";
import { IProduct } from "../../typings";
import api from "../../api";
import { Dispatch } from "react";

interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: {
        userId: string;
        productId: string;
        quantity: number;
    };
}

interface AddToWishlistAction {
    type: typeof ADD_TO_WISHLIST;
    payload: {
        productId: string;
    };
}

interface RemoveFromWishlistAction {
    type: typeof REMOVE_FROM_WISHLIST;
    payload: string;
  }

export const addToCartAsync = (
    userId: string,
    productId: string,
    quantity: number
): any => {
    return async (dispatch: Dispatch<AddToCartAction>) => {
        try {
            const response = await axios.post(api.cart, { userId, productId, quantity });
            dispatch({type: ADD_TO_CART, payload:response.data});
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
};

export const removeFromCartAsync = (userId: string, product: IProduct): any => {
    return async (dispatch: any) => {
        try {
            const response = await axios.delete(api.cart, {
                data: { userId, productId: product }
            });
            dispatch({type: REMOVE_FROM_CART, payload:response.data});
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
};

export const addToWishlistAsync = (userId: string, productId: string):any => {
    return async (dispatch: Dispatch<AddToWishlistAction>) => {
      try {
        const response = await axios.post(api.wishlist, { productId, userId });
        dispatch({ type: ADD_TO_WISHLIST, payload: response.data });
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    };
  };

export const removeFromWishlistAsync = (userId: string, productId: string):any => {
  return async (dispatch: Dispatch<RemoveFromWishlistAction>) => {
    try {
      const response = await axios.delete(api.wishlist, { data: { userId, productId } });
      dispatch({ type: REMOVE_FROM_WISHLIST, payload: response.data });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
};

export const addToCart = (userId: string, productId: string, quantity: number): AddToCartAction => ({
    type: ADD_TO_CART,
    payload: { userId, productId, quantity },
});

export const removeFromCart = (productId: string) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const setCartEmpty = () => ({
    type: SET_CART_EMPTY,
});

export const addToWishlist = (productId: string): AddToWishlistAction => ({
    type: ADD_TO_WISHLIST,
    payload: {productId} ,
});

export const removeFromWishlist = (productId: string) => ({
    type: REMOVE_FROM_WISHLIST,
    payload: {productId},
});