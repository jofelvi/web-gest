import * as Yup from 'yup';

const requiredData = 'Este campo no puede estar vacío';

const requiredValidation = Yup.string()
  .required(requiredData);

const basicDataSchema = Yup.object().shape({
  nombre: requiredValidation,
  tipo:requiredValidation,
  fechainicio: requiredValidation,
  fechafin: requiredValidation,
  margen: requiredValidation,
  ind_surtido: requiredValidation
});

export default basicDataSchema;
