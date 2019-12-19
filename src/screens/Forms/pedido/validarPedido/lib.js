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
 *   - defaultValue: si se quiere definir un valor por defecto en caso de no recuperar nada
 * Ejemplo:
 *	export const formData = [
 *		{name="usuario", type="String", validation:Yup.string().required(), defaultValue:''},
 *		{name="clave", type="String", validation:Yup.string().required(), defaultValue:''},
 *	];
 *
 **/
import { selectTaskVariable } from '../../lib';
import { formData, formDataItem } from './data';

export const obtenerValoresIniciales = function(taskVariables) {
	let initValue = formData.reduce(function(result, item, i) {
		result[item.name] = taskVariables && selectTaskVariable(taskVariables, item.name)
				? selectTaskVariable(taskVariables, item.name).value : '';
		if(result[item.name] == '') {
			result[item.name] = item.defaultValue;
		}
		return result;
	}, {});
	// Componemos los productos asociados al pedido a partir del datos en lineas
	initValue.items = [];
	if(initValue && initValue.lineas) {
		for(let i = 1; i <= initValue.lineas; i++) {
			let linea = formDataItem.reduce(function(result, item, j) {
				let name = "l" + i + "_" + item.name;
				result[item.name] = taskVariables && selectTaskVariable(taskVariables, name)
						? selectTaskVariable(taskVariables, name).value : '';
				if(result[item.name] == '') {
					result[item.name] = item.defaultValue;
				}
				return result;
			}, {});
			initValue.items.push(linea);
		}
	}
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

export const fechaView = function (fecha) {
	let d = undefined;
	if(typeof fecha === 'string') {
		d = new Date(fecha);
	} else if(typeof fecha === 'Date') {
		d = fecha;
	} else {
		return fecha;
	}
	let day = d.getDate();
	let month = d.getMonth() + 1;
	let year = d.getFullYear();
	let s = (day < 10? '0':'') + day + '/' + (month < 10? '0': '') + month + '/' + year;
	return s;
};
