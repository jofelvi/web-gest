
import * as Yup from 'yup'

export const mapperInputData = [{
    assignee: 'Asignado a',
    priority: 'Prioridad',
    due: 'Fecha de vencimiento'
}];

export const validationSchema = Yup.object().shape({
    due: Yup.string().required(),
    assignee: Yup.string().required(),
    priority: Yup.number().required(),

  });

export const handleInput = (setFieldValue, id) => (event) => {
    if (!event.target) {
      return setFieldValue(id, event);
    } 
    return setFieldValue(id, event.target.value);
};