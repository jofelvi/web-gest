import { connect } from 'react-redux'
import {
	getTaskVariables,
	completeTask,
} from '../../../../modules/forms/actions'
import { fetchTask } from '../../../../modules/tasks/actions'
import { loadEntitiesIndas } from '../../../../modules/clients-indas/actions';
import View from './view'

export default connect(
	state => ({
		completed: state.forms.completed,
		taskVariables: state.forms.taskVariables,
		task: state.tasks.task,
		token: state.auth.token,
    entitiesIndas: state.clientsIndas.entitiesIndas,
	}),
	{ getTaskVariables, completeTask, fetchTask, loadEntitiesIndas },
)(View)
