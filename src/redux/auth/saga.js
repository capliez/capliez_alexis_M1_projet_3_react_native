import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../action-types';
import {
  loginUserSuccess,
  loginUserError,
  registerUserError,
  registerUserSuccess,
  logoutUserError,
  logoutUserSuccess,
} from './actions';
import Firebase from '../../config/firebase';

//SignUp User
export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerProfileAsync = async (id) => {
  const usersRef = await Firebase.database().ref('users');
  var newUserRef = usersRef.child(id);
  newUserRef.set({
    role: 'ROLE_USER',
  });
};

const registerWithEmailPasswordAsync = async (email, password, name) => {
  let result = { status: null, value: null };
  await Firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      res.user.updateProfile({
        displayName: name,
      });
      await registerProfileAsync(res.user.uid);
      result.status = 201;
      result.value = {
        id: res.user.uid,
        email: res.user.email,
        name: name,
        role: 'ROLE_USER',
      };
    })
    .catch((error) => {
      (result.status = 404), (result.value = error.message);
    });
  return result;
};

function* registerWithEmailPassword({ payload }) {
  const { email, password, name } = payload;
  try {
    const user = yield call(
      registerWithEmailPasswordAsync,
      email,
      password,
      name,
    );
    if (user.status === 201) yield put(registerUserSuccess(user.value));
    else yield put(registerUserError(user.value));
  } catch (error) {
    yield put(registerUserError('Une erreur est survenue'));
  }
}

//SignIn User
export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const getInfoUserAsync = (id) =>
  Firebase.database()
    .ref('users/' + id)
    .once('value')
    .then((snapshot) => {
      return snapshot.val();
    });

const loginWithEmailPasswordAsync = async (email, password) => {
  let result = { status: null, value: null };
  await Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      const { user } = res;
      const infoUser = await getInfoUserAsync(user.uid);
      result.status = 201;
      result.value = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        role: infoUser.role,
      };
    })
    .catch((error) => {
      (result.status = 404), (result.value = error.message);
    });
  return result;
};

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload;
  try {
    const user = yield call(loginWithEmailPasswordAsync, email, password);
    if (user.status === 201) yield put(loginUserSuccess(user.value));
    else yield put(loginUserError(user.value));
  } catch (error) {
    yield put(loginUserError('Une erreur est survenue'));
  }
}

//Logout User
export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

const logoutUserAsync = () =>
  Firebase.auth()
    .signOut()
    .then((res) => true)
    .catch((error) => false);

function* logoutUser() {
  try {
    const user = yield call(logoutUserAsync);
    console.log('ici', user);
    if (user) yield put(logoutUserSuccess());
    else yield put(logoutUserError('Une erreur est survenue'));
  } catch (error) {
    yield put(logoutUserError('Une erreur est survenue'));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchLoginUser),
    fork(watchLogoutUser),
  ]);
}
