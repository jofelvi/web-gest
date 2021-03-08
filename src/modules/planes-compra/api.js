import {LIMIT} from "../../constants";
import {get, post, getHeaders, patch} from "../../lib/restClient";
import _  from 'underscore';
import * as download from 'downloadjs';

const generatingOffset = (offset)=>{
    const limit = LIMIT;
    return `offset=${offset}&limit=${limit}`
}

const addFiltersQueryParams = ( queryParams, {
    idestado, coddelegado, idcliente, fechas, formato
} ) => {
    if (fechas && fechas[0]) {
        queryParams += `&fecha_desde=${fechas[0]}`;
    }
    if (fechas && fechas[1]) {
        queryParams += `&fecha_hasta=${fechas[1]}`;
    }
    if (idestado) {
        queryParams += `&idestado=${idestado}`;
    }
    if (idcliente) {
        queryParams += `&idcliente=${idcliente}`;
    }
    if (coddelegado) {
        queryParams += `&coddelegado=${coddelegado}`;
    }
    return queryParams;
}

export const fetchPlans = async (filters) => {
    const { page } = filters;
    const offset = (page - 1) * LIMIT;
    let queryParams = generatingOffset(offset)
    queryParams = addFiltersQueryParams(queryParams, filters)
    return get(`ntr/plan?${queryParams}`);
}
export const createPlan = (plan) => post('/ntr/plan/create', { ...plan, 'idtipo': 2 } );

export const createSubmarcaCollection = ( collection ) => {
    return post('/ntr/fav/submarca/create', collection );
}

export const fetchSubmarcaCollections = async (filters) => {
    return get(`ntr/fav/submarca`);
}


export const fetchDelegados = async () => {
    return get(`ntr/delegado`);
}


export const countPlans = async (filters) => {
    const queryParams = addFiltersQueryParams( '', filters )
    return get(`ntr/plan/count?${queryParams}`);
};

export const exportPlans =(filters, callback) => {
    const queryParams = addFiltersQueryParams( '', filters )
    getHeaders().then( ( headers) => {
        var x=new XMLHttpRequest();
        x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/plan?formato=excel${queryParams}` , true);
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
export const getPlan = (idcondcomercial) => get(`/ntr/plan/${idcondcomercial}`);
export const editPlan = (plan) => patch(`/ntr/plan/${plan.idcondcomercial}`, { ...plan, 'idtipo': 2 } );
export const updatePlans = (payload) => {
    const action = payload.action ? payload.action : 'estados';
    // backend requiere los ids en plano para la accion renovar, en vez del objeto
    if ( action == 'renovar' ) {
        return post(`/ntr/plan/renovar`, payload.plansIds);
    }
    return post(`/ntr/plan/${action}`, { ...payload.change, planes: payload.plansIds } );
}

//plantear si debemos moverla
export const avanceCliente = (idcliente, successCallback) => {
    getHeaders().then( ( headers) => {
        var x=new XMLHttpRequest();
        x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/cliente/${idcliente}/condcomerciales?formato=html` , true);
        _.each(headers, (value, key) => {
            x.setRequestHeader( key, value );
        })
        //x.responseType="blob"; ->param for abstract method
        x.onload= successCallback;
        x.send();
    })
}
