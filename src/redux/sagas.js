import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import productsSagas from './products/saga';
import cartSagas from './cart/saga';
import ordersSagas from './order/saga';
export default function* rootSaga() {
  yield all([authSagas(), productsSagas(), cartSagas(), ordersSagas()]);
}
