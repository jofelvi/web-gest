import { connect } from 'react-redux';

import { fetchTaskForm } from '../../modules/tasks/actions';
import { fetchTask } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    taskName: state.forms.taskName,
    process: state.tasks.selectedTask
      ? state.tasks.selectedTask
      : state.tasks.task
  }),
  { fetchTaskForm, fetchTask }
)(View);
