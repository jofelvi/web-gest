import { takeLatest, call, put } from 'redux-saga/effects';

import {
  fetchUsersSuccess,
  fetchUsersFailed,
  fetchUserByIdFailed,
  fetchUserByIdSuccess
} from './actions';

import { FETCH_USERS, FETCH_USER_BY_ID } from './actionTypes';

import * as api from './api';

function* fetchUsers() {
  try {
    const response = yield call(api.fetchUsers);
    yield put(fetchUsersSuccess({ users: response.data.results }));
  } catch (e) {
    console.error(e);
    yield put(fetchUsersFailed());
  }
}

export function* watchFetchUsers() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}

function* fetchUserById({ payload }) {
  try {
    const response = yield call(api.fetchUserById(payload.id));
    yield put(fetchUserByIdSuccess({ user: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchUserByIdFailed());
  }
}

export function* watchFetchUserById() {
  yield takeLatest(FETCH_USER_BY_ID, fetchUserById);
}
