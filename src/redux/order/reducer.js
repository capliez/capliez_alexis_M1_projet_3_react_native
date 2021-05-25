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
  RESET_ORDER_SUCCESS,
} from '../action-types';

const INIT_STATE = {
  current: null,
  all: null,
  loading: false,
  error: null,
  success: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_ORDER_SUCCESS:
      return { ...state, success: false };
    case ADD_ORDER:
      return { ...state, loading: true };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        all: state.all ? [action.payload].concat(state.all) : [action.payload],
      };
    case ADD_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDER_CURRENT:
      return { ...state, loading: true };
    case GET_ORDER_CURRENT_SUCCESS:
      const idCurrent = action.payload;
      let currentOrder = null;
      const indexCurrent = state.all.findIndex((c) => c.id === idCurrent);
      if (indexCurrent !== -1) currentOrder = state.all[indexCurrent];
      return { ...state, loading: false, current: currentOrder };
    case GET_ORDER_CURRENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_ORDERS:
      return { ...state, loading: true };
    case GET_ORDERS_SUCCESS:
      return { ...state, loading: false, all: action.payload };
    case GET_ORDERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
