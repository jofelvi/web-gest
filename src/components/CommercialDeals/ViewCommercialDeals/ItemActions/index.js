import { connect } from 'react-redux';
import View from './view';

import { 
    setCurrentCommercialDeal,
    showEditCommercialDeal,
    showNewProductCommercialDeal,
    showViewProductsCommercialDeal
  } from '../../../../modules/commercialDeals/actions';

  export default connect(
    state => ({
    }),
    { setCurrentCommercialDeal,
      showEditCommercialDeal,
      showNewProductCommercialDeal,
      showViewProductsCommercialDeal }
  )(View);