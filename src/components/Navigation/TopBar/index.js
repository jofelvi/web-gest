import View from './view';
import { connect } from 'react-redux';

import { logout } from '../../../modules/auth/actions';

export default connect(
    state => ({
      status: state.auth.status,
        me: state.auth.me
    }),
    { logout }
  )(View);