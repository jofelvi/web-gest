import { createActions } from 'redux-actions'

import {
	LOAD_CLIENTES_CBIM,
	LOAD_CLIENTES_CBIM_SUCCESS,
	LOAD_CLIENTES_CBIM_FAILED,
	LOAD_CLIENTE_CBIM_ENTIDADES,
	LOAD_CLIENTE_CBIM_ENTIDADES_SUCCESS,
	LOAD_CLIENTE_CBIM_ENTIDADES_FAILED,
} from './actionTypes'

export const {
	loadClientesCbim,
	loadClientesCbimSuccess,
	loadClientesCbimFailed,
	loadClienteCbimEntidades,
	loadClienteCbimEntidadesSuccess,
	loadClienteCbimEntidadesFailed,
} = createActions(
	LOAD_CLIENTES_CBIM,
	LOAD_CLIENTES_CBIM_SUCCESS,
	LOAD_CLIENTES_CBIM_FAILED,
	LOAD_CLIENTE_CBIM_ENTIDADES,
	LOAD_CLIENTE_CBIM_ENTIDADES_SUCCESS,
	LOAD_CLIENTE_CBIM_ENTIDADES_FAILED,
)
