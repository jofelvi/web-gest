import { connect } from 'react-redux';

import * as moment from 'moment';

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';
const getMonthList = (yearDaysList) => {
  // procesamos yearList para que coja los 30 dias del mes desde hoy
  }
  
  const getLast7DaysList = (yearDaysList) => {
    const startDate = moment();
   const endDate = startDate.add(6, 'days');
   const range = endDate.diff(startDate, 'days');
   return yearDaysList;
   // const range = moment().range(startDate, endDate);
    //console.log("Start date", startDate);
    //console.log("End date", endDate);
    //console.log("Range", range);
    //console.log("RANGE", range);
    //return yearDaysList;
    //procesamos yearList para que coja los 7 dias desde hoy
  }
  //ASI PASA EN EL STATE
  // monthList: getMonthList(state.charts.yearDaysList),
  //     dayList: getLast7DaysList(state.charts.yearDaysList),

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
    daysList: getLast7DaysList(state.charts.yearDaysList),
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
