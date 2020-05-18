import { connect } from 'react-redux';

import { 
  setSelectedTask,
  setDetailTaskKey
 } from '../../modules/tasks/actions';

import View from './view';

export default connect(
  state => ({
    selected: state.tasks.selectedTask,
   
  }),
  { 
    setSelectedTask,
    setDetailTaskKey,
   }
)(View);
