import { connect } from 'react-redux';

import { 
  editClientIndas,
  setCurrentClientEmail,
  loadClientsIndas,
  searchClientBy,
  getUsersCount,
 } from '../../modules/clients-indas/actions';

import View from './view';

export default connect(
  state => ({
    list: state.clientsIndas.list,
    entitiesIndas: state.clientsIndas.entitiesIndas,
    wholesalersIndas: state.clientsIndas.wholesalersIndas,
    token: state.auth.token,
    currentEmail: state.clientsIndas.currentEmail,
    usersMeta: state.clientsIndas.usersMeta,

  }),
  {
    editClientIndas,
    setCurrentClientEmail,
    loadClientsIndas,
    searchClientBy,
    getUsersCount,
  }
)(View);