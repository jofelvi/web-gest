import { connect } from 'react-redux';

import {
  getTaskVariables,
  completeTask
} from '../../../../modules/forms/actions';

import View from './view';

export default connect(
  state => ({
    completed: state.forms.completed,
    taskVariables: state.forms.taskVariables
  }),
  { getTaskVariables, completeTask }
)(View);
