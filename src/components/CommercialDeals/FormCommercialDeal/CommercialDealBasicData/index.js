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
      commercialDealType: state.commercialDeals.commercialDealType,
      productos: state.commercialDeals.currentCommercialDeal.productos,
      escalados: state.commercialDeals.currentCommercialDeal.escalados,
      clientes: state.commercialDeals.currentCommercialDeal.clientes,
      formKey: state.commercialDeals.formKey,
      isNewCommercialDeal: state.commercialDeals.isNewCommercialDeal,

    }),
    {createCommercialDeal, setCommercialDealType, editCommercialDeal }
  )(View);