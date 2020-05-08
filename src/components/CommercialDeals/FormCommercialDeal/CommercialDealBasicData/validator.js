import * as Yup from 'yup';

const requiredData = 'Este campo es obligatorio';

const requiredValidation = Yup.string()
  .required(requiredData);

const basicDataSchema = Yup.object().shape({
  nombre: requiredValidation,
  tipo:requiredValidation,
  fechainicio: requiredValidation,
  fechafin: requiredValidation,
  // margen: requiredValidation,
  // ind_surtido: requiredValidation,
  // codcupon: requiredValidation
});

export default basicDataSchema;
