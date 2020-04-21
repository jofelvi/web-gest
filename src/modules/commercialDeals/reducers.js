import { handleActions } from 'redux-actions';

import { NUM_CLIENTES_PAG } from './constants';

import {
  loadCommercialDealsSuccess,
  loadFamiliesSuccess,
  loadSubFamiliesSuccess,
  loadProductsSuccess,
  loadBrandsSuccess,
  loadSubBrandsSuccess,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
  getUsersCountSuccess,
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
  editCommercialDealSuccess,
  setCommercialDealFormStep,
  setFormKey,
  setNewCommercialDeal,
  setEmailSearched
} from './actions';
const generateKey = ()=>`${Math.random()}`;

const defaultState = {
  list:[],
  families:[],
  subFamilies: [],
  products:[],
  brands:[],
  subBrands:[],
  users:[],
  usersMeta: {
    page: 1,
    pageSize: NUM_CLIENTES_PAG,
    total: 0,
    emailComo: '',
    searchLoading: false,
  },
  dealTypes:[],
  viewProductsCommercialDealVisible: false,
  newProductsCommercialDealVisible: false,
  editCommercialDealVisible: false,
  newCommercialDealVisible:false,
  currentCommercialDeal: {},
  updateFilter: false,
  updateFilterOfClient: false,
  currentStep: 0,
  formKey: generateKey(),
  isNewCommercialDeal: false
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
    [loadUsers]: (state)=>({
      ...state,
      usersMeta: {
        ...state.usersMeta,
        searchLoading: true,
      }
    }),
    [loadUsersFailed]: (state)=>({
      ...state,
      usersMeta: {
        ...state.usersMeta,
        searchLoading: false,
      }
    }),
    [loadUsersSuccess]: (state, { payload })=>({
      ...state,
      users: payload.users,
      usersMeta: {
        ...state.usersMeta,
        ...payload.userMeta,
        searchLoading: false,
      }
    }),
    [getUsersCountSuccess]: (state, { payload })=>({
      ...state,
      usersMeta: {
        ...state.usersMeta,
        total: payload.count,
      }
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
      deal: payload.deal,
      list: [payload.deal, ...state.list]
    }),
    [editCommercialDealSuccess]: (state, { payload}) => ({
      ...state,
      deal: payload.deal,
      list: state.list.map( deal => {
        if(deal.idcondcomercial === payload.deal.idcondcomercial){
          return payload.deal;
        }
        return deal;
      })
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
      idCommercialDeal: payload.idCommercialDeal
    }),
    [setProductsCommercialDeal]: (state, { payload}) => ({
      ...state,
      currentCommercialDeal: { 
        ...state.currentCommercialDeal,
        productos: payload.productos
      }
     
    }),
    [setEscaladosCommercialDeal]: (state, { payload}) => ({
      ...state,
      currentCommercialDeal: { 
        ...state.currentCommercialDeal,
        escalados: payload.escalados
      }
     
    }),
    
    [setUsersCommercialDeal]: (state, { payload}) =>({
      ...state,
      currentCommercialDeal: { 
        ...state.currentCommercialDeal,
        clientes: payload.clientes
      }
     
    }),
    [setCommercialDealFormStep]:  (state, { payload}) => ({
      ...state,
      currentStep: payload.currentStep
    }),
    [setFormKey]:  (state) => ({
      ...state,
      formKey: generateKey() 
    }),
    [setNewCommercialDeal]:  (state, { payload}) => ({
      ...state,
      isNewCommercialDeal: payload
    }),
    [setEmailSearched]:  (state, { payload}) => ({
      ...state,
      emailComo: payload.emailComo
    }),
    
  },
  defaultState
);
