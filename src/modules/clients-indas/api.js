import { get, post, patch } from '../../lib/restClient';
import { NUM_CLIENTES_PAG } from './constants';


export const getClientsIndas = () => get('/ntr/cliente');
const LIMIT = 20;

const generatingOffset = (page, offset)=>{
    let queryParams = '';
    const limit = LIMIT;
  if(page < 0){
    offset = 0
queryParams = `offset=${offset}&limit=${limit}`
}else if(page === 0){
  offset = 0
  queryParams = `offset=${offset}&limit=${limit}`
}else{
  queryParams = `offset=${offset}&limit=${limit}`
}
return queryParams;
}

export const searchClientBy = async ({
	emailComo, 
	codcli_cbim, 
	nombreComo, 
	pages,
  }) => {
	  
	let offset;
	offset = pages;
	
  let queryParams = generatingOffset(pages, offset)
	
	//BY TYPE
	if (nombreComo) {
	  //tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1)
	  queryParams += `&nombreComo=${nombreComo}`;
	}
	//BY CLIENT
	if (codcli_cbim) {
	  queryParams += `&codcli_cbim=${codcli_cbim}`;
	}
	//BY ENTITY
	if (emailComo) {
	  queryParams += `&emailComo=${emailComo}`;
	}
	return get(`ntr/cliente?${queryParams}`);
  };
export const editClientTR = (id,data) => patch(`/multi/cliente/${id}`, data);


export const getUsersCount = ({ emailComo = '' }) => {
	const queryParams = `${emailComo ? `?emailComo=${emailComo}` : ''}`;
	// if (emailComo) {
 	// 	return queryParams = `${emailComo ? `?emailComo=${emailComo}` : ''}`;
	// }
	// if (nombreComo) {
	// 	return queryParams = `${nombreComo ? `?emailComo=${nombreComo}` : ''}`;
	// }
	// if (codcli_cbim) {
	// 	return queryParams = `${codcli_cbim ? `?emailComo=${codcli_cbim}` : ''}`;
	// }	
	return get(`/ntr/cliente/count${queryParams}`)
  }; 

export const getUsers = ({ emailComo = '', page = 1 }) => {
	const queryParams = `?offset=${(page - 1) * NUM_CLIENTES_PAG}&limit=${NUM_CLIENTES_PAG}${emailComo ? `&emailComo=${emailComo}` : ''}`;
	return get(`/ntr/cliente${queryParams}`)
};

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
