import {
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  CLEAR_ERROR_USER,
  CLEAR_SUCCESS_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER,
} from '../action-types';

const INIT_STATE = {
  current: null,
  loading: false,
  error: null,
  success: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { ...state, loading: true };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false, current: null };
    case LOGOUT_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_SUCCESS_USER:
      return { ...state, success: false };
    case CLEAR_ERROR_USER:
      return { ...state, error: null };
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
        success: true,
      };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
        success: true,
      };
    case REGISTER_USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return { ...state };
  }
};
