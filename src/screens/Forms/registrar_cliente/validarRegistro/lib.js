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
	if (values) {
		// Establecer el valor de tipo a partir de ind_esfarmacia
		values.tipo = values.ind_esfarmacia ? 'FARMACIA' : 'SOCIEDAD'
	}
	formData.taskData = values
	formData.nombreComo = ''
	formData.loadingSearch = false
	formData.lstClientesCbim = []
	formData.clienteCbim = {}
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
	return (
		`${element.tipo} ${element.nomentidad_cbim} ${element.direccion} ` +
		`${element.poblacion} ${element.provincia} ${element.codigo_postal}`
	)
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
export const isNotValidData = clienteCbim => {
	if (!clienteCbim || Object.entries(clienteCbim).length === 0) return false
	if (!clienteCbim.codcli_cbim) return false
	if (!clienteCbim.cliente_nombre) return false
	if (!clienteCbim.cliente_apellido1) return false
	if (!clienteCbim.cliente_nif) return false
	if (!clienteCbim.cliente_email) return false
	if (!clienteCbim.cliente_telefono) return false
	if (!clienteCbim.codentidad_cbim) return false
	if (!clienteCbim.nomentidad_cbim) return false
	if (!clienteCbim.direccion) return false
	if (!clienteCbim.codigo_postal) return false
	if (!clienteCbim.poblacion) return false
	if (!clienteCbim.provincia) return false
	return true
}

export const objectEmpty = obj => {
	return !obj || typeof obj !== 'object' || Object.entries(obj).length === 0
}
