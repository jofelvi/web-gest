import { get, post } from '../../lib/restClient'

export const getClientsIndas = () => get('/ntr/cliente')
// Añadir  la busqueda por codcli_cbim, email, nombre
// export const searchOrder = async ({
// 	codentidad_cbim, codcli_cbim, tipo, pages, fecha_desde, fecha_hasta, dates
//   }) => {
	  
// 	let offset;
// 	offset = pages;
	
//   let queryParams = generatingOffset(pages, offset)
	 
// 	//BY DATE
// 	if (dates[0]) {
// 	  queryParams += `&fecha_desde=${dates[0]}`;
// 	}
// 	if (dates[1]) {
// 	  queryParams += `&fecha_hasta=${dates[1]}`;
// 	}
// 	//BY TYPE
// 	if (tipo) {
// 	  tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1)
// 	  queryParams += `&tipo=${tipo}`;
// 	}
// 	//BY CLIENT
// 	if (codcli_cbim) {
// 	  queryParams += `&codcli_cbim=${codcli_cbim}`;
// 	}
// 	//BY ENTITY
// 	if (codentidad_cbim) {
// 	  queryParams += `&codentidad_cbim=${codentidad_cbim}`;
// 	}
// 	return get(`ntr/pedido?${queryParams}`);
//   };
  
export const getEntitiesIndas = queryParams => {
	return !queryParams
		? get('/ntr/entidad')
		: get(`/ntr/entidad?${queryParams}`)
}
export const getWholesalersIndas = idEntity =>
	get(`/ntr/entidad/${idEntity}/mayorista`)

export const updateClientIndas = (idClient, data) =>
	post(`/ntr/cliente/${idClient}`, data)
export const updateEntitiyIndas = (idEntity, data) =>
	post(`/ntr/entidad/${idEntity}`, data)
