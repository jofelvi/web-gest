import { takeLatest, put, call } from 'redux-saga/effects';

import { 
  LOAD_COMMERCIAL_DEALS,
  LOAD_OFFERS,
  LOAD_AGREEMENTS,
  LOAD_PLANS,
  LOAD_CAMPAIGNS
} from './actionTypes';
import {
  loadCommercialDealsSuccess,
  loadCommercialDealsFailed,
  loadOffersSuccess,
  loadOffersFailed,
  loadAgreementsSuccess,
  loadAgreementsFailed,
  loadPlansSuccess,
  loadPlansFailed,
  loadCampaignsSuccess,
  loadCampaignsFailed
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

function* loadOffers({payload}) {
  try {
    const response = yield call(api.getOffers,payload);
    yield put(loadOffersSuccess({ offers: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadOffersFailed);
  }
}

export function* watchloadOffers() {
  yield takeLatest(LOAD_OFFERS, loadOffers);
}

function* loadAgreements({payload}) {
  try {
    const response = yield call(api.getAgreements,payload);
    yield put(loadAgreementsSuccess({ agreements: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadAgreementsFailed);
  }
}

export function* watchAgreements() {
  yield takeLatest(LOAD_AGREEMENTS, loadAgreements);
}
function* loadPlans({payload}) {
  try {
    const response = yield call(api.getPlans,payload);
    yield put(loadPlansSuccess({ plans: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadPlansFailed);
  }
}

export function* watchloadPlans() {
  yield takeLatest(LOAD_PLANS, loadPlans);
}
function* loadCampaigns({payload}) {
  try {
    const response = yield call(api.getCampaigns,payload);
    yield put(loadCampaignsSuccess({ campaigns: response.data }));
  } catch (e) {
    console.error(e);
    yield put(loadCampaignsFailed);
  }
}

export function* watchloadCampaigns() {
  yield takeLatest(LOAD_CAMPAIGNS, loadCampaigns);
}


