import * as Yup from 'yup';

const requiredData = 'Este campo es obligatorio';

const requiredValidation = Yup.string()
  .required(requiredData);

const basicDataSchema = Yup.object().shape({
  descuento: requiredValidation,
  udsmaximas:requiredValidation,
  udsminimas: requiredValidation
});

export default basicDataSchema;
