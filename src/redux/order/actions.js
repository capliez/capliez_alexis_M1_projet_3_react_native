import {
  GET_ORDERS,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
  GET_ORDER_CURRENT,
  GET_ORDER_CURRENT_ERROR,
  GET_ORDER_CURRENT_SUCCESS,
  ADD_ORDER,
  ADD_ORDER_ERROR,
  ADD_ORDER_SUCCESS,
} from '../action-types';

//Get current order
export const getCurrentOrder = (id) => ({
  type: GET_ORDER_CURRENT,
  payload: id,
});
export const getCurrentOrderSuccess = (id) => ({
  type: GET_ORDER_CURRENT_SUCCESS,
  payload: id,
});
export const getCurrentOrderError = (message) => ({
  type: GET_ORDER_CURRENT_ERROR,
  payload: message,
});

//Get orders
export const getOrders = () => ({
  type: GET_ORDERS,
});
export const getOrdersSuccess = (orders) => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
});
export const getOrdersError = (message) => ({
  type: GET_ORDERS_ERROR,
  payload: message,
});

//Add order
export const addOrder = (cart, total) => ({
  type: ADD_ORDER,
  payload: { cart, total },
});
export const addOrderSuccess = (order) => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
});
export const addOrderError = (message) => ({
  type: ADD_ORDER_ERROR,
  payload: message,
});
