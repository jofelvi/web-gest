import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
  fetchOrdersSuccess,
  fetchOrdersFailed,
  fetchOrderByIdSuccess,
  fetchEntityByIdSuccess
} from './actions';

import { 
  FETCH_ORDERS, 
  SEARCH_ORDER,
  FETCH_ORDER_BY_ID,
  FETCH_ENTITY_BY_ID,
} from './actionTypes';

import * as api from './api';

function* fetchOrders({payload}) {
  
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

function* fetchOrderById({payload}) {
  
  try {
    const response = yield call(api.fetchOrderById, payload.id);
    const responseEntity = yield call(api.fetchEntityById, response.data.codentidad_cbim);
   
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


function* fetchEntityById({payload}) {
  
  try {
    const response = yield call(api.fetchEntityById, payload.id);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchEntityByIdSuccess({ entity: response.data }));
  } catch (e) {
    console.error(e);
    yield put(fetchOrdersFailed());
  }
}

export function* watchfetchEntityById() {
  yield takeLatest(FETCH_ENTITY_BY_ID, fetchEntityById);
}

function* searchOrder({payload}) {
  
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
