import { connect } from 'react-redux';

import { logout } from '../../modules/auth/actions';

import View from './view';

export default connect(
  state => ({
    //status: state.auth.status
  }),
  { logout }
)(View);
