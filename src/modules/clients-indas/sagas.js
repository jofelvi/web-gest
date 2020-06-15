import { takeLatest, put, call, select } from 'redux-saga/effects'

import {
	LOAD_CLIENTS_INDAS,
	LOAD_ENTITIES_INDAS,
	LOAD_WHOLESALERS_INDAS,
	EDIT_CLIENT_INDAS,
	SEARCH_CLIENT_BY,
	GET_CLIENTS_COUNT,
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
function* loadEntitiesIndas(action) {
	try {
		const response = yield call(api.getEntitiesIndas, action.payload)
		yield put(loadEntitiesIndasSuccess({ entitiesIndas: response.data }))
	} catch (e) {
		console.error(e)
		yield put(loadEntitiesIndasFailed())
	}
}

export function* watchloadEntitiesInda() {
	yield takeLatest(LOAD_ENTITIES_INDAS, loadEntitiesIndas)
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
		yield put(editClientIndasSuccess());
	} catch (e) {
		console.error(e);
		yield put(editClientIndasFailed());
	}
}

export function* watchEditClientIndas() {
	yield takeLatest(EDIT_CLIENT_INDAS, editClientIndas)
}

