import { connect } from 'react-redux';

import { login} from '../../modules/auth/actions';
import { deleteOrderById, deleteOrderSetLoading, realDeleteOrderById } from '../../modules/orders/actions';

import View from './view';

export default connect(
  state => ({ me: state.auth.me, status: state.auth.status, lastDeletedId: state.orders.lastDeletedId, realDeleteLoadingId: state.orders.realDeleteLoadingId }),
  { login, deleteOrderById, deleteOrderSetLoading, realDeleteOrderById }
)(View);
