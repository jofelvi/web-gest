import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setToken, loginSuccess } from './modules/auth/actions';

import utils from './lib/utils';

import { Layout } from 'antd';

import { withRouter } from 'react-router-dom';

import Header from './components/Header';
import Sider from './components/Sider';
import Routes from './routes';

const { Content } = Layout;

const App = ({
  location: { pathname },
  history,
  completed,
  processKey,
  token,
  setToken,
}) => {
  useEffect(() => {
    if (!token) {
      setToken({ token: utils.getAuthToken() });
    }
    loginSuccess();
  }, [setToken, token]);
  const [prevCompleted, setPrevCompleted] = useState(false);

  if (!completed && prevCompleted) {
    setPrevCompleted(true);
    history.push(`/process/${processKey}/thankyou`);
  }

  return (
    <Layout>
      <Header className='header' />
      <Layout>
        {pathname !== '/login' && pathname !== '/signup' ? <Sider /> : null}
        <Layout>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

App.propTypes = {
  status: PropTypes.string.isRequired,
};

export default withRouter(
  connect(
    state => ({
      processKey: state.forms.processKey,
      completed: state.forms.completed,
      token: state.auth.token,
    }),
    { setToken }
  )(App)
);
