import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'
import * as moment from 'moment';

import {
 
  fetchSalesByYearSuccess,
 //fetchSalesByMonthSuccess,
  fetchSalesByHourSuccess,
  //fetchEntitiesSuccess,
  //fetchSubfamilySuccess,
  //fetchClientsDataSuccess,
  fetchClientsActivitySuccess,
  fetchClientsSalesSuccess,
  fetchPendingTasksSuccess,
  fetchSalesYearDaysSuccess,
  fetchSalesByHourFail,
  fetchSubfamilyYearSuccess,
  fetchSubfamilyMonthSuccess,
  fetchSubfamilyDaySuccess,
  fetchSubfamilyHourSuccess,
  fetchEntitiesYearActivesSuccess,
  fetchEntitiesYearSuccess,
  fetchEntitiesMonthSuccess,
  fetchEntitiesMonthActivesSuccess,
  fetchEntitiesDaySuccess,
  fetchEntitiesDayActivesSuccess,
  fetchEntitiesHourSuccess,
  fetchEntitiesHourActivesSuccess

} from './actions';

import {
  FETCH_SALES_BY_YEAR,
  FETCH_SALES_BY_MONTH,
  FETCH_SALES_BY_DAY,
  FETCH_SALES_BY_HOUR,
  FETCH_CLIENTS_DATA,
  FETCH_PENDING_TASKS
  
} from './actionTypes';

import * as api from './api';


  function* fetchSalesByYear({ payload }) {
    const date = {
      dateFrom: moment().subtract(5, 'years').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD')
    }
  try {
    const response = yield call(api.getYearSales, date);
    const responseEntitiesOldNew = yield call(api.getClientsSubcriptions, date);
    const responseEntitiesActives = yield call(api.getClientsActives, date);
    const responseSubfamily = yield call(api.getSubfamiliesByYear, date);
    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }
    yield put(fetchSalesByYearSuccess({ year: response.data }));
    yield put(fetchEntitiesYearSuccess({ entityYear: responseEntitiesOldNew.data}));
    yield put(fetchEntitiesYearActivesSuccess({ entityActivesYear: responseEntitiesActives.data }));
    yield put(fetchSubfamilyYearSuccess({ subfamilyYear: responseSubfamily.data }));
  } catch (e) {
    console.error(e);
  }
}
export function* watchfetchSalesByYear() {
  yield takeLatest(FETCH_SALES_BY_YEAR, fetchSalesByYear);
}



function* fetchSalesByMonth({ payload }) {
  const date = {
    dateFrom: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD')
  }
try {
  const response = require('../../datamockup/dataMonth.json')
  const responseEntitiesNewOld = yield call(api.getClientsSubcriptions, date);
  const responseEntitiesActives = yield call(api.getClientsActives, date);
  const responseSubfamily = yield call(api.getSubfamiliesByYear, date);
  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
  yield put(fetchEntitiesMonthSuccess({ entityMonth: responseEntitiesNewOld.data }));
  yield put(fetchEntitiesMonthActivesSuccess({ entityActivesMonth: responseEntitiesActives.data }));
  yield put(fetchSubfamilyMonthSuccess({ subfamilyMonth: responseSubfamily.data }));
} catch (e) {
  console.error(e);
}
}
export function* watchfetchSalesByMonth() {
yield takeLatest(FETCH_SALES_BY_MONTH, fetchSalesByMonth);
}



function* fetchSalesByDay({ payload }) {
  const date = {
    dateFrom: moment().subtract(1, 'years').add(1, 'months').set({ day: 1 }).format('YYYY-MM-DD'),
    dateTo:  moment().format('YYYY-MM-DD')
  }
  const dateSubfamilies = {
    dateFrom: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    dateTo:  moment().format('YYYY-MM-DD')
  }
  
try {
 
  const response = yield call(api.getYearDaysSales, date);
  const responsefake = require('../../datamockup/dataYear.json')
  const responseEntitiesActives = yield call(api.getClientsActives, dateSubfamilies);
  const responseEntitiesNewOld = yield call(api.getClientsSubcriptions, dateSubfamilies);
  const responseSubfamily = yield call(api.getSubfamiliesByYear, dateSubfamilies);
  
  yield put(fetchSalesYearDaysSuccess({ daysYear: response.data }));
  yield put(fetchEntitiesDaySuccess({ entityDay: responseEntitiesNewOld.data }));
  yield put(fetchEntitiesDayActivesSuccess({ entityActivesDay: responseEntitiesActives.data }));
  yield put(fetchSubfamilyDaySuccess({ subfamilyDay: responseSubfamily.data }));
} catch (e) {
  console.error(e);
 
}
}
export function* watchfetchSalesByDay() {
yield takeLatest(FETCH_SALES_BY_DAY, fetchSalesByDay);
}




function* fetchSalesByHour({ payload }) {
  const date = {
    dateFrom: moment().subtract(2,'days').format('YYYY-MM-DD'),
    dateTo: moment().format('YYYY-MM-DD')
  }
  
try {
  let objectHour = {};
  const listHour = [];
  const response = yield call(api.getHourSales, date);
  const responseEntitiesNewOld = yield call(api.getClientsSubcriptions, date);
  const responseEntitiesActives = yield call(api.getClientsActives, date);
  const responseSubfamily = yield call(api.getSubfamiliesByYear, date);
  response.data.forEach( res => {
    if(res.hour.length<5){
      objectHour = {
        ...res,
        hour: "0"+res.hour  
      }
      listHour.push(objectHour)
    
      return listHour;
    }
    listHour.push(res);
    return listHour
  })
   
  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
  yield put(fetchSalesByHourSuccess({ hour: response.data }));
  yield put(fetchEntitiesHourSuccess({ entityHour: responseEntitiesNewOld.data }));
  yield put(fetchEntitiesHourActivesSuccess({ entityActivesHour: responseEntitiesActives.data }));
  yield put(fetchSubfamilyHourSuccess({ subfamilyHour: responseSubfamily.data }));
} catch (e) {
  yield put(fetchSalesByHourFail());
  console.error(e);
}
}
export function* watchfetchSalesByHour() {
yield takeLatest(FETCH_SALES_BY_HOUR, fetchSalesByHour);
}



function* fetchClientsData({ payload }) {
  
try {
  const response = require('../../datamockup/dataClients.json')
  const responseClientsActives = yield call(api.getClientsActivesByIntervals);
  const responseClientsInactives = yield call(api.getClientsInactivesByIntervals);
  //const responseClientsActives = require('../../datamockup/dataClientsActivity.json')
  //const responseClientsInactives = require('../../datamockup/dataClientsSales.json')
  
  
  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
    yield put(fetchClientsActivitySuccess({ clientsActivity: responseClientsActives.data }));
    yield put(fetchClientsSalesSuccess({ clientsSales: responseClientsInactives.data }));
} catch (e) {
  console.error(e);
}
}
export function* watchfetchClientsData() {
yield takeLatest(FETCH_CLIENTS_DATA, fetchClientsData);
}



function* fetchPendingTasks({ payload }) {
try {
  const response = require('../../datamockup/dataPendingTask.json');

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
    yield put(fetchPendingTasksSuccess({ task: response.data.data }));    
} catch (e) {
  console.error(e);
}
}
export function* watchfetchPendingTasks() {
yield takeLatest(FETCH_PENDING_TASKS, fetchPendingTasks);
}





