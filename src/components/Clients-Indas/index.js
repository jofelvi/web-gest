import { connect } from 'react-redux';

import { 
  editClientIndas,
  setCurrentClientEmail,
  loadClientsIndas,
  searchClientBy,
  getClientsCount,
  setFormKey,
  setFilterValues,
  loadEntitiesIndas,
 } from '../../modules/clients-indas/actions';

import View from './view';
import { startProcess } from '../../modules/forms/actions';

export default connect(
  state => ({
    list: state.clientsIndas.list,
    entitiesIndas: state.clientsIndas.entitiesIndas,
    wholesalersIndas: state.clientsIndas.wholesalersIndas,
    token: state.auth.token,
    currentEmail: state.clientsIndas.currentEmail,
    usersMeta: state.clientsIndas.usersMeta,
    filterValues: state.clientsIndas.filterValues,
    formKey: state.clientsIndas.formKey,
    isEdited: state.clientsIndas.isEdited
  }),
  {
    editClientIndas,
    setCurrentClientEmail,
    loadClientsIndas,
    searchClientBy,
    getClientsCount,
    setFormKey,
    setFilterValues,
    loadEntitiesIndas
  }
)(View);