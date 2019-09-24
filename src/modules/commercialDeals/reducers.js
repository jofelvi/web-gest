import { handleActions } from 'redux-actions';

import {
  loadCommercialDealsSuccess,
  loadFamiliesSuccess,
  loadSubFamiliesSuccess,
  loadProductsSuccess,
  loadUsersSuccess,
  createCommercialDealSuccess,
  showNewCommercialDeal,
  showEditCommercialDeal,
  showViewProductsCommercialDeal,
  showNewProductCommercialDeal,
  setCurrentCommercialDeal,
  updateProductsFilter
} from './actions';

const defaultState = {
  list:[],
  families:[],
  subFamilies: [],
  products:[],
  users:[],
  viewProductsCommercialDealVisible: false,
  newProductsCommercialDealVisible: false,
  editCommercialDealVisible: false,
  newCommercialDealVisible:false,
  currentCommercialDeal: {},
  updateFilter: false
};

export default handleActions(
  {
    [loadCommercialDealsSuccess]: (state, { payload })=>({
      ...state,
      list: payload.commercialDeals
    }),
    [loadFamiliesSuccess]: (state, { payload })=>({
      ...state,
      families: payload.families
    }),
    [loadSubFamiliesSuccess]: (state, { payload })=>({
      ...state,
      subFamilies: payload.subFamilies
    }),
    [loadProductsSuccess]: (state, { payload })=>({
      ...state,
      products: payload.products
    }),
    [loadUsersSuccess]: (state, { payload })=>({
      ...state,
      users: payload.users
    }),
    [showNewCommercialDeal]: (state, { payload}) => ({
      ...state,
      newCommercialDealVisible: payload
    }),
    [showEditCommercialDeal]: (state, { payload}) => ({
      ...state,
      editCommercialDealVisible: payload
    }),
    [showViewProductsCommercialDeal]: (state, { payload}) => ({
      ...state,
      viewProductsCommercialDealVisible: payload
    }),
    [showNewProductCommercialDeal]: (state, { payload}) => ({
      ...state,
      newProductsCommercialDealVisible: payload
    }),
    [setCurrentCommercialDeal]: (state, {payload}) => ({
      ...state,
      currentCommercialDeal: payload
    }),
    [createCommercialDealSuccess]: (state, { payload}) => ({
      ...state,
      deal: payload.deal
    }),
    [updateProductsFilter]:  (state, { payload}) => ({
      ...state,
      updateFilter: payload
    }),
  },
  defaultState
);
