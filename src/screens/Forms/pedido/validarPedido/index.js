import { connect } from 'react-redux';

import {
  getTaskVariables,
  completeTask,
} from '../../../../modules/forms/actions';

import { fetchTask } from '../../../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    completed: state.forms.completed,
    taskVariables: state.forms.taskVariables,
    task: state.tasks.task,
  }),
  { getTaskVariables, completeTask, fetchTask }
)(View);
