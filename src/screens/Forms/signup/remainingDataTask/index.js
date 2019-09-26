import { connect } from 'react-redux';

import {
  getTaskVariables,
  completeTask,
} from '../../../../modules/forms/actions';

import { fetchTask } from '../../../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    taskVariables: state.forms.taskVariables,
    task: state.tasks.task,
  }),
  { completeTask, getTaskVariables, fetchTask }
)(View);
