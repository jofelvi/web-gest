import { handleActions } from 'redux-actions'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions'
import { listaClientesCbim } from './clientescbim'

const defaultState = {
	list: listaClientesCbim,
	error: undefined,
}

export default handleActions(
	{
		[loadClientesCbimSuccess]: (state, { payload }) => ({
			...state,
			clientesCbim: payload.list,
		}),
		[loadClientesCbimFailed]: (state, { payload }) => ({
			...state,
			error: payload.error,
		}),
	},
	defaultState,
)
