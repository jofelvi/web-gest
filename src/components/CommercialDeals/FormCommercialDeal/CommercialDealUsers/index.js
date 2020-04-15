import { connect } from 'react-redux';
import View from './view';

import { 
  updateClientsFilter, 
  editCommercialDeal,
  setUsersCommercialDeal,
} from '../../../../modules/commercialDeals/actions'


export default connect(
    state =>
      ({

        currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
        users: state.commercialDeals.users,
        updateFilterOfClient: state.commercialDeals.updateFilterOfClient,
        idCommercialDeal: state.commercialDeals.idCommercialDeal,
        productos: state.commercialDeals.productos,
        escalados: state.commercialDeals.escalados,
        clientes: state.commercialDeals.clientes,
  
      }),
    
    {updateClientsFilter, editCommercialDeal, setUsersCommercialDeal }
  )(View);