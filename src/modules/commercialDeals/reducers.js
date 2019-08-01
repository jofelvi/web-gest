import { handleActions } from 'redux-actions';

import {
  loadCommercialDealsSuccess,
  loadOffersSuccess,
  loadAgreementsSuccess,
  loadPlansSuccess,
  loadCampaignsSuccess
} from './actions';

const defaultState = {
  list:[],
  listAgreements:[],
  listOffers:[],
  listPlans:[],
  listCampaigns:[]
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
    })
  },
  defaultState
);
