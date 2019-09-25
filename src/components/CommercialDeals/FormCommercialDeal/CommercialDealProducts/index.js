import { connect } from 'react-redux';
import View from './view';

import { updateProductsFilter} from '../../../../modules/commercialDeals/actions'

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
      families: state.commercialDeals.families,
      subFamilies: state.commercialDeals.subFamilies,
      products: state.commercialDeals.products,
      brands:state.commercialDeals.brands,
      subBrands:state.commercialDeals.subBrands,
      updateFilter:state.commercialDeals.updateFilter,
    }),
    { updateProductsFilter }
  )(View);