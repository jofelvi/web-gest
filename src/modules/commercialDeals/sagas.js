import { takeLatest, put, call } from 'redux-saga/effects';

import { 
  LOAD_COMMERCIAL_DEALS,
  CREATE_COMMERCIAL_DEAL,
  EDIT_COMMERCIAL_DEAL,
  LOAD_FAMILIES,
  LOAD_SUB_FAMILIES,
  LOAD_PRODUCTS,
  LOAD_BRANDS,
  LOAD_SUB_BRANDS,
  LOAD_USERS,
  LOAD_DEAL_TYPES
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
  loadBrandsSuccess,
  loadBrandsFailed,
  loadSubBrandsSuccess,
  loadSubBrandsFailed,
  loadUsersFailed,
  loadUsersSuccess,
  loadDealTypesSuccess,
  loadDealTypesFailed,
  getCommercialDealId
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
    yield put (getCommercialDealId({idCommercialDeal: response.data.idcondcomercial}))
    yield put(createCommercialDealSuccess({ deal: response }));
  } catch (e) {
    console.error(e);
    yield put(createCommercialDealFailed);
  }
}

export function* watchCreateCommercialDeal() {
  yield takeLatest(CREATE_COMMERCIAL_DEAL, createCommercialDeal);
}


function* editCommercialDeal({payload}) {
 
  try {
    const response = yield call(api.editCommercialDeal,payload.id.idCommercialDeal, payload.values );
    //yield put(editCommercialDealSuccess({ deal: response.data }));
  } catch (e) {
    console.error(e);
    yield put(createCommercialDealFailed);
  }
}

export function* watchEditCommercialDeal() {
  yield takeLatest(EDIT_COMMERCIAL_DEAL, editCommercialDeal);
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
//brands
function* loadBrands() {
  try {
    const response = yield call(api.getBrands);
    yield put(loadBrandsSuccess({ brands: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadBrandsFailed());
  }
}
export function* watchloadBrands() {
  yield takeLatest(LOAD_BRANDS, loadBrands);
}
//subbrands
function* loadSubBrands() {
  try {
    const response = yield call(api.getSubBrands);
    yield put(loadSubBrandsSuccess({ subBrands: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadSubBrandsFailed());
  }
}
export function* watchloadSubBrands() {
  yield takeLatest(LOAD_SUB_BRANDS, loadSubBrands);
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
//dealTypes
function* loadDealTypes() {
  try {
    const response = yield call(api.getDealTypes);
    yield put(loadDealTypesSuccess({ dealTypes: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadDealTypesFailed());
  }
}
export function* watchloadDealTypes() {
  yield takeLatest(LOAD_DEAL_TYPES, loadDealTypes);
}