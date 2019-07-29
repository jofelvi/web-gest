import { createActions } from 'redux-actions';

import {
  LOAD_COMMERCIAL_DEALS,
  LOAD_COMMERCIAL_DEALS_SUCCESS,
  LOAD_COMMERCIAL_DEALS_FAILED
} from './actionTypes';

export const {
  loadCommercialDeals,
  loadCommercialDealsSuccess,
  loadCommercialDealsFailed
} = createActions(
  LOAD_COMMERCIAL_DEALS,
  LOAD_COMMERCIAL_DEALS_SUCCESS,
  LOAD_COMMERCIAL_DEALS_FAILED,
);
