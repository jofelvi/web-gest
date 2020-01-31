import { put, call } from 'redux-saga/effects'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions.js'
import * as api from './api'

function* loadClientesCbim(queryParams) {
	try {
		const response = yield call(api.getClienteCBIM(queryParams))
		yield put(loadClientesCbimSuccess({ list: response.data }))
	} catch (e) {
		console.log('clientes-cbim.loadClientesCbim.error: ', error)
		yield put(loadClientesCbimFailed({ error: e }))
	}
}
