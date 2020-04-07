import * as Yup from 'yup';

const invalidEmail = 'email no válido';
const passwordRequiredMessage = 'Introduce una contraseña';
const emailRequiredMessage = 'Introduce un email';

const passwordValidation = Yup.string()
  .required(passwordRequiredMessage);

const emailValidation = Yup.string()
  .email(invalidEmail)
  .required(emailRequiredMessage);

const basicDataSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export default basicDataSchema;
