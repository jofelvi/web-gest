import * as Yup from 'yup';

const requiredData = 'Este campo es obligatorio';

const requiredValidation = Yup.string()
  .required(requiredData);
const requiredValidationMargen = Yup.string()
  .when('tipo', {
    is: val => (val === "2" || val === "Plan de Compra" ),
    then: Yup.string().required(requiredData)
  })
  

const requiredValidationCodCupon = Yup.string()
  .when('tipo', {
    is: val => (val === "3" || val === "Campaña" ),
    then: Yup.string().required(requiredData)
  })

const basicDataSchema = Yup.object().shape({
  nombre: requiredValidation,
  tipo:requiredValidation,
  fechainicio: requiredValidation,
  fechafin: requiredValidation,
  margen: requiredValidationMargen,
  codcupon: requiredValidationCodCupon
});

export default basicDataSchema;
