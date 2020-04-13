import { connect } from 'react-redux';
import View from './view';
import { 
  editCommercialDeal,
  
} from '../../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      users: state.commercialDeals.users
    }),
    { editCommercialDeal }
  )(View);