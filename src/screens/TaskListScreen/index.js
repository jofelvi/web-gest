import { connect } from 'react-redux';

import { fetchTaskList } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({ tasks: state.tasks.taskList }),
  { fetchTaskList }
)(View);
