import { connect } from 'react-redux';
import View from './view';
import { 
  createCommercialDeal,
  showEditCommercialDeal,
  showNewCommercialDeal
} from '../../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      dealTypes: state.commercialDeals.dealTypes
    }),
    { 
      createCommercialDeal,
      showEditCommercialDeal,
      showNewCommercialDeal
    }
  )(View);