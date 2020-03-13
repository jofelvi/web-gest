import { get } from '../../lib/restClient';


export const getYearDaysSales = (date) => get(`ntr/pedido/stats/day?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getYearSales = (date) => get(`ntr/pedido/stats/year?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getHourSales = (date) => get(`ntr/pedido/stats/hour?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getSubfamiliesByYear = (date) => get(`ntr/pedido/stats/subfamilia?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);
export const getClientsSubcriptions = (date) => get(`ntr/cliente/stats/subcripciones?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`)
export const getClientsActives = (date) => get(`ntr/cliente/stats/activos?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`)
export const getClientsActivesByIntervals = () => get('ntr/cliente/stats/intervalos/activos');
export const getClientsInactivesByIntervals = () => get('ntr/cliente/stats/intervalos/inactivos');

