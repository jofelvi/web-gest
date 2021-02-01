import {LIMIT} from "../../constants";
import {get, post} from "../../lib/restClient";

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



export const countPlans = async (filters) => {
    const queryParams = addFiltersQueryParams( '', filters )
    return get(`ntr/plan/count?${queryParams}`);
};

export const exportPlansUrl =(filters) => {
    const queryParams = addFiltersQueryParams( '', filters )
    return `ntr/plan?formato=excel${queryParams}`;
};

