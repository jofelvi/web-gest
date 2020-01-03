import { createActions } from 'redux-actions';

import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDER_BY_ID,
  FETCH_ENTITY_BY_ID,
  FETCH_ENTITY_BY_ID_SUCCESS,
  FETCH_ORDER_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
  FETCH_CLIENT_BY_ID_SUCCESS
} from './actionTypes';

export const {
  fetchOrders,
  fetchOrderById,
  fetchEntityById,
  fetchEntityByIdSuccess,
  fetchClientByIdSuccess,
  fetchProductByIdSuccess,
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
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_CLIENT_BY_ID_SUCCESS,
  FETCH_ORDERS_FAILED,
  SEARCH_ORDER,
  
);
