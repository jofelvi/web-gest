import { connect } from 'react-redux'
import {
	getTaskVariables,
	completeTask,
} from '../../../../modules/forms/actions'
import { fetchTask } from '../../../../modules/tasks/actions'
import { loadClientesCbim } from '../../../../modules/clientes-cbim/actions';
import View from './view'

export default connect(
	state => ({
		completed: state.forms.completed,
		taskVariables: state.forms.taskVariables,
		task: state.tasks.task,
		token: state.auth.token,
		clientesCbim: state.clientesCbim
	}),
	{ getTaskVariables, completeTask, fetchTask, loadClientesCbim  },
)(View)
