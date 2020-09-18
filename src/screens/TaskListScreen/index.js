import { connect } from 'react-redux';

import { 
  fetchTaskList,
  fetchTaskForm,
  fetchTask,
  fetchTaskMessage,
  fetchTaskListUser
 } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    user: state,
    tasks: state.tasks.taskList,
    selectedTask: state.tasks.selectedTask,
  }),
  { 
    fetchTaskList, 
    fetchTaskForm, 
    fetchTask,
    fetchTaskMessage,
    fetchTaskListUser
  }
)(View);
