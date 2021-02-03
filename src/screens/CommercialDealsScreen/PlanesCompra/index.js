import { connect } from 'react-redux';

import View from './view';
import planesCompra from "../../../modules/planes-compra/reducers";
import { fetchPlans, fetchDelegados } from "../../../modules/planes-compra/actions";


export default connect(
    state => ({
        plans: state.planesCompra.list,
        loadingList: state.planesCompra.loadingList,
        loadingPagination: state.planesCompra.loadingPagination,
        count: state.planesCompra.count,
        delegados: state.planesCompra.delegados
    }),
    { fetchPlans, fetchDelegados }
)(View);
