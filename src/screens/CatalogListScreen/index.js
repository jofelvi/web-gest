import { connect } from 'react-redux';

import {
    fetchProducts,
} from '../../modules/products/actions';

import View from './view';

export default connect(
  state => ({ 
    products: state.products.list,
  }),
  {fetchProducts}
)(View);