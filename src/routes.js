import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import PrivateRoute from './components/PrivateRoute';

import utils from './lib/utils';

import HomeScreen from './screens/HomeScreen';
import UsersListScreen from './screens/UsersListScreen';
import LoginScreen from './screens/LoginScreen';
import TaskListScreen from './screens/TaskListScreen';
import SignupScreen from './screens/SignupScreen';
import CompletedForm from './screens/Forms/completedForm';
import TaskFormScreen from './screens/TaskFormScreen';
import CommercialDealsScreen from './screens/CommercialDealsScreen';
import ClientsIndasScreen from './screens/ClientsScreen';
import ValidarRegistro from './screens/Forms/registrar_cliente/validarRegistro'
import ValidarPedido from './screens/Forms/tramitar_pedido/validarPedido'
import OrderListScreen from './screens/OrderListScreen'

const { capitalizeWord } = utils;

const Routes = ({ location: { pathname }, process, taskName }) => {
  const DynamicProcess = Loadable({
    loader: process
      ? () => import(`./screens/Forms/${process}`)
      : () =>
          import(`./screens/${capitalizeWord(pathname.split('/')[2])}Screen`),
    loading() {
      return <div>Loading...</div>;
    },
  });

  const DynamicProcessForm = Loadable({
    loader:
      process && taskName
        ? () => import(`./screens/Forms/${process}/${taskName}`)
        : () => import(`./screens/Forms/${process}`),
    loading() {
      return <div>Loading...</div>;
    },
  });

  return (
    <Switch>
      <PrivateRoute path='/' exact component={HomeScreen} />
      <PrivateRoute path='/users' exact component={UsersListScreen} />
      <PrivateRoute path='/tasks' exact component={TaskListScreen} />
      <PrivateRoute path='/tasks/user' exact component={TaskListScreen} />
      <PrivateRoute path='/tasks/group' exact component={TaskListScreen} />
      <PrivateRoute
        path={`/task/:taskId/process/:procId`}
        exact
        component={TaskFormScreen}
      />
      <PrivateRoute
        path={`/process/:process`}
        exact
        component={DynamicProcess}
      />
      <PrivateRoute
        path={`/process/:process/:task`}
        exact
        component={DynamicProcessForm}
      />
      <PrivateRoute
        path={`/process/:process/complete`}
        exact
        component={CompletedForm}
      />
      <PrivateRoute path={`/task/completed`} exact component={CompletedForm} />
      <Route path='/login' exact component={LoginScreen} />
      <Route path='/process/signup' exact component={SignupScreen} />
      <PrivateRoute path="/commercial-deals" exact component={CommercialDealsScreen}/> 
      <PrivateRoute path="/clients/tr" exact component={ClientsIndasScreen}/> 
      <PrivateRoute path="/pruebaform" exact component={ValidarRegistro}/>
      <PrivateRoute path="/pruebaform2" exact component={ValidarPedido}/>
      <PrivateRoute path="/orders" exact component={OrderListScreen}/>
    </Switch>
  );
};

export default withRouter(
  connect(
    state => ({
      process: state.forms.process,
      taskName: state.forms.taskName,
    }),
    {}
  )(Routes)
);
