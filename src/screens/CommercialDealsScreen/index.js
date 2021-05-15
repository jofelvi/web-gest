import { connect } from 'react-redux';

import { loadCommercialDeals } from '../../modules/commercialDeals/actions';

import View from './view';

export default connect(
  state => ({
    list: state.commercialDeals.list,
    token: state.auth.token
  }),
  { loadCommercialDeals }
)(View);