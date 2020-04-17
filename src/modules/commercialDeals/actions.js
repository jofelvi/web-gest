import { createActions } from 'redux-actions';

import {
  LOAD_COMMERCIAL_DEALS,
  LOAD_COMMERCIAL_DEALS_SUCCESS,
  LOAD_COMMERCIAL_DEALS_FAILED,
  CREATE_COMMERCIAL_DEAL,
  EDIT_COMMERCIAL_DEAL,
  CREATE_COMMERCIAL_DEAL_FAILED,
  CREATE_COMMERCIAL_DEAL_SUCCESS,
  LOAD_FAMILIES,
  LOAD_FAMILIES_SUCCESS,
  LOAD_FAMILIES_FAILED,
  LOAD_SUB_FAMILIES,
  LOAD_SUB_FAMILIES_SUCCESS,
  LOAD_SUB_FAMILIES_FAILED,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILED,
  LOAD_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_FAILED,
  LOAD_SUB_BRANDS,
  LOAD_SUB_BRANDS_SUCCESS,
  LOAD_SUB_BRANDS_FAILED,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILED,
  LOAD_DEAL_TYPES,
  LOAD_DEAL_TYPES_SUCCESS,
  LOAD_DEAL_TYPES_FAILED,
  SHOW_NEW_COMMERCIAL_DEAL,
  SHOW_EDIT_COMMERCIAL_DEAL,
  SHOW_VIEW_PRODUCTS_COMMERCIAL_DEAL,
  SHOW_NEW_PRODUCT_COMMERCIAL_DEAL,
  SET_CURRENT_COMMERCIAL_DEAL,
  UPDATE_PRODUCTS_FILTER,
  UPDATE_CLIENTS_FILTER,
  SET_COMMERCIAL_DEAL_TYPE,
  GET_COMMERCIAL_DEAL_ID,
  SET_PRODUCTS_COMMERCIAL_DEAL,
  SET_ESCALADOS_COMMERCIAL_DEAL,
  SET_USERS_COMMERCIAL_DEAL,
  EDIT_COMMERCIAL_DEAL_SUCCESS,
  SET_COMMERCIAL_DEAL_FORM_STEP,
  SET_FORM_KEY,
  SET_NEW_COMMERCIAL_DEAL
} from './actionTypes';

export const {
  loadCommercialDeals,
  loadCommercialDealsSuccess,
  loadCommercialDealsFailed,
  createCommercialDeal,
  createCommercialDealSuccess,
  createCommercialDealFailed,
  loadFamilies,
  loadFamiliesSuccess,
  loadFamiliesFailed,
  loadSubFamilies,
  loadSubFamiliesSuccess,
  loadSubFamiliesFailed,
  loadProducts,
  loadProductsSuccess,
  loadProductsFailed,
  loadBrands,
  loadBrandsSuccess,
  loadBrandsFailed,
  loadSubBrands,
  loadSubBrandsSuccess,
  loadSubBrandsFailed,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
  loadDealTypes,
  loadDealTypesSuccess,
  loadDealTypesFailed,
  showNewCommercialDeal,
  showEditCommercialDeal,
  showViewProductsCommercialDeal,
  showNewProductCommercialDeal,
  setCurrentCommercialDeal,
  updateProductsFilter,
  updateClientsFilter,
  setCommercialDealType,
  editCommercialDeal,
  getCommercialDealId,
  setProductsCommercialDeal,
  setEscaladosCommercialDeal,
  setUsersCommercialDeal,
  editCommercialDealSuccess,
  setCommercialDealFormStep,
  setFormKey,
  setNewCommercialDeal
} = createActions(
  LOAD_COMMERCIAL_DEALS,
  LOAD_COMMERCIAL_DEALS_SUCCESS,
  LOAD_COMMERCIAL_DEALS_FAILED,
  CREATE_COMMERCIAL_DEAL,
  CREATE_COMMERCIAL_DEAL_SUCCESS,
  CREATE_COMMERCIAL_DEAL_FAILED,
  LOAD_FAMILIES,
  LOAD_FAMILIES_SUCCESS,
  LOAD_FAMILIES_FAILED,
  LOAD_SUB_FAMILIES,
  LOAD_SUB_FAMILIES_SUCCESS,
  LOAD_SUB_FAMILIES_FAILED,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILED,
  LOAD_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_FAILED,
  LOAD_SUB_BRANDS,
  LOAD_SUB_BRANDS_SUCCESS,
  LOAD_SUB_BRANDS_FAILED,
  LOAD_USERS,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILED,
  LOAD_DEAL_TYPES,
  LOAD_DEAL_TYPES_SUCCESS,
  LOAD_DEAL_TYPES_FAILED,
  SHOW_NEW_COMMERCIAL_DEAL,
  SHOW_EDIT_COMMERCIAL_DEAL,
  SHOW_VIEW_PRODUCTS_COMMERCIAL_DEAL,
  SHOW_NEW_PRODUCT_COMMERCIAL_DEAL,
  SET_CURRENT_COMMERCIAL_DEAL,
  UPDATE_PRODUCTS_FILTER,
  UPDATE_CLIENTS_FILTER,
  SET_COMMERCIAL_DEAL_TYPE,
  EDIT_COMMERCIAL_DEAL,
  GET_COMMERCIAL_DEAL_ID,
  SET_PRODUCTS_COMMERCIAL_DEAL,
  SET_ESCALADOS_COMMERCIAL_DEAL,
  SET_USERS_COMMERCIAL_DEAL,
  EDIT_COMMERCIAL_DEAL_SUCCESS,
  SET_COMMERCIAL_DEAL_FORM_STEP,
  SET_FORM_KEY,
  SET_NEW_COMMERCIAL_DEAL

);
