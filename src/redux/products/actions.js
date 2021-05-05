import {
  GET_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_SUCCESS,
  ADD_PRODUCT,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_SUCCESS,
  CURRENT_PRODUCT,
  CURRENT_PRODUCT_ERROR,
  CURRENT_PRODUCT_SUCCESS,
} from '../action-types';

//Current product
export const currentProduct = (id) => ({
  type: CURRENT_PRODUCT,
  payload: id,
});
export const currentProductSuccess = (product) => ({
  type: CURRENT_PRODUCT_SUCCESS,
  payload: product,
});
export const currentProductError = (product) => ({
  type: CURRENT_PRODUCT_ERROR,
  payload: product,
});

//Update product
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const updateProductError = (message) => ({
  type: UPDATE_PRODUCT_ERROR,
  payload: message,
});

//Add product
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProductError = (message) => ({
  type: ADD_PRODUCT_ERROR,
  payload: message,
});

//Get products
export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsError = (message) => ({
  type: GET_PRODUCTS_ERROR,
  payload: message,
});
