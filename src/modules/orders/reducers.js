import { handleActions } from 'redux-actions';
import { map } from 'underscore';
import { message } from 'antd';

import {
    fetchOrdersSuccess,
    fetchOrdersCountSuccess,
    fetchOrderByIdSuccess,
    fetchEntityByIdSuccess,
    fetchClientByIdSuccess,
    fetchProductByIdSuccess,
    deleteOrderLineByIdFailed,
    deleteOrderLineByIdSuccess,
    deleteOrderLineSetLoading,
    deleteOrderByIdSuccess,
    deleteOrderByIdFailed,
    deleteOrderSetLoading,
    changeOrderStatusByIdSuccess,
    changeOrderStatusByIdFailed,
    changeOrderStatusSetLoading,
    fetchOrderStatesSuccess
} from './actions';
import {checkLoginFailed} from "../auth/actions";
import {STATUS} from "../auth/constants";

const defaultState = {
    list: [],
    states: [],
    count: 0,
    deleteLineLoadingId: false,
    deleteLoadingId: false,
    changeOrderLoadingId: 0,
    changeOrderErrorId: 0,
    changeOrderErrorMessage: '',
};

export default handleActions(
  {
      [fetchOrderStatesSuccess]: (state, { payload }) => {
          console.log('received states', payload)
          return {
            ...state,
              states: payload.states
          }
      },
      [changeOrderStatusByIdSuccess]: (state, { payload }) => {
          const updatedList = map( state.list, ( order ) => {
              if ( order.idpedido == payload.idpedido ) {
                  const parsed_order = { ...order, codestado: payload.codestado, nombre_estado: payload.nombre_estado }
                  return parsed_order;
              }
              return order;
          } );
          return {
            ...state,
              changeOrderLoadingId: -1,
              changeOrderErrorId: 0,
              changeOrderErrorMessage: '',
             list: updatedList
        }
      },
      [changeOrderStatusByIdFailed]: (state, { payload }) => {
          message.error(payload.message);

          return {
              ...state,
              changeOrderLoadingId: -1,
              changeOrderErrorId: payload.idpedido,
              changeOrderErrorMessage: payload.message,
          }},

      [changeOrderStatusSetLoading]: (state, { payload }) => ({
              ...state,
              changeOrderLoadingId: payload.idpedido
          }),
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

  [deleteOrderLineByIdFailed]: (state, { payload }) => {
      message.error(payload.message);
          return ({
          ...state,
          deleteLineLoadingId: false,
          byId: { ...state.byId, error: payload.message, loadingLine: false }
      })
  },

      [deleteOrderLineByIdSuccess]: (state, { payload }) => {
          const list = state.list.map((item) => {
              if (item.idpedido == payload.order.idpedido) {
                  return payload.order
              }
              return item
          })

          return ({
              ...state,
              deleteLineLoadingId: false,
              byId: payload.order,
              list: list
          })
      },

      [deleteOrderLineSetLoading]: (state, { payload }) => {
          console.log('deleteOrderLineSetLoading', payload, state)
          return ({
              ...state,
              deleteLineLoadingId: payload.id,
              byId: { ...state.byId, loadingLine: payload.id }
          })
      },

      [deleteOrderSetLoading]: (state, { payload }) => ({
          ...state,
          deleteLoadingId: payload.id,
          byId: { ...state.byId, loadingDelete: true }
      }),
      [deleteOrderByIdSuccess]: (state, { payload }) => ({
          ...state,
          byId: null,
          deleteLoadingId: false
      }),
      [deleteOrderByIdFailed]: (state, { payload }) => {
          message.error(payload.message);
          return ({
              ...state,
              byId: { ...state.byId, error: payload.message, loadingDelete: false }
          })
      },


  },
  defaultState
);
