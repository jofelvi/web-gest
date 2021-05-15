import { connect } from 'react-redux';

import {
    fetchOrders,
    searchOrder,
    fetchOrderById,
    countOrders,
    deleteOrderLineById,
    deleteOrderLineSetLoading,
    fetchOrderStates,
    fetchOrderProducts,
    setOrderListState,
} from '../../modules/orders/actions';

import View from './view';
import {fetchDelegados, fetchPlans, setFilters} from "../../modules/planes-compra/actions";

export default connect(
  state => ({
    orders: state.orders.list,
    loadingList: state.orders.loadingList,
    order: state.orders.byId,
    count: state.orders.count,
    entity: state.orders.byCodEntity,
    client: state.orders.byIdClient,
    states: state.orders.states,
      deleteLineLoadingId: state.orders.deleteLineLoadingId,
      deleteLoadingId: state.orders.deleteLoadingId,
      savedState: state.orders.listState,
  }),
  { setOrderListState, fetchOrders, searchOrder, fetchOrderById, countOrders, deleteOrderLineById, deleteOrderLineSetLoading, fetchOrderStates, fetchOrderProducts }
)(View);
