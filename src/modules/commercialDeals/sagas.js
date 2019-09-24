import { takeLatest, put, call } from 'redux-saga/effects';

import { 
  LOAD_COMMERCIAL_DEALS,
  CREATE_COMMERCIAL_DEAL,
  LOAD_FAMILIES,
  LOAD_SUB_FAMILIES,
  LOAD_PRODUCTS,
  LOAD_USERS
} from './actionTypes';
import {
  loadCommercialDealsSuccess,
  loadCommercialDealsFailed,
  createCommercialDealFailed,
  createCommercialDealSuccess,
  loadFamiliesSuccess,
  loadFamiliesFailed,
  loadSubFamiliesSuccess,
  loadSubFamiliesFailed,
  loadProductsFailed,
  loadProductsSuccess,
  loadUsersFailed,
  loadUsersSuccess
} from './actions';

import * as api from './api';

// commercial deals
function* loadCommercialDeals() {
  try {
    const response = yield call(api.getCommercialDeals);
    yield put(loadCommercialDealsSuccess({ commercialDeals: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadCommercialDealsFailed());
  }
}

export function* watchloadCommercialDeals() {
  yield takeLatest(LOAD_COMMERCIAL_DEALS, loadCommercialDeals);
}

function* createCommercialDeal({payload}) {
  try {
    const response = yield call(api.createCommercialDeal,payload);
    yield put(createCommercialDealSuccess({ deal: response.data }));
  } catch (e) {
    console.error(e);
    yield put(createCommercialDealFailed);
  }
}

export function* watchCreateCommercialDeal() {
  yield takeLatest(CREATE_COMMERCIAL_DEAL, createCommercialDeal);
}

//Lists

//families
function* loadFamilies() {
  try {
    const response = yield call(api.getFamlies);
    yield put(loadFamiliesSuccess({ families: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadFamiliesFailed());
  }
}
export function* watchloadFamilies() {
  yield takeLatest(LOAD_FAMILIES, loadFamilies);
}
//subfamilies
function* loadSubFamilies() {
  try {
    const response = yield call(api.getSubFamilies);
    yield put(loadSubFamiliesSuccess({ subFamilies: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadSubFamiliesFailed());
  }
}
export function* watchloadSubFamilies() {
  yield takeLatest(LOAD_SUB_FAMILIES, loadSubFamilies);
}
//products
function* loadProducts() {
  try {
    const response = yield call(api.getProducts);
    yield put(loadProductsSuccess({ products: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadProductsFailed());
  }
}
export function* watchloadProducts() {
  yield takeLatest(LOAD_PRODUCTS, loadProducts);
}
//users
function* loadUsers() {
  try {
    const response = yield call(api.getUsers);
    yield put(loadUsersSuccess({ users: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadUsersFailed());
  }
}
export function* watchloadUsers() {
  yield takeLatest(LOAD_USERS, loadUsers);
}