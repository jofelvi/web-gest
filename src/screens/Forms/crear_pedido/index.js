import { connect } from 'react-redux';

//import {  } from '../../modules/orders/actions';
import { loadProducts } from '../../../modules/commercialDeals/actions';

import View from './view';
import commercialDeals from "../../../modules/commercialDeals/reducers";

export default connect(
    state => ({
        products: state.commercialDeals.products,
    }),
    { loadProducts }
)(View);
