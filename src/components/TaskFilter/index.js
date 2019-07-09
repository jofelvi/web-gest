import { connect } from 'react-redux';

import { setTaskListFilter, fetchTaskList } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({ sortBy: state.tasks.sortBy }),
  { setTaskListFilter, fetchTaskList }
)(View);
