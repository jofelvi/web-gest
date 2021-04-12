import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
  fetchProductsSuccess,
  fetchProductsFailed,
} from './actions';

import {
  FETCH_PRODUCTS,
} from './actionTypes';

import * as api from './api';

function* fetchProducts({ payload }) {
  try {
    const response = yield call(api.fetchProducts, payload);
    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchProductsSuccess({ products: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchProductsFailed());
  }
}
export function* watchfetchProducts() {
  yield takeLatest(FETCH_PRODUCTS, fetchProducts);
}