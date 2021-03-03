import {get, post, patch, getHeaders} from '../../lib/restClient';
import { NUM_CLIENTES_PAG } from './constants';
import _ from "underscore";
import * as download from "downloadjs";


export const getClientsIndas = () => get('/ntr/cliente');
const LIMIT = 20;

const generatingOffset = (offset)=>{
	return `offset=${offset}&limit=${LIMIT}`
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
	let offsetLimit = `?offset=${(page - 1) * NUM_CLIENTES_PAG}&limit=${NUM_CLIENTES_PAG}`;
	let queryParams = '';
	if (emailComo && nombreComo && codcli_cbim) {
		queryParams = `${offsetLimit}&emailComo=${emailComo}&nombreComo=${nombreComo}&codcli_cbim=${codcli_cbim}`;
	} else if (!nombreComo && !codcli_cbim && !emailComo) {
		queryParams = offsetLimit;
	}
	if (!nombreComo && !codcli_cbim && emailComo) {
		queryParams = `${offsetLimit}&emailComo=${emailComo}`;
	} else if (nombreComo && codcli_cbim){
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}&codcli_cbim=${codcli_cbim}`;
	}
	if (!nombreComo && !emailComo && codcli_cbim) {
		queryParams = `${offsetLimit}&codcli_cbim=${codcli_cbim}`;
	} else if (nombreComo && emailComo) {
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}&emailComo=${emailComo}`;
	}
	if (!codcli_cbim && !emailComo && nombreComo) {
		queryParams = `${offsetLimit}&nombreComo=${nombreComo}`;
	} else if (codcli_cbim && emailComo) {
		queryParams = `${offsetLimit}&emailComo=${emailComo}&codcli_cbim=${codcli_cbim}`;
	}

	return get(`/ntr/cliente${queryParams}`)
};
//todo: ajustar
const addFiltersQueryParams = ( queryParams, {
	sort_field, sort_order, idestado, coddelegado, ind_esfarmacia, orden, idcliente
} ) => {
	if (sort_field) {
		if (sort_order == 'DESC') {
			queryParams += `&orden=-${sort_field}`;
		} else {
			queryParams += `&orden=+${sort_field}`;
		}
	}

	if (idcliente && idcliente != '') {
		queryParams += `&idcliente=${idcliente}`;
	}

	if (idestado && idestado != '') {
		queryParams += `&cliente_estado=${idestado}`;
	}

	if (coddelegado && coddelegado != '') {
		queryParams += `&coddelegado=${coddelegado}`;
	}

	if (ind_esfarmacia && ind_esfarmacia != '') {
		queryParams += `&ind_esfarmacia=${ind_esfarmacia}`;
	}
	return queryParams;
}

export const getEntitiesIndas = async ( payload ) => {
	let queryParams = '';
	if ( payload ) {
		const { page, filters } = payload;
		console.log('payload', payload)
		const offset = (page - 1) * LIMIT;
		queryParams = generatingOffset(offset)
		queryParams = addFiltersQueryParams(queryParams, filters)
	}
	return get(`ntr/entidad?${queryParams}`);
}
export const countEntitiesIndas = async (filters) => {
	const queryParams = addFiltersQueryParams( '', filters )
	return get(`ntr/entidad/count?${queryParams}`);
};
export const getClient = (idcliente) => get(`/ntr/cliente/${idcliente}`);

export const getWholesalersIndas = idEntity =>
	get(`/ntr/entidad/${idEntity}/mayorista`)

export const updateClientIndas = (idClient, data) =>
	post(`/ntr/cliente/${idClient}`, data)
export const updateEntitiyIndas = (idEntity, data) =>
	post(`/ntr/entidad/${idEntity}`, data)

export const exportEntities =(filters, callback) => {
	const queryParams = addFiltersQueryParams( '', filters )
	getHeaders().then( ( headers) => {
		var x=new XMLHttpRequest();
		x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/entidad?formato=excel${queryParams}` , true);
		_.each(headers, (value, key) => {
			x.setRequestHeader( key, value );
		})
		x.responseType="blob";
		x.onload= function(e){
			const filename = x.getResponseHeader('content-disposition').split('=')[1];
			download(e.target.response, filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			callback()
		};
		x.send();
	})
};
