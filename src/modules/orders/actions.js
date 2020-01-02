import { createActions } from 'redux-actions';

import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_BY_ID,
  FETCH_ENTITY_BY_ID,
  FETCH_ENTITY_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
} from './actionTypes';

export const {
  fetchOrders,
  fetchOrderById,
  fetchEntityById,
  fetchEntityByIdSuccess,
  fetchOrdersSuccess,
  fetchOrderByIdSuccess,
  fetchOrdersFailed,
  searchOrder,
  
} = createActions(
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_BY_ID,
  FETCH_ENTITY_BY_ID,
  FETCH_ENTITY_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
  
);
