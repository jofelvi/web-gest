import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

import {
    fetchDelegadosSuccess,
    fetchDelegadosFailed,
    fetchPlansSuccess,
    fetchPlansCountSuccess,
    fetchPlansLoading,
    fetchPlansFailed,
    createPlanSuccess,
    createPlanFailed,
    createPlanSetLoading,
} from './actions';

import {
    FETCH_PLANS,
    FETCH_DELEGADOS,
    CREATE_PLAN,
} from './actionTypes';

import * as api from './api';
import {
    createCommercialDealFailed,
    createCommercialDealSuccess,
    getCommercialDealId,
    setCurrentCommercialDeal
} from "../commercialDeals/actions";
import {CREATE_COMMERCIAL_DEAL} from "../commercialDeals/actionTypes";
import {fetchOrdersCountSuccess} from "../orders/actions";

function* fetchPlans({ payload }) {

    try {
        yield put(fetchPlansLoading({ loading: true } ));
        const response = yield call(api.fetchPlans, payload);
        //const response = require('../../datamockup/planes-compra/fetchPlans.json')

        if (response.status === HttpStatus.UNAUTHORIZED) {
            payload.history.push('/login');
        }
        yield put(fetchPlansSuccess({ plans: response.data }));

        const count_response = yield call(api.countPlans, payload);
        if (count_response.status === HttpStatus.OK ) {
            yield put(fetchPlansCountSuccess({ count: count_response.data.count }));
        }


    } catch (e) {
        console.error(e);
        yield put(fetchPlansFailed());
    }
}
export function* watchfetchPlans() {
    yield takeLatest(FETCH_PLANS, fetchPlans);
}

function* createPlan( { payload } ) {
    try {
        yield put( createPlanSetLoading( true ) );
        const response = yield call( api.createPlan , payload.plan );
        const { data } = response;
        //yield put(setCurrentCommercialDeal({...data}))
        //yield put (getCommercialDealId({idCommercialDeal: response.data.idcondcomercial}))
        yield put(createPlanSuccess({ plan: response.data }));
    } catch (e) {
        console.error(e);
        yield put(createPlanFailed);
    }
}

export function* watchcreatePlan() {
    yield takeLatest( CREATE_PLAN, createPlan );
}

function* fetchDelegados({ payload }) {

    try {
        const response = yield call(api.fetchDelegados, payload);
        //const response = require('../../datamockup/planes-compra/fetchPlans.json')

        if (response.status === HttpStatus.UNAUTHORIZED) {
            payload.history.push('/login');
        }
        yield put(fetchDelegadosSuccess({ delegados: response.data }));

    } catch (e) {
        console.error(e);
        yield put(fetchDelegadosFailed());
    }
}
export function* watchfetchDelegados() {
    yield takeLatest(FETCH_DELEGADOS, fetchDelegados);
}
