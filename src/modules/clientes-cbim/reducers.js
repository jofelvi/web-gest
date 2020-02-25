import { handleActions } from 'redux-actions'
import { loadClientesCbimSuccess, loadClientesCbimFailed } from './actions'

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
	},
	defaultState,
)
