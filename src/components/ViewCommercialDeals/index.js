import { connect } from 'react-redux';
import View from './view';

import { 
  loadOffers,
  loadAgreements,
  loadPlans,
  loadCampaigns
} from '../../modules/commercialDeals/actions';

export default connect(
  state => ({
    list: state.commercialDeals.list,
    listAgreements: state.commercialDeals.listAgreements,
    listOffers: state.commercialDeals.listOffers,
    listPlans: state.commercialDeals.listPlans,
    listCampaigns: state.commercialDeals.listCampaigns
  }),
  { loadOffers,
    loadAgreements,
    loadPlans,
    loadCampaigns  }
)(View);