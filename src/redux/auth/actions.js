import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  CLEAR_ERROR_USER,
  CLEAR_SUCCESS_USER,
  LOGOUT_USER,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
} from '../action-types';

//Action Logout user
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const logoutUserError = (message) => ({
  type: LOGOUT_USER_ERROR,
  payload: message,
});

//Action Clear
export const clearSuccessUser = () => ({
  type: CLEAR_SUCCESS_USER,
});

export const clearErrorUser = () => ({
  type: CLEAR_ERROR_USER,
});

//Action SignUp user
export const registerUser = (values) => ({
  type: REGISTER_USER,
  payload: values,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: message,
});

//Action SignIn User
export const loginUser = (values) => ({
  type: LOGIN_USER,
  payload: values,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: message,
});
