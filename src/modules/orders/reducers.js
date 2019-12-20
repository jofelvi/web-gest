import { handleActions } from 'redux-actions';

import { fetchOrdersSuccess, 
  
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
    
  },
  defaultState
);
