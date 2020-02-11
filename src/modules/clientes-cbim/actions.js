import { createActions } from 'redux-actions'

import {
	LOAD_CLIENTES_CBIM,
	LOAD_CLIENTES_CBIM_SUCCESS,
	LOAD_CLIENTES_CBIM_FAILED,
} from './actionTypes'

export const {
	loadClientesCbim,
	loadClientesCbimSuccess,
	loadClientesCbimFailed,
} = createActions(
	LOAD_CLIENTES_CBIM,
	LOAD_CLIENTES_CBIM_SUCCESS,
	LOAD_CLIENTES_CBIM_FAILED,
)
