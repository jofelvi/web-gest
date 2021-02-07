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
    fetchSubmarcaCollectionsSuccess,
    fetchSubmarcaCollectionsFailed,
    fetchSubmarcaCollectionsLoading,
    createSubmarcaCollectionSuccess,
    createSubmarcaCollectionFailed,
    createSubmarcaCollectionSetLoading,
    fetchPlanSuccess,
} from './actions';

import {
    FETCH_PLANS,
    FETCH_DELEGADOS,
    CREATE_PLAN,
    FETCH_SUBMARCA_COLLECTIONS,
    CREATE_SUBMARCA_COLLECTION,
    UPDATE_PLAN,
    FETCH_PLAN,
} from './actionTypes';

import * as api from './api';

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
        const response = yield call( api.createPlan , payload.plan );
        const { data } = response;
        //yield put(setCurrentCommercialDeal({...data}))
        //yield put (getCommercialDealId({idCommercialDeal: response.data.idcondcomercial}))
        yield put(createPlanSuccess({ plan: response.data }));
    } catch (e) {
        console.error(e);
        yield put(createPlanFailed());
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



function* fetchSubmarcaCollections({ payload }) {

    try {
        yield put(fetchSubmarcaCollectionsLoading({ loading: true } ));
        const response = yield call(api.fetchSubmarcaCollections, payload);
        //const response = require('../../datamockup/planes-compra/fetchPlans.json')

        if (response.status === HttpStatus.UNAUTHORIZED) {
            payload.history.push('/login');
        }
        yield put(fetchSubmarcaCollectionsSuccess({ submarcaCollections: response.data }));



    } catch (e) {
        console.error(e);
        yield put(fetchSubmarcaCollectionsFailed());
    }
}
export function* watchfetchSubmarcaCollections() {
    yield takeLatest(FETCH_SUBMARCA_COLLECTIONS, fetchSubmarcaCollections);
}

function* createSubmarcaCollection( { payload }, callback ) {
    try {
        const response = yield call( api.createSubmarcaCollection , payload.collection );
        const { data } = response;
        //yield put(setCurrentCommercialDeal({...data}))
        //yield put (getCommercialDealId({idCommercialDeal: response.data.idcondcomercial}))
        yield put(createSubmarcaCollectionSuccess({ submarca_collection: response.data }));
        yield put(payload.callback( response.data ))
    } catch (e) {
        console.error(e);
        yield put(createSubmarcaCollectionFailed());
    }
}

export function* watchcreateSubmarcaCollection() {
    yield takeLatest( CREATE_SUBMARCA_COLLECTION, createSubmarcaCollection );
}

function* fetchPlan( { payload } ) {
    try {
        const response = yield call( api.getPlan , payload.idcondcomercial );
        const { data } = response;
        console.log('PLAN FETCHED', data)

        yield put(fetchPlanSuccess({ plan: response.data }));
    } catch (e) {
        payload.error(e);
    }
}

export function* watchfetchPlan() {
    yield takeLatest( FETCH_PLAN, fetchPlan );
}

function* updatePlan( { payload } ) {
    try {
        const response = yield call( api.editPlan , payload.plan );
        const { data } = response;
        payload.success( data );
    } catch (e) {
        payload.error(e);
    }
}

export function* watchupdatePlan() {
    yield takeLatest( UPDATE_PLAN, updatePlan );
}
