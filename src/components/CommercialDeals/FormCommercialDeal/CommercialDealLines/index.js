import { connect } from 'react-redux';
import View from './view';
import { 
  editCommercialDeal,
  setAssetsCommercialDeal,
  setEscaladosCommercialDeal
} from '../../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      users: state.commercialDeals.users,
      idCommercialDeal: state.commercialDeals.idCommercialDeal,
      escalados: state.commercialDeals.currentCommercialDeal.escalados,
     
    }),
    { editCommercialDeal, setEscaladosCommercialDeal }
  )(View);