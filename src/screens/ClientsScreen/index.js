import { connect } from 'react-redux';

import {
    loadClientsIndas,
    loadEntitiesIndas,
    loadWholesalersIndas,
    getClientsCount,
 } from '../../modules/clients-indas/actions';

import View from './view';

export default connect(
  state => ({
      entities: state.clientsIndas.entitiesIndas,
      entitiesCount: state.clientsIndas.entitiesCount,
  }),
  {
      loadEntitiesIndas,
  }
)(View);
