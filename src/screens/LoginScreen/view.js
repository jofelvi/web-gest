import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { STATUS } from '../../modules/auth/constants';

import { Row, Col } from 'antd';
import LoginForm from '../../components/LoginForm';

const LoginScreen = ({ status }) =>
  status !== STATUS.LOGGED ? (
    <Row type="flex" justify="center" align="middle">
      <Col span={12}>
        <LoginForm />
      </Col>
    </Row>
  ) : (
    <Redirect to="/" />
  );

LoginScreen.propTypes = {
  status: PropTypes.string.isRequired
};

export default LoginScreen;
