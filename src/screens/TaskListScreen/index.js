import { connect } from 'react-redux';

import { 
  fetchTaskList,
  fetchTaskForm,
  fetchTask
 } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    tasks: state.tasks.taskList,
    selectedTask: state.tasks.selectedTask,
  }),
  { fetchTaskList, fetchTaskForm, fetchTask }
)(View);
