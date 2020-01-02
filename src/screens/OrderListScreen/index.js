import { connect } from 'react-redux';

import { fetchOrders, searchOrder, fetchOrderById } from '../../modules/orders/actions';

import View from './view';

export default connect(
  state => ({ 
    orders: state.orders.list,
    order: state.orders.byId,
    entity: state.orders.byCodEntity
  }),
  {fetchOrders, searchOrder, fetchOrderById}
)(View);
