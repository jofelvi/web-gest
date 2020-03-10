import { connect } from 'react-redux';
import { startDate, listOfDates, monthNames, startDateDay, listOfYears } from './constants'
import { sortingYears, sortingDays, generateDays, generateHours, sortingHours, generateSevenDays, groupHoursByDay, generateYears, groupHoursByYear }from './utils_date'
import * as moment from 'moment';

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';



const getYears = (yearList = [], hourList) => {
  if (!yearList ) {
    return [];
  }
  return sortingYears([groupHoursByYear(hourList),...generateYears()].map(value => {
    const yearFromList = yearList.find(valueDay => valueDay.year === value.year)
    if (!yearFromList) {
      return value;
    }
    return yearFromList ;
  })) 
};

const getSevenDays = (dayList = [], hourList) => {
  if (!dayList) {
    return [];
  }
  return [groupHoursByDay(hourList), ...generateSevenDays()].map(value => {
    const dayFromList = dayList.find(valueDay => valueDay.day === value.day)
    if (!dayFromList) {
      return value;
    }
    return dayFromList;
  })
};

const getMonths = (dayList = [], hourList ) => {
  if (!dayList) {
    return [];
  }
  
  const monthsList = sortingDays([...dayList,groupHoursByDay(hourList), ...generateDays()]).reduce((acc, value) => {
    const month = new Date(value.day).getMonth();
    if (!acc[monthNames[month]]) {
      return { ...acc, [monthNames[month]]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
    }
    return { ...acc, [monthNames[month]]: { totalnumero: Math.round(value.totalnumero + acc[monthNames[month]].totalnumero),totalpvm: Math.round(value.totalpvm + acc[monthNames[month]].totalpvm) } }
  }, {});
  return Object.keys(monthsList).map(month => ({ month, ...monthsList[month] }));
};

const getHours = (hourList = []) => {
  if (!hourList) {
    return [];
  }
  const hourAddedList = sortingHours([...hourList, ...generateHours(new Date().getHours() + 1)]).reduce((acc, value) => {
    if (value.hour) {
      return { ...acc, [value.hour]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
        
    }
  }, {})
  return Object.keys(hourAddedList).map(hour => ({ hour: hour, ...hourAddedList[hour] }));
};

export default connect(
  state => ({
    fetchState: state.charts.status,
    process: state.forms.process,
    procId: state.forms.procId,
    taskName: state.forms.taskName,
    taskId: state.forms.taskId,
    completed: state.forms.completed,
    yearList: getYears(state.charts.yearList),
    monthList: state.charts.monthList,
    dayList: state.charts.dayList,
    daysList: getSevenDays(state.charts.yearDaysList, state.charts.hourList),
    monthsList: getMonths(state.charts.yearDaysList, state.charts.hourList),
    hourList: getHours(state.charts.hourList),
    entitiesYearList: state.charts.entitiesYearList,
    entitiesYearActivesList: state.charts.entitiesYearActivesList,
    entitiesMonthList: state.charts.entitiesMonthList,
    entitiesMonthActivesList: state.charts.entitiesMonthActivesList,
    entitiesDayList: state.charts.entitiesDayList,
    entitiesDayActivesList: state.charts.entitiesDayActivesList,
    entitiesHourList: state.charts.entitiesHourList,
    entitiesHourActivesList: state.charts.entitiesHourActivesList,
    subfamiliesList: state.charts.subfamiliesList,
    subfamiliesListYear: state.charts.subfamiliesListYear,
    subfamiliesListMonth: state.charts.subfamiliesListMonth,
    subfamiliesListDay: state.charts.subfamiliesListDay,
    subfamiliesListHour: state.charts.subfamiliesListHour,
    clientsData: state.charts.clientsData,
    clientsDataActivity: state.charts.clientsDataActivity,
    clientsDataSales: state.charts.clientsDataSales,
    pendingTasks: state.charts.pendingTasks,
  }),
  { fetchTaskForm, fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks }
)(View);
