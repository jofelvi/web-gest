import * as Yup from 'yup';

export const mapperInputData = [{
    email: 'Asignado a',
}];

export const listInputFilter = [
    {
        label: 'Buscar por Código Cliente',
        inputKey: 'codcli_cbim',
    },
    {
        label: 'Buscar por Nombre',
        inputKey: 'name',
    },  
    {
        label: 'Buscar por email',
        inputKey: 'email',
    },
];

export const validationSchema = Yup.object().shape({
    email: Yup.string(),
  });
export const messageAlertEmail = `Se procederá al cambio de Email del cliente ‘nomcli_cbim’. \n\ A partir de entonces, la Farmacia solo podrá entrar en transferindas.com usando este nuevo valor de Email. \n\
Confirme por favor el cambio`