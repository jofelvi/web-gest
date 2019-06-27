import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loadable from 'react-loadable';

import { setToken, loginSuccess } from './modules/auth/actions';

import utils from './lib/utils';

import { Layout } from 'antd';

import { Switch, Route, withRouter } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Sider from './components/Sider';

import HomeScreen from './screens/HomeScreen';
import UsersListScreen from './screens/UsersListScreen';
import LoginScreen from './screens/LoginScreen';
import TasksListScreen from './screens/TasksListScreen';
import SignupScreen from './screens/SignupScreen';
import CompletedForm from './screens/Forms/completedForm/view';

const { Content } = Layout;

const App = ({
  location: { pathname },
  process,
  taskName,
  history,
  completed,
  processKey,
  token,
  setToken
}) => {
  useEffect(() => {
    if (!token) {
      setToken({ token: utils.getAuthToken() });
    }
    loginSuccess();
  }, [setToken, token]);
  const [prevCompleted, setPrevCompleted] = useState(false);
  const { capitalizeWord } = utils;

  if (!completed && prevCompleted) {
    setPrevCompleted(true);
    history.push(`/process/${processKey}/thankyou`);
  }

  const DynamicProcess = Loadable({
    loader: process
      ? () => import(`./screens/Forms/${process}`)
      : () =>
          import(`./screens/${capitalizeWord(pathname.split('/')[2])}Screen`),
    loading() {
      return <div>Loading...</div>;
    }
  });

  const DynamicProcessForm = Loadable({
    loader:
      process && taskName
        ? () => import(`./screens/Forms/${process}/${taskName}`)
        : () => import(`./screens/Forms/${process}`),
    loading() {
      return <div>Loading...</div>;
    }
  });

  const DynamicTaskForm = Loadable({
    loader: taskName
      ? () => import(`./screens/Forms/${process}/${taskName}`)
      : () => import(`./screens/Forms/${process}`),
    loading() {
      return <div>Loading...</div>;
    }
  });

  return (
    <Layout>
      <Header className="header" />
      <Layout>
        {pathname !== '/login' && pathname !== '/signup' ? <Sider /> : null}
        <Layout>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Switch>
              <PrivateRoute path="/" exact component={HomeScreen} />
              <PrivateRoute path="/users" exact component={UsersListScreen} />
              <PrivateRoute path="/tasks" exact component={TasksListScreen} />
              <PrivateRoute
                path="/tasks/user"
                exact
                component={TasksListScreen}
              />
              <PrivateRoute
                path="/tasks/group"
                exact
                component={TasksListScreen}
              />
              <PrivateRoute
                path={`/task/:taskId/form`}
                exact
                component={DynamicTaskForm}
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
                path={`/task/completed`}
                exact
                component={CompletedForm}
              />
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/signup" exact component={SignupScreen} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

App.propTypes = {
  status: PropTypes.string.isRequired
};

export default withRouter(
  connect(
    state => ({
      process: state.forms.process,
      taskName: state.forms.taskName,
      processKey: state.forms.processKey,
      completed: state.forms.completed,
      token: state.auth.token
    }),
    { setToken }
  )(App)
);
