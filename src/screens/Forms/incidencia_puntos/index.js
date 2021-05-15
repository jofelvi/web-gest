import { connect } from 'react-redux'
import { startProcess } from '../../../modules/forms/actions'
import View from './view'

export default connect(
	state => ({
		processStep: state.forms.processStep,
		taskName: state.forms.taskName,
		taskId: state.forms.taskId,
	}),
	{ startProcess },
)(View)
