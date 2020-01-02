import { handleActions } from 'redux-actions';

import { 
  fetchOrdersSuccess, 
  fetchOrderByIdSuccess,
  fetchEntityByIdSuccess,
  
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
    })
  },
  defaultState
);
