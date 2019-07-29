import { handleActions } from 'redux-actions';

import {
  loadCommercialDealsSuccess
} from './actions';

const defaultState = {
  list:[]
};

export default handleActions(
  {
    [loadCommercialDealsSuccess]: (state, { payload })=>({
      ...state,
      list: payload.commercialDeals
    })
  },
  defaultState
);
