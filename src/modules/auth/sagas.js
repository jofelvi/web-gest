import { takeLatest, put, call } from 'redux-saga/effects';

import utils from '../../lib/utils';

import { LOGIN, REFRESH_TOKEN, LOGOUT, CHECK_LOGIN } from './actionTypes';
import {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  logoutFailed,
  setToken,
  setMe,
  refreshTokenFailed,
  refreshTokenSuccess,
  checkLoginFailed,
  checkLoginSuccess
} from './actions';

import * as api from './api';

function* refreshToken() {
  try {
    const response = yield call(api.refreshToken);
    yield put(refreshTokenSuccess({ token: response.data }));
  } catch (e) {
    console.error(e);
    yield put(refreshTokenFailed());
  }
}

export function* watchRefreshToken() {
  yield takeLatest(REFRESH_TOKEN, refreshToken);
}

function* login({ payload: { values, nextAction, nextActionPayload } }) {
  try {
    const response = yield call(api.login, {
      user: values.user,
      password: values.password
    });
    utils.setAuthToken(response.data);

    //@todo: aqui faltaria llamar a users y obtener el nombre de este
    const profile = yield call(api.getProfile);

    const me = { id: values.user, firstName: profile.data.attrs.cn[0], lastName: profile.data.attrs.sn[0] }
    utils.setMe(me);
    yield put(setToken({ token: response.data }));
    yield put(setMe(me));
    yield put(loginSuccess());
    if (nextAction) {
      console.log({ nextAction });
      yield put(nextAction(nextActionPayload));
    }
  } catch (e) {
    console.error(e);
    yield put(loginFailed());
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN, login);
}

function* logout() {
  try {
    utils.removeAuthToken();
    yield put(logoutSuccess());
  } catch (e) {
    console.error(e);
    yield put(logoutFailed());
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logout);
}

function* checkLogin() {
  try {
    if (utils.isAuthd()) {
      yield put(checkLoginSuccess());
    }
    yield put(checkLoginFailed());
  } catch (e) {
    console.error(e);
    yield put(checkLoginFailed());
  }
}

export function* watchCheckLogin() {
  yield takeLatest(CHECK_LOGIN, checkLogin);
}
