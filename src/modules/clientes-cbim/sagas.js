import { put, call, takeLatest } from 'redux-saga/effects'
import {
	LOAD_CLIENTES_CBIM,
	LOAD_CLIENTE_CBIM_ENTIDADES,
} from './actionTypes'
import {
	loadClientesCbimSuccess,
	loadClientesCbimFailed,
	loadClienteCbimEntidadesSuccess,
	loadClienteCbimEntidadesFailed,
} from './actions.js'
import * as api from './api'

function* loadClientesCbim(args) {
	try {
		const query = args.payload
		const response =
			!query || query.length === 0
				? null
				: yield call(api.getClienteCBIM, args.payload)
		yield put(
			loadClientesCbimSuccess({
				list: response && response.data ? response.data : [],
			}),
		)
	} catch (e) {
		console.error('clientes-cbim.loadClientesCbim: ', e)
		yield put(loadClientesCbimFailed({ error: e }))
	}
}

export function* watchloadClientesCbim() {
	yield takeLatest(LOAD_CLIENTES_CBIM, loadClientesCbim)
}

function* loadClienteCbimEntidades(args) {
	try {
		const query = args.payload
		const response =
			!query || query.length === 0
				? null
				: yield call(api.getClienteCBIMEntidades, args.payload)
		yield put(
			loadClienteCbimEntidadesSuccess({
				list: response && response.data ? response.data : [],
			}),
		)
	} catch (e) {
		console.error('clientes-cbim.loadClientesCbimEntidades: ', e)
		yield put(loadClienteCbimEntidadesFailed({ error: e }))
	}
}

export function* watchloadClienteCbimEntidades() {
	yield takeLatest(LOAD_CLIENTE_CBIM_ENTIDADES, loadClienteCbimEntidades)
}
