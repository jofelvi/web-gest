import { connect } from 'react-redux';
import View from './view';
import { 
  createCommercialDeal,
  showEditCommercialDeal,
  showNewCommercialDeal,
  setCommercialDealFormStep
} from '../../../../modules/commercialDeals/actions';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      currentStep: state.commercialDeals.currentStep,
      dealTypes: state.commercialDeals.dealTypes,
      commercialDealType: state.commercialDeals.commercialDealType
    }),
    { 
      createCommercialDeal,
      showEditCommercialDeal,
      showNewCommercialDeal,
      setCommercialDealFormStep
    }
  )(View);