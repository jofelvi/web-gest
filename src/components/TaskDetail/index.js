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
	  fetchTaskAssigneeUser,
	  setDetailTaskKey,
  } from '../../modules/tasks/actions';
import View from './view';
export default connect(
	state => ({
		taskVariables: state.forms.taskVariables,
		tableK: state.tasks.tableKey,
		taskName: state.forms.taskName,
		taskMessage: state.tasks.taskMessage,
		usersAsignee: state.tasks.usersAsignee,
		taskDetailKey: state.tasks.taskDetailKey,
	}),
	{ 
		getTaskVariables,
		setTableKey,
		fetchTaskForm,
		editTask,
		fetchTaskMessage,
		editTaskMessage,
		fetchTaskAssigneeUser,
		setDetailTaskKey
	},
)(View)
