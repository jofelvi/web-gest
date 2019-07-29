import { takeLatest, put, call } from 'redux-saga/effects';

import { LOAD_COMMERCIAL_DEALS} from './actionTypes';
import {
  loadCommercialDealsSuccess,
  loadCommercialDealsFailed
} from './actions';

import * as api from './api';

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


