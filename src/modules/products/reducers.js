import { handleActions } from 'redux-actions';
import { map, filter } from 'underscore';
import { message } from 'antd';

import {
  fetchProductsSuccess
} from './actions';
import {checkLoginFailed} from "../auth/actions";
import {STATUS} from "../auth/constants";

const defaultState = {
    list: [],
    count: 0,
};

export default handleActions(
  {
    [fetchProductsSuccess]: (state, { payload }) => ({
            ...state,
            list: payload.products
    }),
  },
  defaultState
);
