import { put, call, takeLatest } from 'redux-saga/effects'
import { LOAD_CLIENTES_CBIM } from './actionTypes'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions.js'
import * as api from './api'

function* loadClientesCbim(queryParams) {
	try {
		const response = yield call(api.getClienteCBIM(queryParams))
		yield put(loadClientesCbimSuccess({ list: response.data }))
	} catch (e) {
		console.log('clientes-cbim.loadClientesCbim.error: ', e)
		yield put(loadClientesCbimFailed({ error: e }))
	}
}

export function* watchloadClientesCbim() {
	yield takeLatest(LOAD_CLIENTES_CBIM, loadClientesCbim)
}
