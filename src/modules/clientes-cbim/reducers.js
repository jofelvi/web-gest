import { handleActions } from 'redux-actions'
import {
	loadClientesCbimSuccess,
	loadClientesCbimFailed,
	loadClienteCbimEntidadesSuccess,
	loadClienteCbimEntidadesFailed,
} from './actions'

const defaultState = {
	list: [],
	error: undefined,
}

export default handleActions(
	{
		[loadClientesCbimSuccess]: (state, { payload }) => ({
			...state,
			list: payload.list,
		}),
		[loadClientesCbimFailed]: (state, { payload }) => ({
			...state,
			error: payload.error,
		}),
		[loadClienteCbimEntidadesSuccess]: (state, { payload }) => ({
			...state,
			list: payload.list,
		}),
		[loadClienteCbimEntidadesFailed]: (state, { payload }) => ({
			...state,
			error: payload.error,
		}),
	},
	defaultState,
)
