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
  fetchEntitiesYearActivesSuccess,
  fetchEntitiesMonthSuccess,
  fetchEntitiesMonthActivesSuccess,
  fetchEntitiesDaySuccess,
  fetchEntitiesDayActivesSuccess,
  fetchEntitiesHourSuccess,
  fetchEntitiesHourActivesSuccess

} from './actions';
import {STATUS} from './constants'
const defaultState = {
  list: [],
  status: STATUS.NOT_FETCHED,
  subfamiliesList: [],
  subfamilyYear: [],
  subfamilyMonth: [],
  subfamilyDay: [],
  subfamilyHour: [],
  year: [],
  daysYear: [],
  hour: []
};

export default handleActions(
  {
   
    [fetchSalesByYearSuccess]: (state, { payload }) => ({
      ...state,
      yearList: payload.year,
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
    }),

    [fetchSalesByHourSuccess]: (state, { payload }) => ({
      ...state,
      hourList: payload.hour,
    }),
    [fetchEntitiesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesList: payload.entity
    }),
    [fetchEntitiesYearSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearList: payload.entityYear,
      status: STATUS.FETCHED
  
    }),
    [fetchEntitiesYearActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearActivesList: payload.entityActivesYear
    }),
    [fetchEntitiesMonthSuccess]: (state, { payload }) => ({
      ...state,
      entitiesMonthList: payload.entityMonth
    }),
    [fetchEntitiesMonthActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesMonthActivesList: payload.entityActivesMonth
    }),
    [fetchEntitiesDaySuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayList: payload.entityDay
    }),
    [fetchEntitiesDayActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayActivesList: payload.entityActivesDay
    }),
    [fetchEntitiesHourSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourList: payload.entityHour
    }),
    [fetchEntitiesHourActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourActivesList: payload.entityActivesHour
    }),
    
    [fetchSubfamilyYearSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListYear: payload.subfamilyYear,
      status: STATUS.FETCHED
    }),
    [fetchSubfamilyMonthSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListMonth: payload.subfamilyMonth,
     
    }),
    [fetchSubfamilyDaySuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListDay: payload.subfamilyDay,
   
    }),
    [fetchSubfamilyHourSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListHour: payload.subfamilyHour,
   
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
