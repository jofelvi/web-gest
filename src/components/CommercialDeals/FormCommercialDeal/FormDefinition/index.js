import { connect } from 'react-redux';
import View from './view';

export default connect(
    state => ({
      currentCommercialDeal:state.commercialDeals.currentCommercialDeal,
    }),
    {  }
  )(View);