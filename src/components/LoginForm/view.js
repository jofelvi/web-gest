import React from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { Form, Input, Button } from 'antd';
import { Icon } from '@ant-design/compatible';
import { Link } from 'react-router-dom';

import {
	ButtonContainer,
	SignupContainer,
	LoginErrorContainer,
	LoginErrorText,
	FieldErrorContainer,
	FieldErrorText,
} from './styles';

const { Item } = Form;

const validationSchema = Yup.object().shape({
	user: Yup.string().required(),
	password: Yup.string().required(),
});

const LoginForm = ({ login, status }) => (
	<>
		<Formik
			initialValues={{
				user: '',
				password: '',
			}}
			validationSchema={validationSchema}
			onSubmit={values => {
				login({ values: { user: values.user, password: values.password } });
			}}
		>
			{({
				values,
				handleChange,
				handleBlur,
				handleSubmit,
				errors,
				touched,
			}) => (
				<>
					<Item validateStatus={errors.user && touched.user ? 'error' : null}>
						<Input
							id="user"
							value={values.user}
							prefix={<Icon type="user" />}
							placeholder="User"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.user && touched.user && (
							<FieldErrorContainer>
								<FieldErrorText>
									Debe introducir un usuario válido
                </FieldErrorText>
							</FieldErrorContainer>
						)}
					</Item>
					<Item
						validateStatus={
							errors.password && touched.password ? 'error' : null
						}
					>
						<Input
							id="password"
							value={values.password}
							prefix={<Icon type="lock" />}
							type="password"
							placeholder="Password"
							onChange={handleChange}
							onKeyDown={e => e.keyCode === 13 ? handleSubmit() : null}
							onBlur={handleBlur}
						/>
						{errors.password && touched.password && (
							<FieldErrorContainer>
								<p>Debe introducir una contraseña</p>
							</FieldErrorContainer>
						)}
						{status === 'logged-error' && (
							<LoginErrorContainer>
								<LoginErrorText>
									El usuario o la contraseña son incorrectos
                </LoginErrorText>
							</LoginErrorContainer>
						)}
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
	login: PropTypes.func.isRequired,
	status: PropTypes.func.isRequired,
};

export default LoginForm;
