import * as moment from 'moment';

export const startDate = moment();//.subtract(1, 'year').add(15, 'days');
export const startDateMonthYear = startDate.format("YYYY-MM-DD") //this will only format data to "YYYY-MM" to filter by month but now we have no enough data on real time so in order to test it we need data from past time.
export const listOfDates = [startDateMonthYear];
export const monthNames = ["En", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Agt", "Set", "Oct", "Nov", "Dic"]
