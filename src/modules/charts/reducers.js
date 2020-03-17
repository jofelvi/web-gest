import { handleActions } from 'redux-actions';

import { 
  fetchSalesByYearSuccess, 
  fetchSalesByHourSuccess,
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
  statusLineChart: STATUS.NOT_FETCHED,
  statusClients: STATUS.NOT_FETCHED,
  statusSubfamily:  STATUS.NOT_FETCHED,
  statusClientsActive: STATUS.NOT_FETCHED,
  statusClientsInactive: STATUS.NOT_FETCHED,
  subfamiliesList: [],
  subfamilyYear: [],
  subfamilyMonth: [],
  subfamilyDay: [],
  subfamilyHour: [],
  year: [],
  daysYear: [],
  hour: [],
  clientsActivity: [],
  clientsSales: [],
  entityYear: [],
  entityActivesYear: [],
  entityMonth: [],
  entityDay: [],
  entityActivesDay: [],
  entityHour: []

};

export default handleActions(
  {
   
    [fetchSalesByYearSuccess]: (state, { payload }) => ({
      ...state,
      yearList: payload.year,
      statusLineChart: STATUS.FETCHED
    }),

    [fetchSalesYearDaysSuccess]: (state, { payload }) => ({
      ...state,
      yearDaysList: payload.daysYear,
    }),

    [fetchSalesByHourSuccess]: (state, { payload }) => ({
      ...state,
      hourList: payload.hour,
    }),
    
    [fetchEntitiesYearSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearList: payload.entityYear,
      statusClients: STATUS.FETCHED
  
    }),

    [fetchEntitiesYearActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesYearActivesList: payload.entityActivesYear,
      statusClients: STATUS.FETCHED
    }),

    [fetchEntitiesMonthSuccess]: (state, { payload }) => ({
      ...state,
      entitiesMonthList: payload.entityMonth,
    }),

    [fetchEntitiesMonthActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesMonthActivesList: payload.entityActivesMonth,
    }),

    [fetchEntitiesDaySuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayList: payload.entityDay,
    }),

    [fetchEntitiesDayActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayActivesList: payload.entityActivesDay,
    }),

    [fetchEntitiesHourSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourList: payload.entityHour,
    }),

    [fetchEntitiesHourActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourActivesList: payload.entityActivesHour,
    }),
    
    [fetchSubfamilyYearSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListYear: payload.subfamilyYear,
      statusSubfamily: STATUS.FETCHED
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
   
    [fetchClientsActivitySuccess]: (state, { payload }) => ({
      ...state,
      clientsDataActivity: payload.clientsActivity,
      statusClientsActive: STATUS.FETCHED
    }),

    [fetchClientsSalesSuccess]: (state, { payload }) => ({
      ...state,
      clientsDataSales: payload.clientsSales,
      statusClientsInactive: STATUS.FETCHED
    }),

    [fetchPendingTasksSuccess]: (state, { payload }) => ({
      ...state,
      pendingTasks: payload.task,
    }),

    [fetchSalesByHourFail]: (state, { payload }) => ({
      ...state,
      status: STATUS.FETCHED_FAIL
    }),
    
  },
  defaultState
);
