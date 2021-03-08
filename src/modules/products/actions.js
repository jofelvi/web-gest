import { createActions } from 'redux-actions';

import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILED,
} from './actionTypes';

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductsFailed,
} = createActions(
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
);
