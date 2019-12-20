import { createActions } from 'redux-actions';

import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
} from './actionTypes';

export const {
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailed,
  searchOrder,
  
} = createActions(
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
  
);
