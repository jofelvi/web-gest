import { connect } from 'react-redux';

import { setSelectedTask } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    selected: state.tasks.selectedTask
  }),
  { setSelectedTask }
)(View);
