import { handleActions } from 'redux-actions';

import { 
  fetchOrdersSuccess, 
  fetchOrderByIdSuccess,
  fetchEntityByIdSuccess,
  fetchClientByIdSuccess,
  fetchProductByIdSuccess
  
} from './actions';

const defaultState = {
  list: []
};

export default handleActions(
  {
    [fetchOrdersSuccess]: (state, { payload }) => ({
      ...state,
      list: payload.orders
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
    })
    
  },
  defaultState
);
