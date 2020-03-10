import { handleActions } from 'redux-actions';

import { 
  fetchSalesByYearSuccess, 
  fetchSalesByMonthSuccess,
  fetchSalesByDaySuccess,
  fetchSalesByHourSuccess,
  fetchEntitiesSuccess,
  fetchSubfamilySuccess,
  fetchClientsDataSuccess,
  fetchClientsSalesSuccess,
  fetchClientsActivitySuccess,
  fetchPendingTasksSuccess,
  fetchSalesYearDaysSuccess,
  fetchSalesByHourFail,
  fetchSubfamilyMonthSuccess,
  fetchSubfamilyYearSuccess,
  fetchSubfamilyDaySuccess,
  fetchSubfamilyHourSuccess,
  fetchEntitiesYearSuccess,
  fetchEntitiesYearActivesSuccess

} from './actions';
import {STATUS} from './constants'
const defaultState = {
  list: [],
  status: STATUS.NOT_FETCHED,
  subfamiliesList: [],
  subfamilyYear: [],
  subfamilyMonth: [],
  subfamilyDay: [],
  subfamilyHour: []
};

export default handleActions(
  {
   
    [fetchSalesByYearSuccess]: (state, { payload }) => ({
      ...state,
      yearList: payload.year,
      status: STATUS.FETCHED
    }),

    [fetchSalesByMonthSuccess]: (state, { payload }) => ({
      ...state,
      monthList: payload.month
    }),

    [fetchSalesByDaySuccess]: (state, { payload }) => ({
      ...state,
      dayList: payload.day
    }),
    [fetchSalesYearDaysSuccess]: (state, { payload }) => ({
      ...state,
      yearDaysList: payload.daysYear,
      status: STATUS.FETCHED
    }),

    [fetchSalesByHourSuccess]: (state, { payload }) => ({
      ...state,
      hourList: payload.hour,
      status: STATUS.FETCHED
    }),
    [fetchEntitiesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesList: payload.entity
    }),
    [fetchEntitiesYearSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearList: payload.entityYear
    }),
    [fetchEntitiesYearActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearActivesList: payload.entityActivesYear
    }),
    
    [fetchSubfamilyYearSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListYear: payload.subfamilyYear,
      status: STATUS.FETCHED
    }),
    [fetchSubfamilyMonthSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListMonth: payload.subfamilyMonth,
      // status: STATUS.FETCHED_PIE
    }),
    [fetchSubfamilyDaySuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListDay: payload.subfamilyDay,
      // status: STATUS.FETCHED_PIE,
    }),
    [fetchSubfamilyHourSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListHour: payload.subfamilyHour,
      // status: STATUS.FETCHED_PIE
    }),
    [fetchClientsDataSuccess]: (state, { payload }) => ({
      ...state,
      clientsData: payload.clients
    }),
    [fetchClientsActivitySuccess]: (state, { payload }) => ({
      ...state,
      clientsDataActivity: payload.clientsActivity
    }),
    [fetchClientsSalesSuccess]: (state, { payload }) => ({
      ...state,
      clientsDataSales: payload.clientsSales
    }),
    [fetchPendingTasksSuccess]: (state, { payload }) => ({
      ...state,
      pendingTasks: payload.task
    }),
    [fetchSalesByHourFail]: (state, { payload }) => ({
      ...state,
      status: STATUS.FETCHED_FAIL
    }),
    
    // [fetchSalesByDay]: (state, { payload }) => ({
    //   ...state,
    //   status: STATUS.FETCHING
    // }),
  },
  defaultState
);
