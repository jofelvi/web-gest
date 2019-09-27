import { connect } from 'react-redux';
import View from './view';

import { updateClientsFilter} from '../../../../modules/commercialDeals/actions'


export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      users: state.commercialDeals.users,
      updateFilterOfClient: state.commercialDeals.updateFilterOfClient

    }),
    {updateClientsFilter }
  )(View);