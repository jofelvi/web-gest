import { combineReducers } from 'redux';

import auth from './auth/reducers';
import users from './users/reducers';
import orders from './orders/reducers';
import products from './products/reducers';
import charts from './charts/reducers';
import tasks from './tasks/reducers';
import forms from './forms/reducers';
import commercialDeals from './commercialDeals/reducers';
import menu from './menu/reducers'
import clientsIndas from './clients-indas/reducers';
import clientesCbim from './clientes-cbim/reducers';

export default combineReducers({
  auth,
  users,
  tasks,
  forms,
  commercialDeals,
  menu,
  clientsIndas,
  orders,
  products,
  charts,
	clientesCbim
});
