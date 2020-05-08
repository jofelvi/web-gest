import { connect } from 'react-redux';
import {
	getTaskVariables,

} from '../../modules/forms/actions';
import {
	  setTableKey,
  } from '../../modules/tasks/actions';
import View from './view';
export default connect(
	state => ({
		taskVariables: state.forms.taskVariables,
		tableK: state.tasks.tableKey,	
	}),
	{ 
		getTaskVariables,
		setTableKey,
	},
)(View)
