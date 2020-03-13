import { handleActions } from 'redux-actions';

import { 
  fetchSalesByYearSuccess, 
  //fetchSalesByMonthSuccess,
  //fetchSalesByDaySuccess,
  fetchSalesByHourSuccess,
  //fetchEntitiesSuccess,
  //fetchSubfamilySuccess,
  //fetchClientsDataSuccess,
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
  statusLineChart: STATUS.NOT_FETCHED_LINE_CHART,
  statusClients: STATUS.NOT_FETCHED_CLIENTS,
  statusSubfamily:  STATUS.NOT_FETCHED_SUBFAMILIES_CHART,
  statusClientsActive: STATUS.NOT_FETCHED_CLIENTS_ACTIVES_CHART,
  statusClientsInactive: STATUS.NOT_FETCHED_CLIENTS_INACTIVES_CHART,
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

    // [fetchSalesByMonthSuccess]: (state, { payload }) => ({
    //   ...state,
    //   monthList: payload.month,
    //   status: STATUS.FETCHED
    // }),

    // [fetchSalesByDaySuccess]: (state, { payload }) => ({
    //   ...state,
    //   dayList: payload.day,
    //   status: STATUS.FETCHED
    // }),
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
    // [fetchEntitiesSuccess]: (state, { payload }) => ({
    //   ...state,
    //   entitiesList: payload.entity,
    //   status: STATUS.FETCHED
    // }),
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
    // [fetchClientsDataSuccess]: (state, { payload }) => ({
    //   ...state,
    //   clientsData: payload.clients,
    //   status: STATUS.FETCHED
    // }),
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
    
    // [fetchSalesByDay]: (state, { payload }) => ({
    //   ...state,
    //   status: STATUS.FETCHING
    // }),
  },
  defaultState
);
