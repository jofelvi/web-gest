
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

