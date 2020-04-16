import { connect } from 'react-redux';
import View from './view';

import { 
  showNewCommercialDeal,
  setCurrentCommercialDeal,
  loadFamilies,
  loadSubFamilies,
  loadProducts,
  loadBrands,
  loadSubBrands,
  loadUsers,
  loadDealTypes,
  setCommercialDealFormStep,
  setFormKey,
} from '../../../modules/commercialDeals/actions';

export default connect(
  state => ({
    list: state.commercialDeals.list,
    listAgreements: state.commercialDeals.listAgreements,
    listOffers: state.commercialDeals.listOffers,
    listPlans: state.commercialDeals.listPlans,
    listCampaigns: state.commercialDeals.listCampaigns,
    newCommercialDealVisible:state.commercialDeals.newCommercialDealVisible,
    families: state.commercialDeals.families,
    subFamilies: state.commercialDeals.subFamilies,
    products: state.commercialDeals.products,
    brands:state.commercialDeals.brands,
    subBrands: state.commercialDeals.subBrands,
    users: state.commercialDeals.users,
    dealTypes: state.commercialDeals.dealTypes,
    token: state.auth.token
  }),
  { 
    showNewCommercialDeal,
    setCurrentCommercialDeal,
    loadFamilies,
    loadSubFamilies,
    loadProducts,
    loadBrands,
    loadSubBrands,
    loadUsers,
    loadDealTypes,
    setCommercialDealFormStep,
    setFormKey,
  }
)(View);