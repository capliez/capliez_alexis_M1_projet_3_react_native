import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import productsReducer from './products/reducer';
import cartReducer from './cart/reducer';
import ordersReducer from './order/reducer';
const reducers = combineReducers({
  authUser: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export default reducers;
