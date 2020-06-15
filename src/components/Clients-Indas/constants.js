import React from 'react';
import * as Yup from 'yup';
import { 
    Button, 
    Checkbox, 
    Modal,
    Popconfirm
} from 'antd';

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
        inputKey: 'nombreComo',
    },  
    {
        label: 'Buscar por email',
        inputKey: 'emailComo',
    },
];

export const validationSchema = Yup.object().shape({
    email: Yup.string(),
  });
export const messageAlertEmail = `Se procederá al cambio de Email del cliente ‘nomcli_cbim’. \n\ A partir de entonces, la Farmacia solo podrá \n\ entrar en transferindas.com \n\ usando este nuevo valor de Email. \n\ Confirme por favor el cambio.`
export const getMessageEditMail = (name) => {
    let messageAlertUser = '';
    return messageAlertUser = `Se procederá al cambio de Email del cliente ${name}. \n\ A partir de entonces, la Farmacia solo podrá \n\ entrar en transferindas.com \n\ usando este nuevo valor de Email.`
}
export const messageAlertUserDeactivation = `Se va a desactivar el cliente ‘nomcli_cbim’. \n\ Se cerrará el acceso a transferindas.com, por lo que no podrá realizar nuevos pedidos.`;
export const messageAlertUserActivation = `Se va a activar el cliente ‘nomcli_cbim’. \n\ Se abrirá el acceso a transferindas.com, por lo que podrá realizar nuevos pedidos.`

export const getMessageActivationAndName = (name, idestado) => {
    let messageAlertUser = '';
    if(idestado === 0) {
        return messageAlertUser = `Se va a activar el cliente ${name}. \n\ Se abrirá el acceso a transferindas.com, por lo que podrá realizar nuevos pedidos.`
    } else if (idestado === 1) {
        return messageAlertUser = `Se va a desactivar el cliente ${name}. \n\ Se cerrará el acceso a transferindas.com, por lo que no podrá realizar nuevos pedidos. `
    }
    return messageAlertUser;
}

