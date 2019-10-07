import { selectTaskVariable } from '../../lib';
import * as Yup from 'yup';

export const formData = [
// Cliente
{name:"codcli_cbim", type:"Integer", validation: Yup.number().integer().required()},
{name:"nomcli_cbim", type:"String", validation: Yup.string().required()},
{name:"cliente_nombre", type:"String", validation: Yup.string().required()},
{name:"cliente_apellido1", type:"String", validation: Yup.string().required()},
{name:"cliente_apellido2", type:"String", validation: undefined},
{name:"cliente_nif", type:"String", validation: Yup.string().required()},
{name:"cliente_email", type:"String", validation: Yup.string().required()},
{name:"cliente_telefono", type:"String", validation: Yup.string().required()},
{name:"ind_acepta_newsletter", type:"Boolean", validation: Yup.bool().required()},
{name:"ind_acepta_emailcomercial", type:"Boolean", validation: Yup.bool().required()},
// Entidad
{name:"codentidad_cbim", type:"Integer", validation: Yup.number().integer().required()},
{name:"nomentidad_cbim", type:"String", validation: Yup.string().required()},
{name:"entidad_nif", type:"String", validation: undefined},
{name:"entidad_tipo", type:"String", validation: Yup.string().required()},
{name:"entidad_telefono", type:"String", validation: Yup.string().required()},
{name:"dir_via", type:"String", validation: Yup.string().required()},
{name:"dir_poblacion", type:"String", validation: Yup.string().required()},
{name:"dir_cp", type:"String", validation: Yup.string().required()},
{name:"dir_provincia", type:"String", validation: Yup.string().required()},
{name:"entidad_email", type:"String", validation: undefined},
{name:"coddelegado", type:"String", validation: undefined},
];
export const obtenerValoresIniciales = function(taskVariables) {
	let initValue = formData.reduce(function(result, item, i) {
		result[item.name] = taskVariables && selectTaskVariable(taskVariables, item.name)
				? selectTaskVariable(taskVariables, item.name).value : '';
		return result;
	}, {});
	return initValue;	
};
export const obtenerValidacionSchema = function() {
	let validaciones = formData.filter(function(item){ return item.validation }).reduce(
		function(result, item, i) {
			result[item.name] = item.validation;
			return result;
		}, {});
	return validaciones;	
};

