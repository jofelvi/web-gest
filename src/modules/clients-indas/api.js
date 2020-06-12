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

// export const searchClientBy = async ({
// 	emailComo, 
// 	codcli_cbim, 
// 	nombreComo, 
// 	pages,
//   }) => {
	  
// 	let offset;
// 	offset = pages;
	
//   let queryParams = generatingOffset(pages, offset)
	
// 	//BY TYPE
// 	if (nombreComo) {
// 	  //tipo = tipo.charAt(0).toUpperCase() + tipo.slice(1)
// 	  queryParams += `&nombreComo=${nombreComo}`;
// 	}
// 	//BY CLIENT
// 	if (codcli_cbim) {
// 	  queryParams += `&codcli_cbim=${codcli_cbim}`;
// 	}
// 	//BY ENTITY
// 	if (emailComo) {
// 	  queryParams += `&emailComo=${emailComo}`;
// 	}
// 	return get(`ntr/cliente?${queryParams}`);
//   };
export const editClientTR = (id,data) => patch(`/multi/cliente/${id}`, data);

export const getUsersCount = ({ emailComo = '', nombreComo = '', codcli_cbim = '' }) => {
	console.log({ emailComo, nombreComo });
	let queryParams = '';
	if (emailComo && !nombreComo) {
 		queryParams = `?emailComo=${emailComo}`;
	}
	if (nombreComo && !emailComo) {
		queryParams = `?nombreComo=${nombreComo}`;
	}
	if(emailComo && nombreComo){
		queryParams = `?nombreComo=${nombreComo}&emailComo=${emailComo}`;
	}
	if (codcli_cbim) {
		return queryParams = '';
	}	
	return get(`/ntr/cliente/count${queryParams}`);
  }; 

export const getUsers = ({ emailComo = '', nombreComo = '', codcli_cbim = '', page = 1 }) => {
	console.log({ page, emailComo, nombreComo, codcli_cbim });
	let offsetLimit = `?offset=${(page - 1) * NUM_CLIENTES_PAG}&limit=${NUM_CLIENTES_PAG}`;
	let queryParams = '';
	if (emailComo && nombreComo && codcli_cbim) {
		queryParams = `${offsetLimit}&emailComo=${emailComo}&nombreComo=${nombreComo}&codcli_cbim=${codcli_cbim}`;
	} else if (!nombreComo && !codcli_cbim && !emailComo) {
		// console.log({offsetLimit})
		queryParams = offsetLimit;
	}
	if (!nombreComo && !codcli_cbim && emailComo) {
		// console.log("por email");
		queryParams = `${offsetLimit}&emailComo=${emailComo}`;
	} else if (nombreComo && codcli_cbim){
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}&codcli_cbim=${codcli_cbim}`;
	}
	if (!nombreComo && !emailComo && codcli_cbim) {
		// console.log("por codcli_cbim");
		queryParams = `${offsetLimit}&codcli_cbim=${codcli_cbim}`;
	} else if (nombreComo && emailComo) {
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}&emailComo=${emailComo}`;
	}
	if (!codcli_cbim && !emailComo && nombreComo) {
		// console.log("por nombreComo");
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}`;
	} else if (codcli_cbim && emailComo) {
		queryParams = `${offsetLimit}&emailComo=${emailComo}&codcli_cbim=${codcli_cbim}`;
	}

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
