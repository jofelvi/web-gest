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
export const getOptionValue = element => {
	if (!element || Object.entries(element).length === 0) return null
	const tipo = element.ind_esfarmacia ? 'FARMACIA' : 'SOCIEDAD'
	const text =
		`${tipo} ${element.nomentidad_cbim} ${element.direccion} ` +
		`${element.poblacion} ${element.provincia} ${element.codigo_postal}`
	return text.toUpperCase()
}
export const obtenerValidacionSchema = function(formData) {
	let validaciones = formData
		.filter(function(item) {
			return item.validation
		})
		.reduce(function(result, item, i) {
			result[item.name] = item.validation
			return result
		}, {})
	return validaciones
}
export const isNotValidData = entidadCbim => {
	if (!entidadCbim || Object.entries(entidadCbim).length === 0) return false
	if (!entidadCbim.codentidad_cbim) return false
	if (!entidadCbim.nomentidad_cbim) return false
	if (!entidadCbim.telefono) return false
	if (!entidadCbim.direccion) return false
	if (!entidadCbim.codigo_postal) return false
	if (!entidadCbim.poblacion) return false
	if (!entidadCbim.provincia) return false
	return true
}
export const setEntidadCbim = element => {
	console.log("element:" , element);
	if (!element) return {}
	let result = { 
		codentidad_cbim: element.codentidad_cbim,
		nomentidad_cbim: element.nomentidad_cbim,
		nif: element.entidad_nif,
		direccion: element.direccion,
		codigo_postal: element.codigo_postal,
		poblacion: element.poblacion,
		provincia: element.provincia,
		telefono: element.entidad_telefono,
		ind_esfarmacia: element.ind_esfarmacia,
		entidad_email: element.entidad_email,
	}
	console.log("result:" , result);
	return result
}
