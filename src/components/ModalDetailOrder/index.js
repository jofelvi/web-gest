import { connect } from 'react-redux';

import { login} from '../../modules/auth/actions';
import { deleteOrderById, deleteOrderSetLoading } from '../../modules/orders/actions';

import View from './view';

export default connect(
  state => ({ status: state.auth.status, lastDeletedId: state.orders.lastDeletedId }),
  { login, deleteOrderById, deleteOrderSetLoading }
)(View);
