import { createActions } from 'redux-actions';

import {
  FETCH_SALES_BY_YEAR,
  FETCH_SALES_BY_MONTH,
  FETCH_SALES_BY_DAY,
  FETCH_SALES_BY_HOUR,
  FETCH_SALES_BY_YEAR_SUCCESS,
  FETCH_SALES_BY_MONTH_SUCCESS,
  FETCH_SALES_BY_DAY_SUCCESS,
  FETCH_SALES_BY_HOUR_SUCCESS,
  FETCH_ENTITIES_SUCCESS,
  FETCH_SUBFAMILY_SUCCESS,
  FETCH_CLIENTS_DATA,
  FETCH_CLIENTS_DATA_SUCCESS,
  FETCH_CLIENTS_SALES_SUCCESS,
  FETCH_CLIENTS_ACTIVITY_SUCCESS,
  FETCH_PENDING_TASKS,
  FETCH_PENDING_TASKS_SUCCESS,
  FETCH_SALES_YEAR_DAYS_SUCCESS,
  FETCH_SALES_BY_HOUR_FAIL,
  FETCH_SUBFAMILY_YEAR_SUCCESS,
  FETCH_SUBFAMILY_MONTH_SUCCESS,
  FETCH_SUBFAMILY_DAY_SUCCESS,
  FETCH_SUBFAMILY_HOUR_SUCCESS,
  FETCH_ENTITIES_YEAR_SUCCESS,
  FETCH_ENTITIES_YEAR_ACTIVES_SUCCESS,
  FETCH_ENTITIES_MONTH_SUCCESS,
  FETCH_ENTITIES_MONTH_ACTIVES_SUCCESS,
  FETCH_ENTITIES_DAY_ACTIVES_SUCCESS,
  FETCH_ENTITIES_DAY_SUCCESS,
  FETCH_ENTITIES_HOUR_ACTIVES_SUCCESS,
  FETCH_ENTITIES_HOUR_SUCCESS,
  CHANGE_TIME_PERIOD,
  CHANGE_MEASURING_UNIT,

} from './actionTypes';

export const {
  fetchSalesByYear,
  fetchSalesByMonth,
  fetchSalesByDay,
  fetchSalesByHour,
  fetchSalesByYearSuccess,
  fetchSalesByMonthSuccess,
  fetchSalesByDaySuccess,
  fetchSalesByHourSuccess,
  fetchEntitiesSuccess,
  fetchSubfamilySuccess,
  fetchClientsData,
  fetchClientsDataSuccess,
  fetchClientsSalesSuccess,
  fetchClientsActivitySuccess,
  fetchPendingTasks,
  fetchPendingTasksSuccess,
  fetchSalesYearDaysSuccess,
  fetchSalesByHourFail,
  fetchSubfamilyYearSuccess,
  fetchSubfamilyMonthSuccess,
  fetchSubfamilyDaySuccess,
  fetchSubfamilyHourSuccess,
  fetchEntitiesYearSuccess,
  fetchEntitiesYearActivesSuccess,
  fetchEntitiesMonthSuccess,
  fetchEntitiesMonthActivesSuccess,
  fetchEntitiesDaySuccess,
  fetchEntitiesDayActivesSuccess,
  fetchEntitiesHourSuccess,
  fetchEntitiesHourActivesSuccess,
  changeTimePeriod,
  changeMeasuringUnit
} = createActions(
  FETCH_SALES_BY_YEAR,
  FETCH_SALES_BY_MONTH,
  FETCH_SALES_BY_DAY,
  FETCH_SALES_BY_HOUR,
  FETCH_SALES_BY_YEAR_SUCCESS,
  FETCH_SALES_BY_MONTH_SUCCESS,
  FETCH_SALES_BY_DAY_SUCCESS,
  FETCH_SALES_BY_HOUR_SUCCESS,
  FETCH_SALES_BY_HOUR_FAIL,
  FETCH_ENTITIES_SUCCESS,
  FETCH_ENTITIES_YEAR_SUCCESS,
  FETCH_ENTITIES_MONTH_SUCCESS,
  FETCH_ENTITIES_YEAR_ACTIVES_SUCCESS,
  FETCH_ENTITIES_MONTH_ACTIVES_SUCCESS,
  FETCH_SUBFAMILY_SUCCESS,
  FETCH_CLIENTS_DATA,
  FETCH_CLIENTS_DATA_SUCCESS,
  FETCH_CLIENTS_SALES_SUCCESS,
  FETCH_CLIENTS_ACTIVITY_SUCCESS,
  FETCH_PENDING_TASKS,
  FETCH_PENDING_TASKS_SUCCESS,
  FETCH_SALES_YEAR_DAYS_SUCCESS,
  FETCH_SALES_BY_HOUR_SUCCESS,
  FETCH_SALES_BY_HOUR_FAIL,
  FETCH_SUBFAMILY_YEAR_SUCCESS,
  FETCH_SUBFAMILY_MONTH_SUCCESS,
  FETCH_SUBFAMILY_DAY_SUCCESS,
  FETCH_SUBFAMILY_HOUR_SUCCESS,
  FETCH_ENTITIES_DAY_ACTIVES_SUCCESS,
  FETCH_ENTITIES_DAY_SUCCESS,
  FETCH_ENTITIES_HOUR_ACTIVES_SUCCESS,
  FETCH_ENTITIES_HOUR_SUCCESS,
  CHANGE_TIME_PERIOD,
  CHANGE_MEASURING_UNIT,
);
