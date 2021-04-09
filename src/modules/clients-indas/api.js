import {get, post, patch, getHeaders} from '../../lib/restClient';
import { NUM_CLIENTES_PAG } from './constants';
import _ from "underscore";
import * as download from "downloadjs";
import {LIMIT} from "../../constants";

export const estados = {
	0: "Baja",
	1: "Alta",
	2: "Registro en proceso",
	3: "Alta en proceso",
	4: "Pendiente de validación"
}
export const getClientsIndas = () => get('/ntr/cliente');

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
export const updateClient = ( rClient ) => {
	const client = _.clone( rClient )
	const idcliente = client.idcliente;
	delete client.idcliente;
	delete client.estado;
	return patch(`/multi/cliente/${idcliente }`, client );
}


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
	sort_field, sort_order, idestado, fechas, coddelegado, ind_esfarmacia, orden, idcliente, filtro, codpedido_origen
} ) => {
	if (sort_field) {
		if (sort_order === 'DESC') {
			queryParams += `&orden=-${sort_field}`;
		} else {
			queryParams += `&orden=+${sort_field}`;
		}
	}
	if (fechas && fechas[0]) {
		queryParams += `&fecha_desde=${fechas[0]}`;
	}
	if (fechas && fechas[1]) {
		queryParams += `&fecha_hasta=${fechas[1]}`;
	}

	if (idcliente && idcliente !== '') {
		queryParams += `&idcliente=${idcliente}`;
	}

	if(codpedido_origen && codpedido_origen !== '') {
		queryParams += `&codpedido_origen=${codpedido_origen}`
	}

	if (idestado && idestado != '') {
		queryParams += `&cliente_estado=${idestado}`;
	}

	if (filtro && filtro != '') {
		queryParams += `&filtro=${filtro}`;
	}

	if (coddelegado && coddelegado !== '') {
		queryParams += `&coddelegado=${coddelegado}`;
	}

	if (ind_esfarmacia && ind_esfarmacia !== '') {
		queryParams += `&ind_esfarmacia=${ind_esfarmacia}`;
	}
	return queryParams;
}

export const getEntitiesIndas = async ( payload ) => {
	let queryParams = '';
	if ( payload && typeof payload === 'string' ) {
		queryParams = payload;
	}
	if ( payload && typeof payload !== 'string' ) {
		const filters = payload.filters ? payload.filters : {}
		const page = payload.page ? payload.page : 1;
		const offset = (page - 1) * LIMIT;
		queryParams = generatingOffset(offset)
		queryParams = addFiltersQueryParams(queryParams, filters)
	}
	return get(`ntr/entidad?${queryParams}`);
}
export const countEntitiesIndas = async ( payload ) => {
	let queryParams = '';
	if ( payload ) {
		const filters = payload.filters ? payload.filters : {}
		if ( filters.sort_field ) {
			delete filters.sort_field;
		}
		queryParams = addFiltersQueryParams(queryParams, filters)
	}
	return get(`ntr/entidad/count?${queryParams}`);
};
export const getClient = (idcliente) => get(`/ntr/cliente/${idcliente}`);
export const getClientEntities = (idcliente) => get(`/ntr/cliente/${idcliente}/entidades`);
export const getClientStatisticsPurchase = (idcliente) => get(`/ntr/cliente/${idcliente}/stats/compras`);
export const getClientStatisticsPurchaseGroups = (idcliente) => get(`/ntr/cliente/${idcliente}/stats/compras_grupo`);
export const getClientPlans = (idcliente) => get(`/ntr/cliente/${idcliente}/planes`);
export const getWholesalersIndas = idEntity =>
	get(`/ntr/entidad/${idEntity}/mayorista`)

export const updateClientIndas = (idClient, data) =>
	post(`/ntr/cliente/${idClient}`, data)
export const updateEntitiyIndas = (idEntity, data) =>
	post(`/ntr/entidad/${idEntity}`, data)

export const exportEntities =(filters = {}, callback) => {
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

export const exportEntityPuntos =(codentidad_cbim, filters = {}, callback) => {
	const queryParams = addFiltersQueryParams( '', filters )
	getHeaders().then( ( headers) => {
		var x=new XMLHttpRequest();
		x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/entidad/${codentidad_cbim}/puntos/historial?formato=excel${queryParams}` , true);
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




export const getEntityPuntos = async ( payload ) => {
	let queryParams = '';
	if ( payload && typeof payload === 'string' ) {
		queryParams = payload;
	}
	if ( payload && typeof payload !== 'string' ) {
		const filters = payload.filters ? payload.filters : {}
		const page = payload.page ? payload.page : 1;
		const offset = (page - 1) * LIMIT;
		queryParams = generatingOffset(offset)
		queryParams = addFiltersQueryParams(queryParams, filters)
	}
	return get(`ntr/entidad/${payload.codentidad_cbim}/puntos/historial?${queryParams}`);
}
export const countEntityPuntos = async ( payload ) => {
	let queryParams = '';
	if ( payload ) {
		const filters = payload.filters ? payload.filters : {}
		if ( filters.sort_field ) {
			delete filters.sort_field;
		}
		queryParams = addFiltersQueryParams(queryParams, filters)
	}
	return get(`ntr/entidad/${payload.codentidad_cbim}/puntos/historial/count?${queryParams}`);
};
export const createEntityPuntos = (codentidad_cbim,data) => post(`/multi/entidad/${codentidad_cbim}/puntos/create`, data);
