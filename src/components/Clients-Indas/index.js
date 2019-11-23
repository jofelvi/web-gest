import { connect } from 'react-redux';

import { 
    
 } from '../../modules/clients-indas/actions';

import View from './view';

export default connect(
  state => ({
    list: state.clientsIndas.list,
    entitiesIndas: state.clientsIndas.entitiesIndas,
    wholesalersIndas: state.clientsIndas.wholesalersIndas,
    token: state.auth.token
  }),
  { 
  }
)(View);