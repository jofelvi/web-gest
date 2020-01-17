import { connect } from 'react-redux';

import { login } from '../../modules/auth/actions';

import View from './view';

export default connect(
  state => ({ status: state.auth.status }),
  { login }
)(View);
