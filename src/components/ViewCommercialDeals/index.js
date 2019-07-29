import { connect } from 'react-redux';
import View from './view';

export default connect(
  state => ({
    list: state.commercialDeals.list
  }),
  {  }
)(View);