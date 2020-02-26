import { get } from '../../lib/restClient';


export const getYearDaysSales = (dateFrom, dateTo) => get(`ntr/pedido/stats/day?fecha_desde=${dateFrom}&fecha_hasta=${dateTo}`);
export const getYearSales = (date) => get(`ntr/pedido/stats/year?fecha_desde=${date.dateFrom}&fecha_hasta=${date.dateTo}`);


