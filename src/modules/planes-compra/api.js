import {LIMIT} from "../../constants";
import {get, post, getHeaders} from "../../lib/restClient";
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

export const createPlan = (plan) => post('/ntr/plan/create', { ...plan, 'idtipo': 2 } );



export const fetchPlans = async (filters) => {
    const { page } = filters;
    const offset = (page - 1) * LIMIT;
    let queryParams = generatingOffset(offset)
    queryParams = addFiltersQueryParams(queryParams, filters)
    return get(`ntr/plan?${queryParams}`);
}

export const fetchDelegados = async () => {
    return get(`ntr/delegado`);
}


export const countPlans = async (filters) => {
    const queryParams = addFiltersQueryParams( '', filters )
    return get(`ntr/plan/count?${queryParams}`);
};

export const exportPlans =(filters, filename) => {
    const queryParams = addFiltersQueryParams( '', filters )
    getHeaders().then( ( headers) => {
        var x=new XMLHttpRequest();
        x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/plan?formato=excel${queryParams}` , true);
        _.each(headers, (value, key) => {
            x.setRequestHeader( key, value );
        })
        x.responseType="blob";
        x.onload= function(e){ download(e.target.response, filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");};
        x.send();
    })
};

