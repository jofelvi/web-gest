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
  fetchSalesYearDaysSuccess,
  fetchSalesByHourFail
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
 
  const date = {
    dateFrom: moment().subtract(1, 'year').format('YYYY-MM-DD'),
    dateTo:  moment().format('YYYY-MM-DD')
  }
  const response = yield call(api.getYearDaysSales, date);
  const responsefake = require('../../datamockup/dataYear.json')
  const responseEntities = require('../../datamockup/dataDayEntities.json')
  const responseSubfamily = require('../../datamockup/dataDaySubfamily.json')
  console.log("days",response.data)
  // if (response.status === HttpStatus.UNAUTHORIZED) {
  //   payload.history.push('/login');
  // }
  yield put(fetchSalesYearDaysSuccess({ daysYear: response.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
} catch (e) {
  yield put(fetchSalesByHourFail());
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
  const responseFake = require('../../datamockup/dataHour.json')
  const responseEntities = require('../../datamockup/dataHourEntities.json')
  const responseSubfamily = require('../../datamockup/dataHourSubfamily.json')

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
  yield put(fetchSalesByHourSuccess({ hour: responseFake.data.data }));
  yield put(fetchEntitiesSuccess({ entity: responseEntities.data.data }));
  yield put(fetchSubfamilySuccess({ subfamily: responseSubfamily.data.data }));
} catch (e) {
  //yield put(fetchSalesByHourFail());
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





