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

const INIT_STATE = {
  all: null,
  loading: false,
  error: null,
  success: false,
  current: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CURRENT_PRODUCT:
      return { ...state, loading: true };
    case CURRENT_PRODUCT_SUCCESS:
      return { ...state, loading: false, current: action.payload };
    case CURRENT_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_PRODUCT:
      return { ...state, loading: true };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        all: [action.payload].concat(state.all),
      };
    case ADD_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PRODUCT:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      const product = action.payload;
      const index = state.all.findIndex((p) => p.id === product.id);
      if (index !== -1) state.all[index] = product;
      return { ...state, loading: false, all: state.all };
    case UPDATE_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_PRODUCTS:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, all: action.payload };
    case GET_PRODUCTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
