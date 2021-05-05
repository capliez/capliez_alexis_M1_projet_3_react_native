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
  DELETE_QUANTITY_CART_SUCCESS,
  DELETE_QUANTITY_CART_ERROR,
} from '../action-types';

const INIT_STATE = {
  all: null,
  loading: false,
  error: null,
  success: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case DELETE_QUANTITY_CART:
      return { ...state, loading: true };
    case DELETE_QUANTITY_CART_SUCCESS:
      const idDelete = action.payload;
      let newCartDelete = state.all;
      const indexDelete = newCartDelete.findIndex((c) => c.id === idDelete);
      if (indexDelete !== -1) {
        const quantityCurrent = newCartDelete[indexDelete].quantity;
        if (quantityCurrent > 1) newCartDelete[indexDelete].quantity += -1;
        else newCartDelete = newCartDelete.filter((c) => c.id !== idDelete);
      }
      return { ...state, loading: false, all: newCartDelete };
    case DELETE_QUANTITY_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_CART:
      return { ...state, loading: true };
    case UPDATE_CART_SUCCESS:
      const id = action.payload;
      const newCart = state.all;
      const index = newCart.findIndex((c) => c.id === id);
      if (index !== -1) newCart[index].quantity += 1;
      return { ...state, loading: false, all: newCart };
    case UPDATE_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    case ADD_CART:
      return { ...state, loading: true };
    case ADD_CART_SUCCESS:
      const product = action.payload;
      product.quantity = 1;
      let newAll = state.all;
      if (state.all) {
        const index = newAll.findIndex((a) => a.id === product.id);
        if (index === -1) newAll = [product].concat(newAll);
      }
      return {
        ...state,
        loading: false,
        all: state.all ? newAll : [product],
      };
    case ADD_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_CART:
      return { ...state, loading: true };
    case GET_CART_SUCCESS:
      return { ...state, loading: false, all: state.all };
    case GET_CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
