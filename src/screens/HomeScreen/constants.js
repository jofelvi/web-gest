import * as moment from 'moment';

export const startDate = moment();
export const startDateDay = moment();

export const startDateMonthYear = startDateDay.format("YYYY-MM-DD") //this will only format data to "YYYY-MM" to filter by month but now we have no enough data on real time so in order to test it we need data from past time.
export const startDateYear = startDate.format("YYYY");
export const listOfDates = [startDateMonthYear];
export const listOfYears = [ startDateYear];
export const monthNames = ["En", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Agt", "Set", "Oct", "Nov", "Dic"]
