import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
  CURRENT_PRODUCT,
} from '../action-types';
import {
  getProductsError,
  getProductsSuccess,
  updateProductError,
  updateProductSuccess,
  addProductError,
  addProductSuccess,
  currentProductError,
  currentProductSuccess,
} from './actions';
import Firebase from '../../config/firebase';

//Get Products
export function* watchGetProducts() {
  yield takeEvery(GET_PRODUCTS, getProducts);
}

const getProductsAsync = async () => {
  const products = [];
  await Firebase.database()
    .ref('products/')
    .once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.id = key;
        products.push(childData);
      });
    });

  return products.reverse();
};

function* getProducts() {
  try {
    const products = yield call(getProductsAsync);
    if (products) yield put(getProductsSuccess(products));
    else yield put(getProductsError('Une erreur est survenue'));
  } catch (error) {
    yield put(getProductsError('Une erreur est survenue'));
  }
}

//Add Product
export function* watchAddProduct() {
  yield takeEvery(ADD_PRODUCT, addProduct);
}

const addProductAsync = async ({ name, image, price, description }) => {
  const productsRef = await Firebase.database().ref('products');
  var newProductRef = productsRef.push();
  newProductRef.set({
    name,
    image,
    price,
    description,
  });

  let newProduct = {
    name,
    image,
    price,
    description,
    id: newProductRef.key,
  };

  return newProduct;
};

function* addProduct({ payload }) {
  try {
    const product = yield call(addProductAsync, payload);
    if (product) yield put(addProductSuccess(product));
    else yield put(addProductError('Une erreur est survenue'));
  } catch (error) {
    yield put(addProductError('Une erreur est survenue'));
  }
}

//Current Product
export function* watchCurrentProduct() {
  yield takeEvery(CURRENT_PRODUCT, currentProduct);
}

const currentProductAsync = async (id) => {
  let productCurrent = null;
  await Firebase.database()
    .ref('products/' + id)
    .once('value')
    .then((snapshot) => {
      let product = snapshot.val();
      product.id = snapshot.key;
      productCurrent = product;
    });

  return productCurrent;
};

function* currentProduct({ payload }) {
  try {
    const product = yield call(currentProductAsync, payload);
    if (product) yield put(currentProductSuccess(product));
    else yield put(currentProductError('Une erreur est survenue'));
  } catch (error) {
    yield put(currentProductError('Une erreur est survenue'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetProducts),
    fork(watchAddProduct),
    fork(watchCurrentProduct),
  ]);
}
