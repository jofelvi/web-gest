import {get, getHeaders} from '../../lib/restClient';
import _ from "underscore";
import * as download from "downloadjs";
import * as moment from 'moment';

const dateBeginOfMonth = ( date ) => {
    if (date ) {
        return moment(date).startOf('month').format('YYYY-MM-DD')
    }
    return date;
}

export const getYearDaysSales = (date) => get(`ntr/pedido/stats/day?fecha_desde=${dateBeginOfMonth(date.dateFrom)}&fecha_hasta=${date.dateTo}`);
export const getYearSales = (date) => get(`ntr/pedido/stats/year?fecha_desde=${dateBeginOfMonth(date.dateFrom)}&fecha_hasta=${dateBeginOfMonth(date.dateTo)}`);
export const getHourSales = (date) => get(`ntr/pedido/stats/hour?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getSubfamiliesByYear = (date) => get(`ntr/pedido/stats/subfamilia?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getClientsSubcriptions = (date) => get(`ntr/cliente/stats/subcripciones?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`)

//
export const getClientsActives = (date) => get(`ntr/cliente/stats/activos?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`)
export const getClientsActivesByIntervals = () => get('ntr/cliente/stats/intervalos/activos');
export const getClientsInactivesByIntervals = () => get('ntr/cliente/stats/intervalos/inactivos');


const parseStatsParams = ( filters ) => {
    let queryParams = '';
    if ( filters.grupo ) {
        queryParams += `grupo=${filters.grupo}&`
    }

    if ( filters.desde ) {
        queryParams += `desde=${filters.desde}&`
    }

    if ( filters.hasta ) {
        queryParams += `hasta=${filters.hasta}&`
    }
    return queryParams;
}

export const getStatsPedidos = ( filters ) => get(`ntr/stats/actividad?${parseStatsParams(filters)}`)
export const getStatsPedidosPorGrupo = ( filters ) => get(`ntr/stats/ventas-grupo?${parseStatsParams(filters)}`)
export const getStatsClientes = ( filters ) => get(`ntr/stats/altas?${parseStatsParams(filters)}`)

export const exportStats =(filters, callback, error) => {
    const queryParams = parseStatsParams( filters )
    getHeaders().then( ( headers) => {
        var x=new XMLHttpRequest();
        x.open( "GET", `${process.env.REACT_APP_API_BASE_URL}ntr/stats/cmi-excel?${queryParams}` , true);
        _.each(headers, (value, key) => {
            x.setRequestHeader( key, value );
        })
        x.responseType="blob";
        x.onload= function(e, p, q){
            if ( 500 === e.target.status ) {
                e.target.response.text().then( error )
            } else {
                const filename = x.getResponseHeader('content-disposition').split('=')[1];
                download(e.target.response, filename, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                callback()
            }
        };
        x.send();
    })
};
