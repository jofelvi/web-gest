import { connect } from 'react-redux';

import * as moment from 'moment';

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';

const startDate = moment();
const listOfDates = [startDate.format().split("T")[0]];
const startDateMonthYear = startDate.subtract(1, 'years').format("YYYY-MM")
//console.log("list day", list.day.startsWith(startDate.format("YYYY-MM")) )
const getMonthList = (yearDaysList) => {
  // procesamos yearList para que coja los 30 dias del mes desde hoy
}

const creatingDaysList = (accumulator, currentValue) => {
  accumulator.forEach(acc => {
    if (accumulator.length < 6) {
      return accumulator.push(currentValue.subtract(1, 'days').format().split("T")[0])
    }
  })
  return accumulator
};

const getLast7DaysList = (yearDaysList) => {
  if(listOfDates){
    creatingDaysList(listOfDates, startDate);

  }
  
  if(yearDaysList){
 const filteredByMonth =  yearDaysList.filter(list =>list.day.startsWith('2019-11'))
const tempArray =  listOfDates.filter( filterDay =>{
 //console.log(filterDay)
   return !filteredByMonth.includes(filterDay);
})
//console.log("Temp array", tempArray);
}
  
   

  }
  //procesamos yearList para que coja los 7 dias desde hoy
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
  { fetchTaskForm, fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks }
)(View);
