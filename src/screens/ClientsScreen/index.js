import { connect } from 'react-redux';

import {
    loadClientsIndas,
    loadEntitiesIndas,
    loadWholesalersIndas,
    getClientsCount,
    setListState,
 } from '../../modules/clients-indas/actions';
import { fetchDelegados } from "../../modules/planes-compra/actions";

import View from './view';

export default connect(
  state => ({
      entities: state.clientsIndas.entitiesIndas,
      entitiesCount: state.clientsIndas.entitiesCount,
      state: state.clientsIndas.listState,
  }),
  {
      loadEntitiesIndas,
      setListState,
      fetchDelegados,
  }
)(View);
