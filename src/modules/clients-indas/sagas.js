import { takeLatest, put, call, select } from 'redux-saga/effects'

import {
	LOAD_CLIENTS_INDAS,
	LOAD_ENTITIES_INDAS,
	LOAD_WHOLESALERS_INDAS,
	EDIT_CLIENT_INDAS,
	SEARCH_CLIENT_BY,
	GET_CLIENTS_COUNT,
	GET_CLIENT,
	GET_CLIENT_ENTITIES,
	GET_CLIENT_STATISTICS_PURCHASE,
	GET_CLIENT_STATISTICS_PURCHASE_GROUPS,
	GET_CLIENT_PLANS,
	UPDATE_CLIENT,
} from './actionTypes';
import {
	loadClientsIndasFailed,
	loadClientsIndasSuccess,
	loadEntitiesIndasFailed,
	loadEntitiesIndasSuccess,
	loadWholesalersIndasFailed,
	loadWholesalersIndasSuccess,
	editClientIndasSuccess,
	editClientIndasFailed,
	getClientsCountFailed,
	getClientsCountSuccess,
	setFilterValues,
} from './actions';
import * as api from './api';
import * as HttpStatus from 'http-status-codes';
import {UPDATE_PLAN} from "../planes-compra/actionTypes";

//clients indas
function* loadClientsIndas({payload = { page: 1, emailComo: '', nombreComo: '', codcli_cbim: ''}}) {
	try {
		const response = yield call(api.getUsers, payload);
		yield put(loadClientsIndasSuccess({ list: response.data, userMeta: payload }));
	} catch (e) {
		console.error(e);
		yield put(loadClientsIndasFailed());
	}
}

export function* watchloadClientsIndas() {
	yield takeLatest(LOAD_CLIENTS_INDAS, loadClientsIndas)
}

function* getClientsCount({payload = { emailComo: '', nombreComo: '', codcli_cbim: '' }}) {
	try {
	  const response = yield call(api.getUsersCount, payload);
	  yield put(getClientsCountSuccess(response.data));
	} catch (e) {
	  console.error(e);
	  yield put(getClientsCountFailed());
	}
  }
export function* watchGetClientsCount() {
	yield takeLatest(GET_CLIENTS_COUNT, getClientsCount)
}

//entities indas
function* loadEntitiesIndas({ payload }) {
	try {
		const request_payload = payload.filters ? { filters: payload.filters, page: payload.page } : false
		const response = yield call(api.getEntitiesIndas, request_payload )
		const count_response = yield call(api.countEntitiesIndas, request_payload )

		yield put(loadEntitiesIndasSuccess({ entitiesIndas: response.data, count: count_response.data.count }))
		if ( typeof payload.success == 'function' ) {
			payload.success(response.data, count_response.data.count )
		}
	} catch (e) {
		console.error(e)
		yield put(loadEntitiesIndasFailed())
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}

export function* watchloadEntitiesInda() {
	yield takeLatest(LOAD_ENTITIES_INDAS, loadEntitiesIndas)
}

function* getClientStatisticsPurchase( { payload } ) {
	try {
		const response = yield call( api.getClientStatisticsPurchase, payload.idcliente )
		if ( typeof payload.success == 'function' ) {
			payload.success(response.data)
		}
	} catch (e) {
		console.error(e)
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}

export function* watchgetClientStatisticsPurchase() {
	yield takeLatest(GET_CLIENT_STATISTICS_PURCHASE, getClientStatisticsPurchase)
}

function* getClientPlans( { payload } ) {
	try {
		const response = yield call( api.getClientPlans, payload.idcliente )
		if ( typeof payload.success == 'function' ) {
			payload.success(response.data)
		}
	} catch (e) {
		console.error(e)
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}

export function* watchgetClientPlans() {
	yield takeLatest(GET_CLIENT_PLANS, getClientPlans)
}

function* getClient({ payload }) {
	try {
		const response = yield call(api.getClient, payload.idcliente )

		if ( typeof payload.success == 'function' ) {
			payload.success(response.data)
		}
	} catch (e) {
		console.error(e)
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}

export function* watchgetClient() {
	yield takeLatest(GET_CLIENT, getClient )
}

function* getClientEntities( { payload } ) {
	try {
		const response = yield call( api.getClientEntities, payload.idcliente )
		if ( typeof payload.success == 'function' ) {
			payload.success(response.data)
		}
	} catch (e) {
		console.error(e)
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}

export function* watchgetClientEntities() {
	yield takeLatest(GET_CLIENT_ENTITIES, getClientEntities );
}

//wholesalers indas
function* loadWholesalersIndas(idEntity) {
	try {
		const response = yield call(api.getWholesalersIndas, idEntity.payload)
		yield put(
			loadWholesalersIndasSuccess({ wholesalersIndas: response.data }),
		)
	} catch (e) {
		console.error(e)
		yield put(loadWholesalersIndasFailed())
	}
}

export function* watchloadWholesalersIndas() {
	yield takeLatest(LOAD_WHOLESALERS_INDAS, loadWholesalersIndas)
}

function* editClientIndas({ payload }) {
	const isPayloadEmail = payload && payload.email;
	const {id, email, idestado, ind_renovar_pass } = payload;
	try {
		const response = yield call(api.editClientTR, id, isPayloadEmail ? { email: email, ind_renovar_pass: ind_renovar_pass } : { idestado: idestado , ind_renovar_pass: idestado === 0 ? false : ind_renovar_pass } );
		if( response && response.status === 204){
			yield put(editClientIndasSuccess());
			if ( typeof payload.success == 'function' ) {
				payload.success(response.data)
			}
		}

	} catch (e) {
		console.error(e);
		if (e.response.status === 522) {
			console.log("entra error 522")
			yield put(editClientIndasFailed("Este email ya existe"));
			if ( typeof payload.success == 'function' ) {
				payload.error(e, true)
			}
		}else{
			payload.error(e, false)
		    yield put(editClientIndasFailed());
		}
	}
}

export function* watchEditClientIndas() {
	yield takeLatest(EDIT_CLIENT_INDAS, editClientIndas)
}

function* updateClient( { payload } ) {
	try {
		const response = yield call( api.updateClient , payload.client );
		const { data } = response;
		payload.success( data );
	} catch (e) {
		payload.error(e);
	}
}
export function* watchupdateClient() {
	yield takeLatest( UPDATE_CLIENT, updateClient );
}


function* getClientStatisticsPurchaseGroups( { payload } ) {
	try {
		const response = yield call( api.getClientStatisticsPurchaseGroups, payload.idcliente )
		if ( typeof payload.success == 'function' ) {
			payload.success(response.data)
		}
	} catch (e) {
		console.error(e)
		if ( typeof payload.error == 'function' ) {
			payload.error(e)
		}
	}
}
export function* watchgetClientStatisticsPurchaseGroups() {
	yield takeLatest( GET_CLIENT_STATISTICS_PURCHASE_GROUPS, getClientStatisticsPurchaseGroups );
}
