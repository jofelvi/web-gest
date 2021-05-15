/**
 * Esta librería define las funciones comunes al registros de usuario con y sin CBIM.
 *
 * Las funciones obtenerValoresIniciales y obtenerValidacionScherma necesitan que el
 * parametro @param formData sea un array cuyos elementos deben confirmar la siguiente
 * estructura:
 *   - name: nombre del campo a enviar al proceso
 *   - type: tipo del campo (String, Integer, Booleano, ...). Estos valores deben ser
 *           alguno de los esperados por Camunda.
 *   - validation: la validaciones que se deben realizar utilizando la librería Yup.
 *           Si no se definen validaciones se indica "undefined".
 * Ejemplo:
 *	export const formData = [
 *		{name="usuario", type="String", validation:Yup.string().required()},
 *		{name="clave", type="String", validation:Yup.string().required()},
 *	];
 *
 **/
import { selectTaskVariable } from '../../lib'
import { formData, processData } from './data'

export const obtenerValoresIniciales = function(taskVariables) {
	let values = obtenerValoresProceso(taskVariables, processData)
	formData.taskData = values
	formData.loadingSearch = false
	formData.entidadCbim = {}
	return formData
}
const obtenerValoresProceso = function(taskVariables, formData) {
	let initValue = formData.reduce(function(result, item, i) {
		result[item.name] =
			taskVariables && selectTaskVariable(taskVariables, item.name)
				? selectTaskVariable(taskVariables, item.name).value
				: ''
		return result
	}, {})
	return initValue
}
export const fechaView = function (fecha) {
	let d = undefined;
	if(typeof fecha === 'string') {
		d = new Date(fecha);
	} else if(typeof fecha === 'object' && fecha instanceof Date) {
		d = fecha;
	} else {
		return fecha;
	}
	let day = d.getDate();
	let month = d.getMonth() + 1;
	let year = d.getFullYear();
	let s = (day < 10? '0':'') + day + '/' + (month < 10? '0': '') + month + '/' + year;
	return s;
}
