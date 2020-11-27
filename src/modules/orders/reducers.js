import { handleActions } from 'redux-actions';
import { map } from 'underscore';

import {
    fetchOrdersSuccess,
    fetchOrdersCountSuccess,
    fetchOrderByIdSuccess,
    fetchEntityByIdSuccess,
    fetchClientByIdSuccess,
    fetchProductByIdSuccess,
    deleteOrderLineByIdFailed,
    deleteOrderLineSetLoading,
    deleteOrderByIdSuccess,
    deleteOrderByIdFailed,
    deleteOrderSetLoading,
    changeOrderStatusByIdSuccess,
} from './actions';
import {checkLoginFailed} from "../auth/actions";
import {STATUS} from "../auth/constants";

const defaultState = {
  list: [],
  count: 0
};

export default handleActions(
  {
      [changeOrderStatusByIdSuccess]: (state, { payload }) => {
          const updatedList = map( state.list, ( order ) => ( order.idpedido == payload.order.idpedido ? payload.order : order  ) )
          return {
         ...state,
         list: updatedList
      }},
    [fetchOrdersSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.orders
    }),
      [fetchOrdersCountSuccess]: (state, { payload }) => ({
          ...state,
          count: payload.count
      }),

    [fetchOrderByIdSuccess]: (state, { payload }) => ({
      ...state,
      byId: payload.order
    }),
    
    [fetchEntityByIdSuccess]: (state, { payload }) => ({
      ...state,
      byCodEntity: payload.entity
    }),

    [fetchClientByIdSuccess]: (state, { payload }) => ({
      ...state,
      byIdClient: payload.client
    }),

    [fetchProductByIdSuccess]: (state, { payload }) => ({
      ...state,
      byIdProduct: payload.product
    }),

  [deleteOrderLineByIdFailed]: (state, { payload }) => ({
      ...state,
      byId: { ...state.byId, error: payload.message, loadingLine: false }
  }),

      [deleteOrderLineSetLoading]: (state, { payload }) => ({
          ...state,
          byId: { ...state.byId, loadingLine: payload.id }
      }),

      [deleteOrderSetLoading]: (state, { payload }) => ({
          ...state,
          byId: { ...state.byId, loadingDelete: true }
      }),


      [deleteOrderByIdSuccess]: (state, { payload }) => ({
          ...state,
          byId: null,
          loadingDelete: false
      }),

      [deleteOrderByIdFailed]: (state, { payload }) => ({
          ...state,
          byId: { ...state.byId, error: payload.message, loadingDelete: false }
      }),


  },
  defaultState
);
