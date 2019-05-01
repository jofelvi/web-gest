import { handleActions, combineActions } from 'redux-actions';

import { STATUS } from './constants';

import {
  checkLoginSuccess,
  checkLoginFailed,
  loginSuccess,
  loginFailed,
  logoutSuccess,
  setToken,
  setMe,
  refreshToken
} from './actions';

const defaultState = {
  status: STATUS.NOT_CHECKED,
};

export default handleActions(
  {
    [combineActions(checkLoginSuccess, loginSuccess)]: state => ({
      ...state,
      status: STATUS.LOGGED
    }),
    [checkLoginFailed]: state => ({ ...state, status: STATUS.NOT_LOGGED }),
    [loginFailed]: state => ({ ...state, status: STATUS.LOGGED_ERROR }),
    [logoutSuccess]: state => ({
      ...state,
      token: null,
      status: STATUS.NOT_LOGGED
    }),
    [setToken]: (state, action) => ({
      ...state,
      token: action.payload.token,
      status: action.payload.token ? STATUS.LOGGED : STATUS.NOT_LOGGED
    }),
    [refreshToken]: (state, { payload }) => ({
      ...state,
      token: payload.token
    }),
    [setMe]: (state, { payload }) => ({
      ...state,
      me: payload.me
    })
  },
  defaultState
);
