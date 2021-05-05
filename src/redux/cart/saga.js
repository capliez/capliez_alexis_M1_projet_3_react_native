import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getCartError,
  getCartSuccess,
  updateCartError,
  updateCartSuccess,
  addCartError,
  addCartSuccess,
  deleteCartError,
  deleteCartSuccess,
} from './actions';

import {
  ADD_CART,
  UPDATE_CART,
  GET_CART,
  DELETE_QUANTITY_CART,
} from '../action-types';

//Add cart
export function* watchAddCart() {
  yield takeEvery(ADD_CART, addCart);
}

function* addCart({ payload }) {
  const product = payload;
  try {
    if (product) yield put(addCartSuccess(product));
    else yield put(addCartError('Une erreur est survenue'));
  } catch (error) {
    yield put(addCartError('Une erreur est survenue'));
  }
}

//Delete cart
export function* watchDeleteCart() {
  yield takeEvery(DELETE_QUANTITY_CART, deleteCart);
}

function* deleteCart({ payload }) {
  const id = payload;
  try {
    if (id) yield put(deleteCartSuccess(id));
    else yield put(deleteCartError('Une erreur est survenue'));
  } catch (error) {
    yield put(deleteCartError('Une erreur est survenue'));
  }
}

//Update cart
export function* watchUpdateCart() {
  yield takeEvery(UPDATE_CART, updateCart);
}

function* updateCart({ payload }) {
  const id = payload;
  try {
    if (id) yield put(updateCartSuccess(id));
    else yield put(updateCartError('Une erreur est survenue'));
  } catch (error) {
    yield put(updateCartError('Une erreur est survenue'));
  }
}

//Get cart
export function* watchGetCart() {
  yield takeEvery(GET_CART, getCart);
}

function* getCart() {
  try {
    yield put(getCartSuccess());
  } catch (error) {
    yield put(getCartSuccess('Une erreur est survenue'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchAddCart),
    fork(watchUpdateCart),
    fork(watchGetCart),
    fork(watchDeleteCart),
  ]);
}
