import { connect } from 'react-redux';

import {
  getTaskVariables,
  completeTask,
} from '../../../../modules/forms/actions';

import View from './view';

export default connect(
  () => ({}),
  { completeTask, getTaskVariables }
)(View);
