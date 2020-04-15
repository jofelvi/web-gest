import { connect } from 'react-redux';
import View from './view';
import { 
  createCommercialDeal,
  showEditCommercialDeal,
  showNewCommercialDeal,
  setCommercialDealType,
  editCommercialDeal,
 

} from '../../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      users: state.commercialDeals.users,
      commercialDealType: state.commercialDeals.commercialDealType

    }),
    {createCommercialDeal, setCommercialDealType, editCommercialDeal }
  )(View);