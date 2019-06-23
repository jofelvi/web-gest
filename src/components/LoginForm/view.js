import React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import { ButtonContainer, SignupContainer } from './styles';

const { Item } = Form;

const validationSchema = Yup.object().shape({
  user: Yup.string().required(),
  password: Yup.string().required()
});

const LoginForm = ({ login }) => (
  <>
    <Formik
      initialValues={{
        user: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        login({ values: { user: values.user, password: values.password } });
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <>
          <Item>
            <Input
              id="user"
              value={values.user}
              prefix={<Icon type="user" />}
              placeholder="User"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Item>
          <Item>
            <Input
              id="password"
              value={values.password}
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Item>
          <ButtonContainer>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </ButtonContainer>
        </>
      )}
    </Formik>
    <SignupContainer>
      ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
    </SignupContainer>
  </>
);

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginForm;
