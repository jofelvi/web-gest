import { connect } from 'react-redux';

import { fetchOrders, searchOrder } from '../../modules/orders/actions';

import View from './view';

export default connect(
  state => ({ orders: state.orders.list}),
  {fetchOrders, searchOrder}
)(View);
