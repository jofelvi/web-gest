import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { checkLogin } from './modules/auth/actions';

import { Layout } from 'antd';

import { Switch, Route, withRouter } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Sider from './components/Sider';

import HomeScreen from './screens/HomeScreen';
import UsersListScreen from './screens/UsersListScreen';
import LoginScreen from './screens/LoginScreen';

const { Content } = Layout;

const App = ({ location: { pathname } }) => (
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
            <Route path="/login" exact component={LoginScreen} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

App.propTypes = {
  status: PropTypes.string.isRequired
};

export default withRouter(connect(() => ({}))(App));
