import { handleActions } from 'redux-actions'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions'

const defaultState = {
	clientesCbim: [],
	error: undefined,
}

export default handleActions(
	{
		[loadClientsIndasSuccess]: (state, { payload }) => ({
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
