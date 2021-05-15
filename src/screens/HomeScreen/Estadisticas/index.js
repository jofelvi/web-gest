import { connect } from 'react-redux';

import View from './view';
import { fetchStatsSetLoading, fetchStatsPedidos, fetchStatsPedidosPorGrupo, fetchStatsClientes } from '../../../modules/charts/actions';
export default connect(
    state => ({
        statsPedidos: state.charts.statsPedidos,
        statsPedidosLoading: state.charts.statsPedidosLoading,
        statsPedidosPorGrupo: state.charts.statsPedidosPorGrupo,
        statsPedidosPorGrupoLoading: state.charts.statsPedidosPorGrupoLoading,
        statsClientes: state.charts.statsClientes,
        statsClientesLoading: state.charts.statsClientesLoading,
    }),
    { fetchStatsSetLoading, fetchStatsPedidos, fetchStatsPedidosPorGrupo, fetchStatsClientes  }
)(View);
