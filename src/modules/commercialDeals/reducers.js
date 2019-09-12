import { handleActions } from 'redux-actions';

import {
  loadCommercialDealsSuccess,
  loadOffersSuccess,
  loadAgreementsSuccess,
  loadPlansSuccess,
  loadCampaignsSuccess,
  showNewCommercialDeal,
  showEditCommercialDeal,
  showViewProductsCommercialDeal,
  showNewProductCommercialDeal,
  setCurrentCommercialDeal
} from './actions';

const defaultState = {
  list:[],
  listAgreements:[],
  listOffers:[],
  listPlans:[],
  listCampaigns:[],
  viewProductsCommercialDealVisible: false,
  newProductsCommercialDealVisible: false,
  editCommercialDealVisible: false,
  newCommercialDealVisible:false,
  currentCommercialDeal: {}
};

export default handleActions(
  {
    [loadCommercialDealsSuccess]: (state, { payload })=>({
      ...state,
      list: payload.commercialDeals
    }),
    [loadOffersSuccess]: (state,{ payload }) => ({
      ...state,
      list: payload.commercialDeals,
      listOffers: payload.offers
    }),
    [loadAgreementsSuccess]: (state,{ payload }) => ({
      ...state,
      list: payload.commercialDeals,
      listAgreements: payload.agreements
    }),
    [loadPlansSuccess]: (state,{ payload }) => ({
      ...state,
      list: payload.commercialDeals,
      listPlans: payload.plans
    }),
    [loadCampaignsSuccess]: (state,{ payload }) => ({
      ...state,
      list: payload.commercialDeals,
      listCampaigns: payload.campaigns
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
    })
  },
  defaultState
);
