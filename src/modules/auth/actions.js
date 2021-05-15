import { createActions } from 'redux-actions';

import {
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  SET_TOKEN,
  FETCH_ME,
  SET_ME
} from './actionTypes';

export const {
  checkLogin,
  checkLoginSuccess,
  checkLoginFailed,
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailed,
  setToken,
  setMe,
  fetchMe
} = createActions(
  CHECK_LOGIN,
  CHECK_LOGIN_SUCCESS,
  CHECK_LOGIN_FAILED,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  SET_TOKEN,
  SET_ME,
  FETCH_ME
);
