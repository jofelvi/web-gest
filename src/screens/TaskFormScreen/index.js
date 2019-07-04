import { connect } from 'react-redux';

import { fetchTaskForm } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    taskName: state.forms.taskName,
    taskId: state.tasks.selectedTask.id,
    process: state.tasks.selectedTask.processDefinitionId,
  }),
  { fetchTaskForm }
)(View);
