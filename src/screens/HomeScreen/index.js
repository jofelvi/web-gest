import { connect } from 'react-redux';

import * as moment from 'moment';

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';

const startDate = moment();
const startDateMonthYear = startDate.format("YYYY-MM-DD") //this will only format data to "YYYY-MM" to filter by month but now we have no enough data on real time so in order to test it we need data from past time.
const listOfDates = [startDateMonthYear];
const listOfMonths = [startDateMonthYear];
const monthNames = ["En", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Agt", "Set", "Oct", "Nov", "Dic"
]
//const startDateMonthYear = startDate.subtract(1, 'years').format("YYYY-MM")

//console.log("list day", list.day.startsWith(startDate.format("YYYY-MM")) )


const creatingDaysList = (accumulator, currentValue) => {
  accumulator.forEach(acc => {
    if (accumulator.length < 7) {
      return accumulator.push(currentValue.subtract(1, 'days').format().split("T")[0])
    }
  })
  return accumulator
};

const filterByMonth = (yearDaysListToFilter) => {
  return yearDaysListToFilter.filter(list => list.day.startsWith('2020-02'))
}

const getMonths = (dayList) => {
  if (!dayList || !dayList.length) {
    return [];
  }
  const monthsList = dayList.reduce((acc, value) => {

    const month = new Date(value.day).getMonth();
    if (!acc[month]) {
      return { ...acc, [month]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
    }
    return { ...acc, [month]: { totalnumero: value.totalnumero + acc[month].totalnumero, totalpvm: value.totalpvm + acc[month].totalpvm } }
  }, {});
  return Object.keys(monthsList).map(month => ({ month: monthNames[month], ...monthsList[month] }));
}

const getHours = (hourList) => {
  if (!hourList || !hourList.length) {
    return [];
  }
  const hourAddedList = hourList.reduce((acc, value) => {

    if (!acc[value.hour]) {
      return { ...acc, [value.hour]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
    }

    return { ...acc, [value.hour]: { totalnumero: value.totalnumero + acc[value.hour].totalnumero, totalpvm: value.totalpvm + acc[value.hour].totalpvm } }
  }, {})
  return Object.keys(hourAddedList).map(hour => ({ hour: hour, ...hourAddedList[hour] }));

}

const getLast7DaysList = (yearDaysList) => {
  const listOfSevenDays = []
  if (listOfDates) {
    creatingDaysList(listOfDates, startDate);
  }
  if (yearDaysList && listOfDates) {
    const filteredByMonth = filterByMonth(yearDaysList)
    listOfDates.forEach(objDay => {
      filteredByMonth.filter(m => {
        if (m.day === objDay) {
          return listOfSevenDays.push(m);
        }
      })
    })

    return listOfSevenDays
  }
}


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
    monthsList: getMonths(state.charts.yearDaysList),
    hourList: getHours(state.charts.hourList),
    entitiesList: state.charts.entitiesList,
    subfamiliesList: state.charts.subfamiliesList,
    clientsData: state.charts.clientsData,
    clientsDataActivity: state.charts.clientsDataActivity,
    clientsDataSales: state.charts.clientsDataSales,
    pendingTasks: state.charts.pendingTasks,
  }),
  { fetchTaskForm, fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks }
)(View);
