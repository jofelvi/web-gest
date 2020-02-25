import { connect } from 'react-redux';

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';

export default connect(
  state => ({
    process: state.forms.process,
    procId: state.forms.procId,
    taskName: state.forms.taskName,
    taskId: state.forms.taskId,
    completed: state.forms.completed,
    yearList: state.charts.yearList,
    monthList: state.charts.monthList,
    dayList: state.charts.dayList,
    hourList: state.charts.hourList,
    entitiesList: state.charts.entitiesList,
    subfamiliesList: state.charts.subfamiliesList,
    clientsData: state.charts.clientsData,
    clientsDataActivity: state.charts.clientsDataActivity,
    clientsDataSales: state.charts.clientsDataSales,
    pendingTasks: state.charts.pendingTasks,
  }),
  { fetchTaskForm , fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks }
)(View);
