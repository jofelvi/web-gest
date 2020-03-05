import { connect } from 'react-redux';
import { startDate, listOfDates, monthNames, startDateDay, listOfYears } from './constants'
import { sortingYears, sortingDays, generateDays, generateHours, sortingHours }from './utils_date'

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';



const creatingDaysList = (accumulator, currentValue) => {
  accumulator.forEach(acc => {

    if (accumulator.length < 7) {
      return accumulator.push(currentValue.subtract(1, 'days').format('YYYY-MM-DD'));
    }  return accumulator
  })

  return accumulator
};

const creatingYearList = (accumulator, currentValue) => {

  accumulator.forEach(acc => {

    if (accumulator.length < 5) {
      return accumulator.push(currentValue.subtract(1, 'year').format('YYYY'));
    }  return accumulator
  })
   
  return accumulator
};

const getMonths = (dayList) => {
  if (!dayList || !dayList.length) {
    return [];
  }
  const monthsList = sortingDays([...dayList, ...generateDays()]).reduce((acc, value) => {
    const month = new Date(value.day).getMonth();
    if (!acc[monthNames[month]]) {
      return { ...acc, [monthNames[month]]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
    }
    return { ...acc, [monthNames[month]]: { totalnumero: Math.round(value.totalnumero + acc[monthNames[month]].totalnumero),totalpvm: Math.round(value.totalpvm + acc[monthNames[month]].totalpvm) } }
  }, {});
  return Object.keys(monthsList).map(month => ({ month, ...monthsList[month] }));
};

const getHours = (hourList) => {
  
  if (!hourList || !hourList.length) {
    return [];
  }

  const hourAddedList = sortingHours([...hourList, ...generateHours(new Date().getHours() + 1)]).reduce((acc, value) => {
    
    if (value.hour) {
      return { ...acc, [value.hour]: { totalnumero: value.totalnumero, totalpvm: value.totalpvm } }
        
    }
  }, {})
  return Object.keys(hourAddedList).map(hour => ({ hour: hour, ...hourAddedList[hour] }));

};

const getLast7DaysList = (yearDaysList) => {

  let daysOnTheList;
  const listDaysWithData = [];
  const listOfSevenDays = []
  let objDia = {};

  if (listOfDates) {
    daysOnTheList = creatingDaysList(listOfDates, startDateDay);
  }

  const cloneDaysOnTheList = [...daysOnTheList]

  if (yearDaysList && daysOnTheList) {
    if(listOfSevenDays.length < 7){
      daysOnTheList.map(date => {
        yearDaysList.filter(days => {   
          if(days.day === date){
            cloneDaysOnTheList.splice(cloneDaysOnTheList.indexOf(date),1);
            return listDaysWithData.push(days);
          }
    return listDaysWithData;
        })  
      });
 
    cloneDaysOnTheList.forEach((noDataDay) =>{
      objDia = {day: noDataDay, totalnumero: 0, totalpvm: 0  }
      return listDaysWithData.push(objDia);    
    })
  }
 
}
  sortingDays(listDaysWithData)
  return listDaysWithData;
};


const getYears = (yearList)=>{
  const listYearsWithData = [];
  let listOfFiveYears = [];
  
  let objYear = {};
  const listYearFromNow = creatingYearList(listOfYears,startDate);
  const cloneListyearFromNow = [...listYearFromNow];
 
  if(yearList){
    if(yearList.length<=5){
      listYearFromNow.map((value) => {
        yearList.filter(ly => {
          if(ly.year===  value ){
          cloneListyearFromNow.splice(cloneListyearFromNow.indexOf(value),1);
          return listYearsWithData.push(ly) 
          }
          return listYearsWithData;
        })
      });
  
      cloneListyearFromNow.forEach(noDatayears =>{
        objYear ={
        year:noDatayears,
        totalnumero:0,
        totalpvm: 0
        };
        return listYearsWithData.push(objYear)
      })
      sortingYears(listYearsWithData)
      return listOfFiveYears = listYearsWithData;

    }else{
      return listOfFiveYears = yearList;
    }

  }
  return listOfFiveYears

}



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
