import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
  fetchOrdersSuccess,
  fetchOrdersLoading,
  fetchOrdersFailed,
  deleteOrderLineByIdFailed,
  deleteOrderByIdFailed,
  deleteOrderByIdSuccess,
  fetchOrdersCountSuccess,
  fetchOrderByIdSuccess,
  fetchEntityByIdSuccess,
  fetchClientByIdSuccess,
  changeOrderStatusByIdSuccess,
  changeOrderStatusByIdFailed,
  fetchOrderStatesSuccess,
  fetchOrderProductsSuccess,
  deleteOrderLineByIdSuccess
} from './actions';

import {
  FETCH_ORDERS,
  SEARCH_ORDER,
  COUNT_ORDERS,
  FETCH_ORDER_BY_ID,
  DELETE_ORDER_LINE_BY_ID,
  DELETE_ORDER_BY_ID,
  CHANGE_ORDER_STATUS_BY_ID,
  FETCH_ORDER_STATES,
  FETCH_ORDER_PRODUCTS
} from './actionTypes';

import * as api from './api';

function* fetchOrders({ payload }) {
  try {
    yield put(fetchOrdersLoading(true));
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

function* fetchOrderStates({ payload }) {
  try {
    const response = require('../../datamockup/dataOrderStates.json')
    //const response = yield call(api.fetchOrderStates, payload);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchOrderStatesSuccess({ states: response.data }));
  } catch (e) {
    console.error(e);
  }
}
export function* watchfetchOrderStates() {
  yield takeLatest(FETCH_ORDER_STATES, fetchOrderStates);
}

function* fetchOrderProducts({ payload }) {
  try {
    //const response = require('../../datamockup/dataOrderStates.json')
    const response = yield call(api.fetchOrderProducts, payload);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchOrderProductsSuccess({ states: response.data }));
  } catch (e) {
    console.error(e);
  }
}
export function* watchfetchOrderProducts() {
  yield takeLatest(FETCH_ORDER_PRODUCTS, fetchOrderProducts);
}


function* countOrders({ payload }) {
  try {
    const response = yield call(api.countOrders, payload);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchOrdersCountSuccess({ count: response.data.count }));
  } catch (e) {
    console.error(e);
    yield put(fetchOrdersCountSuccess({ count: 0 }));
  }
}
export function* watchcountOrders() {
  yield takeLatest(COUNT_ORDERS, countOrders);
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function* deleteOrderById({ payload }) {
  try {

    //const response = yield call(api.deleteOrderLineById, payload.id);
    const response = yield call(api.deleteOrderById, payload.id);
    //const response = require('../../datamockup/dataOrderDelete.json')
    //throw 'Unrecognized error';
    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    } else if (response.status === HttpStatus.CREATED) {
      yield put(deleteOrderByIdSuccess());
    } else {
      yield put(deleteOrderByIdFailed({
        message: 'No se pudo borrar el pedido.'
      }));
    }
  } catch (e) {
    yield put(deleteOrderByIdFailed({
      message: 'No se pudo borrar el pedido.'
    }));
  }
}

export function* watchdeleteOrderById() {
  yield takeLatest(DELETE_ORDER_BY_ID, deleteOrderById);
}



function* changeOrderStatusById({ payload }) {
  try {
    const response = yield call(api.changeOrderStatusById, payload.idpedido, payload.codestado);
    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    } else if (response.status === HttpStatus.CREATED ) {
      yield put(changeOrderStatusByIdSuccess( { idpedido: payload.idpedido, codestado: payload.codestado, nombre_estado: payload.nombre_estado } ) );
    } else {
      yield put(changeOrderStatusByIdFailed( { idpedido: payload.idpedido, message: 'No se ha podido actualizar el estado.' } ) );
    }
  } catch (e) {
    yield put(changeOrderStatusByIdFailed( { idpedido: payload.idpedido, message: 'No se ha podido actualizar el estado.' } ) );
  }
}

export function* watchchangeOrderStatusById() {
  yield takeLatest(CHANGE_ORDER_STATUS_BY_ID, changeOrderStatusById);
}


function* deleteOrderLineById({ payload }) {
  try {

    const response = yield call(api.deleteOrderLineById, payload.codpedido_origen, payload.idproducto);

    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    } else if ( response.status == HttpStatus.CREATED ) {
      const orderResponse = yield call(api.fetchOrderById, payload.idpedido);
      yield put(deleteOrderLineByIdSuccess({ order: orderResponse.data }));
    } else {
      yield put(deleteOrderLineByIdFailed({
        message: 'No se pudo borrar la línea.'
      }));
    }
  } catch (e) {
    console.error(e);
    yield put(deleteOrderLineByIdFailed({
      message: 'No se pudo borrar la línea.'
    }));
  }
}

export function* watchdeleteOrderLineById() {
  yield takeLatest(DELETE_ORDER_LINE_BY_ID, deleteOrderLineById);
}



function* searchOrder({ payload }) {

  try {
    yield put(fetchOrdersLoading(true));
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
