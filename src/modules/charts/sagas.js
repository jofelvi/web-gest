import { takeLatest, call, put } from 'redux-saga/effects';

import * as HttpStatus from 'http-status-codes'

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
  fetchPendingTasksSuccess
  // fetchOrdersFailed,
  // fetchOrderByIdSuccess,
  // fetchEntityByIdSuccess,
  // fetchClientByIdSuccess,
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
    console.log("hola soy el fetch de year")
  try {
    //const response = yield call(api.fetchSalesByYear, payload);
    const response = require('../../datamockup/dataYear.json')
    const responseEntities = require('../../datamockup/dataYearEntities.json')
    const responseSubfamily = require('../../datamockup/dataYearSubfamily.json')


    if (response.status === HttpStatus.UNAUTHORIZED) {
      payload.history.push('/login');
    }

    yield put(fetchSalesByYearSuccess({ year: response.data.data }));
    yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
    yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));


  } catch (e) {
    console.error(e);
    //yield put(fetchOrdersFailed());
  }
}
export function* watchfetchSalesByYear() {
  yield takeLatest(FETCH_SALES_BY_YEAR, fetchSalesByYear);
}


function* fetchSalesByMonth({ payload }) {
  console.log("hola soy el fetch de month")
try {
  //const response = yield call(api.fetchSalesByYear, payload);
  const response = require('../../datamockup/dataMonth.json')
  const responseEntities = require('../../datamockup/dataMonthEntities.json')
  const responseSubfamily = require('../../datamockup/dataMonthSubfamily.json')

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }

  yield put(fetchSalesByMonthSuccess({ month: response.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));

  //yield put(fetchEntitiesByMonthSuccess({ entityDay: responseEntities.data.data }));

} catch (e) {
  console.error(e);
  //yield put(fetchOrdersFailed());
}
}
export function* watchfetchSalesByMonth() {
yield takeLatest(FETCH_SALES_BY_MONTH, fetchSalesByMonth);
}


function* fetchSalesByDay({ payload }) {
  console.log("hola soy el fetch de day")
try {
  //const response = yield call(api.fetchSalesByYear, payload);
  const response = require('../../datamockup/dataDay.json')
  const responseEntities = require('../../datamockup/dataDayEntities.json')
  const responseSubfamily = require('../../datamockup/dataDaySubfamily.json')

  

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }

  yield put(fetchSalesByDaySuccess({ day: response.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));


} catch (e) {
  console.error(e);
  //yield put(fetchOrdersFailed());
}
}
export function* watchfetchSalesByDay() {
yield takeLatest(FETCH_SALES_BY_DAY, fetchSalesByDay);
}



function* fetchSalesByHour({ payload }) {
  console.log("hola soy el fetch de hour")
try {
  //const response = yield call(api.fetchSalesByYear, payload);
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
  //yield put(fetchOrdersFailed());
}
}
export function* watchfetchSalesByHour() {
yield takeLatest(FETCH_SALES_BY_HOUR, fetchSalesByHour);
}

function* fetchClientsData({ payload }) {
  console.log("hola soy el fetch CLIENTS")
try {
  //const response = yield call(api.fetchSalesByYear, payload);
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
  //yield put(fetchOrdersFailed());
}
}
export function* watchfetchClientsData() {
yield takeLatest(FETCH_CLIENTS_DATA, fetchClientsData);
}

function* fetchPendingTasks({ payload }) {
  console.log("hola soy el fetch TAK")
try {
  //const response = yield call(api.fetchSalesByYear, payload);
  const response = require('../../datamockup/dataPendingTask.json')
  

  

  if (response.status === HttpStatus.UNAUTHORIZED) {
    payload.history.push('/login');
  }

    yield put(fetchPendingTasksSuccess({ task: response.data.data }));
    


} catch (e) {
  console.error(e);
  //yield put(fetchOrdersFailed());
}
}
export function* watchfetchPendingTasks() {
yield takeLatest(FETCH_PENDING_TASKS, fetchPendingTasks);
}





