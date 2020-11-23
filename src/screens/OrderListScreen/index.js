import { connect } from 'react-redux';

import {
    fetchOrders,
    searchOrder,
    fetchOrderById,
    countOrders,
    deleteOrderLineById,
    deleteOrderLineSetLoading,
} from '../../modules/orders/actions';

import View from './view';

export default connect(
  state => ({ 
    orders: state.orders.list,
    order: state.orders.byId,
    count: state.orders.count,
    entity: state.orders.byCodEntity,
    client: state.orders.byIdClient,
  }),
  {fetchOrders, searchOrder, fetchOrderById, countOrders, deleteOrderLineById, deleteOrderLineSetLoading }
)(View);
