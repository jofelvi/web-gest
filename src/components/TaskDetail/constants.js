
import * as Yup from 'yup'

export const mapperInputData = [{
    assignee: 'Asignado a',
    priority: 'Prioridad',
    due: 'Fecha de vencimiento'
}];

export const validationSchema = Yup.object().shape({
    due: Yup.string(),
    assignee: Yup.string(),
    priority: Yup.number(),

  });

