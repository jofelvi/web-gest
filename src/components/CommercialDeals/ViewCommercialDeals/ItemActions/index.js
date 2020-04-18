import { connect } from 'react-redux';
import View from './view';

import { 
    setCurrentCommercialDeal,
    showEditCommercialDeal,
    showNewProductCommercialDeal,
    showViewProductsCommercialDeal,
    setCommercialDealFormStep,
    setFormKey,
    loadUsers,
    setNewCommercialDeal,
    editCommercialDeal,
  } from '../../../../modules/commercialDeals/actions';

  export default connect(
    state => ({
    }),
    { setCurrentCommercialDeal,
      showEditCommercialDeal,
      showNewProductCommercialDeal,
      showViewProductsCommercialDeal,
      setCommercialDealFormStep,
      setFormKey,
      loadUsers,
      setNewCommercialDeal,
      editCommercialDeal
    }
  )(View);