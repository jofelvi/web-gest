import { connect } from 'react-redux';
import {
	getTaskVariables,
} from '../../modules/forms/actions';
import View from './view';
export default connect(
	state => ({
		taskVariables: state.forms.taskVariables,
		
	}),
	{ getTaskVariables },
)(View)
