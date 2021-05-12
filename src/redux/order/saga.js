import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getCurrentOrderSuccess,
  getCurrentOrderError,
  getOrdersSuccess,
  getOrdersError,
  addOrderError,
  addOrderSuccess,
} from './actions';
import { ADD_ORDER, GET_ORDER_CURRENT, GET_ORDERS } from '../action-types';
import Firebase from '../../config/firebase';
import moment from 'moment';
//Get current order
export function* watchGetCurrentOrder() {
  yield takeEvery(GET_ORDER_CURRENT, getCurrentOrder);
}

const getCurrentOrderAsync = async (id) => {
  let orderCurrent = null;
  await Firebase.database()
    .ref('orders/' + id)
    .once('value')
    .then((snapshot) => {
      let product = snapshot.val();
      product.id = snapshot.key;
      orderCurrent = product;
    });

  return orderCurrent;
};

function* getCurrentOrder({ payload }) {
  const id = payload;
  try {
    const order = yield call(getCurrentOrderAsync, id);
    if (order) yield put(getCurrentOrderSuccess(id));
    else yield put(getCurrentOrderError('Une erreur est survenue'));
  } catch (error) {
    yield put(getCurrentOrderError('Une erreur est survenue'));
  }
}

//Get orders
export function* watchGetOrders() {
  yield takeEvery(GET_ORDERS, getOrders);
}

const getOrdersAsync = async () => {
  const orders = [];
  const user = await Firebase.auth().currentUser;
  await Firebase.database()
    .ref('orders/')
    .once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.id = key;

        if (childData.idUser === user.uid) orders.push(childData);
      });
    });

  return orders.reverse();
};

function* getOrders() {
  try {
    const orders = yield call(getOrdersAsync);
    if (orders) yield put(getOrdersSuccess(orders));
    else yield put(getOrdersError('Une erreur est survenue'));
  } catch (error) {
    yield put(getOrdersError('Une erreur est survenue'));
  }
}

//Add order
export function* watchAddOrder() {
  yield takeEvery(ADD_ORDER, addOrder);
}

const addOrderAsync = async ({ cart, total }) => {
  const idProducts = [];
  cart && cart.map((m) => idProducts.push({ id: m.id, quantity: m.quantity }));
  const user = await Firebase.auth().currentUser;
  const ordersRef = await Firebase.database().ref('orders');
  const createdAt = moment();
  var newOrderRef = ordersRef.push();
  newOrderRef.set({
    total,
    products: idProducts,
    idUser: user.uid,
    createdAt: createdAt.format('L'),
  });

  return {
    total,
    produts: idProducts,
    idUser: user.uid,
    id: newOrderRef.key,
    createdAt: createdAt.format('L'),
  };
};

function* addOrder({ payload }) {
  try {
    const order = yield call(addOrderAsync, payload);
    if (order) yield put(addOrderSuccess(order));
    else yield put(addOrderError('Une erreur est survenue'));
  } catch (error) {
    yield put(addOrderError('Une erreur est survenue'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchAddOrder),
    fork(watchGetOrders),
    fork(watchGetCurrentOrder),
  ]);
}
