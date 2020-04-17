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
      productos: state.commercialDeals.currentCommercialDeal.productos,
      escalados: state.commercialDeals.currentCommercialDeal.escalados,
      clientes: state.commercialDeals.currentCommercialDeal.clientes,
      isNewCommercialDeal: state.commercialDeals.isNewCommercialDeal,
      formKey: state.commercialDeals.formKey,


    }),
    { editCommercialDeal, setEscaladosCommercialDeal }
  )(View);