import { handleActions } from 'redux-actions';

import {
  loadCommercialDealsSuccess,
  loadFamiliesSuccess,
  loadSubFamiliesSuccess,
  loadProductsSuccess,
  loadBrandsSuccess,
  loadSubBrandsSuccess,
  loadUsersSuccess,
  createCommercialDealSuccess,
  showNewCommercialDeal,
  showEditCommercialDeal,
  showViewProductsCommercialDeal,
  showNewProductCommercialDeal,
  setCurrentCommercialDeal,
  updateProductsFilter,
  loadDealTypesSuccess,
  updateClientsFilter,
  setCommercialDealType,
  getCommercialDealId,
  setProductsCommercialDeal,
  setEscaladosCommercialDeal,
  setUsersCommercialDeal,
} from './actions';

const defaultState = {
  list:[],
  families:[],
  subFamilies: [],
  products:[],
  brands:[],
  subBrands:[],
  users:[],
  dealTypes:[],
  viewProductsCommercialDealVisible: false,
  newProductsCommercialDealVisible: false,
  editCommercialDealVisible: false,
  newCommercialDealVisible:false,
  currentCommercialDeal: {},
  updateFilter: false,
  updateFilterOfClient: false,
  productos: [],
  escalados: [],
  clientes: []
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
    [loadBrandsSuccess]: (state, { payload })=>({
      ...state,
      brands: payload.brands
    }),
    [loadSubBrandsSuccess]: (state, { payload })=>({
      ...state,
      subBrands: payload.subBrands
    }),
    [loadUsersSuccess]: (state, { payload })=>({
      ...state,
      users: payload.users
    }),
    [loadDealTypesSuccess]:(state, { payload })=>({
      ...state,
      dealTypes: payload.dealTypes
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
    [updateClientsFilter]:  (state, { payload}) => ({
      ...state,
      updateFilterOfClient: payload
    }),
    [setCommercialDealType]:  (state, { payload}) => ({
      ...state,
      commercialDealType: payload
    }),
    [getCommercialDealId]:  (state, { payload}) => ({
      ...state,
      idCommercialDeal: payload
    }),
    [setProductsCommercialDeal]: (state, { payload}) => ({
      ...state,
      productos: payload.productos,
    }),
    [setEscaladosCommercialDeal]: (state, { payload}) => ({
      ...state,
      escalados: payload.escalados,
    }),
    
    [setUsersCommercialDeal]: (state, { payload}) =>{ 
      console.log({state})
      console.log({payload})
      return ({
        ...state,
        clientes: payload.clientes,
      })
    }
    
  },
  defaultState
);
