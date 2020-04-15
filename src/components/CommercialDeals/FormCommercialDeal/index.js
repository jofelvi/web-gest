import { connect } from 'react-redux';
import View from './view';

import { 
    showEditCommercialDeal,
    showNewCommercialDeal,
    setProductsCommercialDeal
  } from '../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      editCommercialDealVisible: state.commercialDeals.editCommercialDealVisible,
      newCommercialDealVisible: state.commercialDeals.newCommercialDealVisible
    }),
    { showEditCommercialDeal, showNewCommercialDeal, setProductsCommercialDeal }
  )(View);