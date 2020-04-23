import { connect } from 'react-redux';
import View from './view';

import { 
  updateClientsFilter, 
  editCommercialDeal,
  setUsersCommercialDeal,
  loadUsers,
  getUsersCount,
  setAsociatedClients
} from '../../../../modules/commercialDeals/actions'


export default connect(
    state =>
      ({
        currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
        users: state.commercialDeals.users,
        usersMeta: state.commercialDeals.usersMeta,
        updateFilterOfClient: state.commercialDeals.updateFilterOfClient,
        idCommercialDeal: state.commercialDeals.idCommercialDeal,
        productos: state.commercialDeals.currentCommercialDeal.productos,
        escalados: state.commercialDeals.currentCommercialDeal.escalados,
        clientes: state.commercialDeals.currentCommercialDeal.clientes,
        emailComo: state.commercialDeals.emailComo,
        isAsociatedClient: state.commercialDeals.isAsociatedClient,
        isNew: state.commercialDeals.isNew

      }),
    
    {
      updateClientsFilter, 
      editCommercialDeal, 
      setUsersCommercialDeal, 
      loadUsers, 
      getUsersCount,
      setAsociatedClients, 
    }
  )(View);