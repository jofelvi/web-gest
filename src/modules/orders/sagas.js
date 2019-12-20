import { takeLatest, call, put } from 'redux-saga/effects';

import {
  fetchOrdersSuccess,
  fetchOrdersFailed,
 
 
} from './actions';

import { FETCH_ORDERS, 
  SEARCH_ORDER
 

} from './actionTypes';

import * as api from './api';

function* fetchOrders({payload}) {
  
  try {
    const response = yield call(api.fetchOrders, payload);

    if (response.status === 401) {
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

function* searchOrder({payload}) {
  
  try {
    const response = yield call(api.searchOrder, payload);
   

     if (response.status === 401) {
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
