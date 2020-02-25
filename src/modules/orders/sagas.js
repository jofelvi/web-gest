import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchOrderByIdSuccess,
  fetchEntityByIdSuccess,
  fetchClientByIdSuccess,
} from './actions';

import {
  FETCH_ORDERS,
  SEARCH_ORDER,
  FETCH_ORDER_BY_ID,
} from './actionTypes';

import * as api from './api';

function* fetchOrders({ payload }) {

  try {
    const response = yield call(api.fetchOrders, payload);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchOrdersSuccess({ orders: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchOrdersFailed());
  }
}
export function* watchfetchOrders() {
  yield takeLatest(FETCH_ORDERS, fetchOrders);
}


function* fetchOrderById({ payload }) {

  try {
    const response = yield call(api.fetchOrderById, payload.id);
    const responseEntity = yield call(api.fetchEntityById, response.data.codentidad_cbim);
    const responseClient = yield call(api.fetchClientById, responseEntity.data.idcliente);
    
    yield put(fetchClientByIdSuccess({ client: responseClient.data }));
    yield put(fetchOrderByIdSuccess({ order: response.data }));
    yield put(fetchEntityByIdSuccess({ entity: responseEntity.data }));



    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }


  } catch (e) {
    console.error(e);
    yield put(fetchOrdersFailed());
  }
}

export function* watchfetchOrdersById() {
  yield takeLatest(FETCH_ORDER_BY_ID, fetchOrderById);
}



function* searchOrder({ payload }) {

  try {
    const response = yield call(api.searchOrder, payload);


    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchOrdersSuccess({ orders: response.data }));

  } catch (e) {
    console.error(e);
    yield put(fetchOrdersFailed());
  }
}

export function* watchsearchOrder() {
  yield takeLatest(SEARCH_ORDER, searchOrder);
}
