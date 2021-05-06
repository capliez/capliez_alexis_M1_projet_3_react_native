import {
  ADD_CART,
  ADD_CART_ERROR,
  ADD_CART_SUCCESS,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
  UPDATE_CART,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART,
  DELETE_QUANTITY_CART,
  DELETE_QUANTITY_CART_ERROR,
  DELETE_QUANTITY_CART_SUCCESS,
  CLEAR_ALL_CART,
} from '../action-types';

//Clear Cart
export const clearCart = () => ({
  type: CLEAR_ALL_CART,
});

//Delete Cart
export const deleteCart = (id) => ({
  type: DELETE_QUANTITY_CART,
  payload: id,
});
export const deleteCartSuccess = (id) => ({
  type: DELETE_QUANTITY_CART_SUCCESS,
  payload: id,
});
export const deleteCartError = (message) => ({
  type: DELETE_QUANTITY_CART_ERROR,
  payload: message,
});

//Get cart
export const getCart = () => ({
  type: GET_CART,
});
export const getCartSuccess = (products) => ({
  type: GET_CART_SUCCESS,
  payload: products,
});
export const getCartError = (message) => ({
  type: GET_CART_ERROR,
  payload: message,
});

//Update cart
export const updateCart = (id) => ({
  type: UPDATE_CART,
  payload: id,
});
export const updateCartSuccess = (product) => ({
  type: UPDATE_CART_SUCCESS,
  payload: product,
});
export const updateCartError = (message) => ({
  type: UPDATE_CART_ERROR,
  payload: message,
});

//Add cart
export const addCart = (product) => ({
  type: ADD_CART,
  payload: product,
});
export const addCartSuccess = (product) => ({
  type: ADD_CART_SUCCESS,
  payload: product,
});
export const addCartError = (message) => ({
  type: ADD_CART_ERROR,
  payload: message,
});
