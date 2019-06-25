import { connect } from 'react-redux';

import { fetchTasks } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({ tasks: state.tasks.list }),
  { fetchTasks }
)(View);
