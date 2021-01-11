import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
    fetchPlansSuccess,
    fetchPlansLoading,
    fetchPlansFailed,
} from './actions';

import {
    FETCH_PLANS,
} from './actionTypes';

import * as api from './api';

function* fetchPlans({ payload }) {
    try {
        yield put(fetchPlansLoading(true));
        //const response = yield call(api.fetchPlans, payload);
        const response = require('../../datamockup/planes-compra/fetchPlans.json')


        if (response.status === HttpStatus.UNAUTHORIZED) {
            payload.history.push('/login');
        }

        yield put(fetchPlansSuccess({ plans: response.data }));
    } catch (e) {
        console.error(e);
        yield put(fetchPlansFailed());
    }
}
export function* watchfetchPlans() {
    yield takeLatest(FETCH_PLANS, fetchPlans);
}