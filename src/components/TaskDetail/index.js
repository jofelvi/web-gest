import { connect } from 'react-redux';
import {
	getTaskVariables,

} from '../../modules/forms/actions';
import {
	  setTableKey,
	  fetchTaskForm,
	  editTask,
	  fetchTaskMessage,
	  editTaskMessage,
  } from '../../modules/tasks/actions';
import View from './view';
export default connect(
	state => ({
		taskVariables: state.forms.taskVariables,
		tableK: state.tasks.tableKey,
		taskName: state.forms.taskName,
		taskMessage: state.tasks.taskMessage,
	}),
	{ 
		getTaskVariables,
		setTableKey,
		fetchTaskForm,
		editTask,
		fetchTaskMessage,
		editTaskMessage,
	},
)(View)
