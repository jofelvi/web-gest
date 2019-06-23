import { connect } from 'react-redux';

import { completeTask } from '../../../../modules/forms/actions';

import View from './view';

export default connect(
  () => ({}),
  { completeTask }
)(View);
