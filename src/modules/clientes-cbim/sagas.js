import { put, call, takeLatest } from 'redux-saga/effects'
import { LOAD_CLIENTES_CBIM } from './actionTypes'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions.js'
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
