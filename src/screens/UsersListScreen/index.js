import { connect } from 'react-redux';

import { fetchUsers } from '../../modules/users/actions';

import View from './view';

export default connect(
  state => ({ users: state.users.list }),
  { fetchUsers }
)(View);
