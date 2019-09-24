import { connect } from 'react-redux';
import View from './view';

import { updateProductsFilter} from '../../../../modules/commercialDeals/actions'

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      families: state.commercialDeals.families,
      subFamilies: state.commercialDeals.subFamilies,
      products: state.commercialDeals.products,
      updateFilter:state.commercialDeals.updateFilter,
    }),
    { updateProductsFilter }
  )(View);