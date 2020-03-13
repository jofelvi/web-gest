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
      statusLineChart: STATUS.FETCHED
    }),

    [fetchSalesByHourSuccess]: (state, { payload }) => ({
      ...state,
      hourList: payload.hour,
      statusLineChart: STATUS.FETCHED
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
      statusClients: STATUS.FETCHED

    }),
    [fetchEntitiesMonthActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesMonthActivesList: payload.entityActivesMonth,
      statusClients: STATUS.FETCHED

    }),
    [fetchEntitiesDaySuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayList: payload.entityDay,
      statusClients: STATUS.FETCHED

    }),
    [fetchEntitiesDayActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesDayActivesList: payload.entityActivesDay,
      statusClients: STATUS.FETCHED

    }),
    [fetchEntitiesHourSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourList: payload.entityHour,
      statusClients: STATUS.FETCHED

    }),
    [fetchEntitiesHourActivesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesHourActivesList: payload.entityActivesHour,
      statusClients: STATUS.FETCHED

    }),
    
    [fetchSubfamilyYearSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListYear: payload.subfamilyYear,
      statusSubfamily: STATUS.FETCHED
    }),
    [fetchSubfamilyMonthSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListMonth: payload.subfamilyMonth,
      statusSubfamily: STATUS.FETCHED
    }),
    [fetchSubfamilyDaySuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListDay: payload.subfamilyDay,
      statusSubfamily: STATUS.FETCHED
   
    }),
    [fetchSubfamilyHourSuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesListHour: payload.subfamilyHour,
      statusSubfamily: STATUS.FETCHED
   
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
      //status: STATUS.FETCHED
    }),
    [fetchSalesByHourFail]: (state, { payload }) => ({
      ...state,
      status: STATUS.FETCHED_FAIL
    }),
    
  },
  defaultState
);
