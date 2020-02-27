import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'
import * as moment from 'moment';

import {
 
  fetchSalesByYearSuccess,
  fetchSalesByMonthSuccess,
  fetchSalesByDaySuccess,
  fetchSalesByHourSuccess,
  fetchEntitiesSuccess,
  fetchSubfamilySuccess,
  fetchClientsDataSuccess,
  fetchClientsActivitySuccess,
  fetchClientsSalesSuccess,
  fetchPendingTasksSuccess,
  fetchSalesYearDaysSuccess
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
      dateFrom: '2015-02-25',
      dateTo: '2020-02-25'
    }
  try {
    const response = yield call(api.getYearSales, date);
    const responseEntities = require('../../datamockup/dataYearEntities.json')
    const responseSubfamily = require('../../datamockup/dataYearSubfamily.json')
    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }
    yield put(fetchSalesByYearSuccess({ year: response.data }));
    yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
    yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
  } catch (e) {
    console.error(e);
  }
}
export function* watchfetchSalesByYear() {
  yield takeLatest(FETCH_SALES_BY_YEAR, fetchSalesByYear);
}



function* fetchSalesByMonth({ payload }) {
try {
  const response = require('../../datamockup/dataMonth.json')
  const responseEntities = require('../../datamockup/dataMonthEntities.json')
  const responseSubfamily = require('../../datamockup/dataMonthSubfamily.json')

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
  yield put(fetchSalesByMonthSuccess({ month: response.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
} catch (e) {
  console.error(e);
}
}
export function* watchfetchSalesByMonth() {
yield takeLatest(FETCH_SALES_BY_MONTH, fetchSalesByMonth);
}



function* fetchSalesByDay({ payload }) {
 
try {
  let listDay= [];
  let objectDay = {}
  const responseFake = require('../../datamockup/dataYearDays.json')
  const response = require('../../datamockup/dataDay.json')
  const responseEntities = require('../../datamockup/dataDayEntities.json')
  const responseSubfamily = require('../../datamockup/dataDaySubfamily.json')

    responseFake.data.data.forEach( res => {
  objectDay = {
    ...res,
    day: res.day.split('-')[0]+"-"+res.day.split('-')[1]+"-"+res.day.split('-')[2].split('T')[0],
    
  }
  listDay.push(objectDay)
 
  return listDay
    })
    //console.log(listDay)
  
  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
  yield put(fetchSalesYearDaysSuccess({ daysYear: listDay }));
  yield put(fetchSalesByDaySuccess({ day: response.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
} catch (e) {
  console.error(e);
 
}
}
export function* watchfetchSalesByDay() {
yield takeLatest(FETCH_SALES_BY_DAY, fetchSalesByDay);
}



function* fetchSalesByHour({ payload }) {

try {
  const response = require('../../datamockup/dataHour.json')
  const responseEntities = require('../../datamockup/dataHourEntities.json')
  const responseSubfamily = require('../../datamockup/dataHourSubfamily.json')

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
  yield put(fetchSalesByHourSuccess({ hour: response.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
} catch (e) {
  console.error(e);
}
}
export function* watchfetchSalesByHour() {
yield takeLatest(FETCH_SALES_BY_HOUR, fetchSalesByHour);
}



function* fetchClientsData({ payload }) {
  
try {
  const response = require('../../datamockup/dataClients.json')
  const responseClientsActivity = require('../../datamockup/dataClientsActivity.json')
  const responseClientsSales = require('../../datamockup/dataClientsSales.json')

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }
    yield put(fetchClientsDataSuccess({ clients: response.data.data }));
    yield put(fetchClientsActivitySuccess({ clientsActivity: responseClientsActivity.data.data }));
    yield put(fetchClientsSalesSuccess({ clientsSales: responseClientsSales.data.data }));
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





