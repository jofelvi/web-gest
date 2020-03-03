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
  fetchSalesYearDaysSuccess
} from './actions';

const defaultState = {
  list: []
};

export default handleActions(
  {
    [fetchSalesByYearSuccess]: (state, { payload }) => ({
      ...state,
      yearList: payload.year
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
      yearDaysList: payload.daysYear
    }),

    [fetchSalesByHourSuccess]: (state, { payload }) => ({
      ...state,
      hourList: payload.hour
    }),
    [fetchEntitiesSuccess]: (state, { payload }) => ({
      ...state,
      entitiesList: payload.entity
    }),
    [fetchSubfamilySuccess]: (state, { payload }) => ({
      ...state,
      subfamiliesList: payload.subfamily
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
    
  },
  defaultState
);
