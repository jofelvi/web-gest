import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import loadable from '@loadable/component';
import utils from './lib/utils';

import { Layout } from 'antd';

import { Switch, Route, withRouter } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Sider from './components/Sider';

import HomeScreen from './screens/HomeScreen';
import UsersListScreen from './screens/UsersListScreen';
import LoginScreen from './screens/LoginScreen';

const { Content } = Layout;

const App = ({
  location: { pathname },
  process,
  taskName,
  history,
  completed,
  processKey
}) => {
  const [prevCompleted, setPrevCompleted] = useState(false);

  if (!completed && prevCompleted) {
    setPrevCompleted(true);
    history.push(`/process/${processKey}/thankyou`);
  }

  const DynamicProcess = loadable(() =>
    process
      ? import(`./screens/Forms/${process}`)
      : import(
          `./screens/${utils.capitalizeWord(pathname.split('/')[2])}Screen`
        )
  );

  const DynamicTaskForm = loadable(() =>
    taskName
      ? import(`./screens/Forms/${process}/components/${taskName}`)
      : import(`./screens/Forms/${process}`)
  );

  return (
    <Layout>
      <Header className="header" />
      <Layout>
        {pathname !== '/login' ? <Sider /> : null}
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
              <PrivateRoute
                path={`/process/${process}/:taskName`}
                exact
                component={DynamicTaskForm}
              />
              <PrivateRoute
                path={`/process/${process}`}
                exact
                component={DynamicProcess}
              />
              <Route path="/login" exact component={LoginScreen} />
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
  connect(state => ({
    process: state.forms.process,
    taskName: state.forms.taskName,
    processKey: state.forms.processKey,
    completed: state.forms.completed
  }))(App)
);
