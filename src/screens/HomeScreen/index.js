import { connect } from 'react-redux';

import { fetchTaskForm } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    process: state.forms.process,
    taskName: state.forms.taskName,
    taskId: state.forms.taskId,
    completed: state.forms.completed,
  }),
  { fetchTaskForm }
)(View);
