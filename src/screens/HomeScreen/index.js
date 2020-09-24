import { connect } from 'react-redux';
import { monthNames } from './constants'
import { sortingYears, sortingDays, generateDays, generateHours, sortingHours, generateSevenDays, groupHoursByDay, generateYears, groupHoursByYear, additionOfData }from './utils_date'

import { fetchTaskForm } from '../../modules/tasks/actions';

import { fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks } from '../../modules/charts/actions';

import View from './view';

const getYears = (yearList = [], hourList) => {
  if (!yearList ) {
    return [];
  }
  const listYearData = [...yearList, groupHoursByYear(hourList)];

  const yearListEmpty = generateYears().reduce((acc, value) => {
    return {
     ...acc,
     [value.year]: {...value}
    }
  }, {})

  const finalYearListLast24HoursAdded = listYearData.reduce((acc, value) => {
    return {
      ...acc,
      [value.year]: {
        totalnumero: value.totalnumero + acc[value.year].totalnumero,
        totalpvm: value.totalpvm + acc[value.year].totalpvm
      }
    }  
  }, yearListEmpty )
 
  return Object.keys(finalYearListLast24HoursAdded).map(year => ({ year, ...finalYearListLast24HoursAdded[year] }));

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
      return {
        ...acc,
        [monthNames[month]]: {
          totalnumero: value.totalnumero,
          totalpvm: value.totalpvm
        }
      }
    }
    return {
      ...acc,
      [monthNames[month]]: {
        //totalnumero: Math.round(value.totalnumero + acc[monthNames[month]].totalnumero),
        //totalpvm: Math.round(value.totalpvm + acc[monthNames[month]].totalpvm)
        totalnumero: value.totalnumero + acc[monthNames[month]].totalnumero,
        totalpvm: value.totalpvm + acc[monthNames[month]].totalpvm
      }
    }
  }, {});
  return Object.keys(monthsList).map(month => ({ month, ...monthsList[month] }));
};

const getHours = (hourList = []) => {
  const filterForHourFormat = hourList? hourList.map(hourObj =>{
    if(hourObj.hour.length<5) {
      return {...hourObj, hour: `0${hourObj.hour}`};
    }
    return {...hourObj};    
  }) : [];
  if (!hourList) {
    return [];
  }
  const hourAddedList = sortingHours([...filterForHourFormat, ...generateHours(new Date().getHours() + 1)]).reduce((acc, value) => {
    if (value.hour) {
      return {
        ...acc,
        [value.hour]: {
          totalnumero: acc[value.hour] ? ((acc[value.hour].totalnumero || 0) + value.totalnumero) : value.totalnumero,
          totalpvm: acc[value.hour] ? ((acc[value.hour].totalpvm || 0) + value.totalpvm) : value.totalpvm
        }
      }
        
    }
  }, {})
  return Object.keys(hourAddedList).map(hour => ({ hour: hour, ...hourAddedList[hour] }));
};

const getObjectForDonutChartActive = (clientsActives = []) =>{
  if (!clientsActives) {
    return [];
  }else{
    let listActive = clientsActives.reduce((prev, curr) => {
    const keyOfObj = Object.keys(curr);
    const listObject = keyOfObj.map(key => {
      if(key === 'mas12meses'){
        return { periodo: "> 12 meses", porcentaje: curr[key] };
      }
      if(key === 'menos12meses'){
        return { periodo: "6-12 meses", porcentaje: curr[key] };
      }
      if(key === 'menos6meses'){
        return { periodo: "< 6 meses", porcentaje: curr[key] };
      }
    })
  let totalActives= additionOfData(listObject);
  return listObject.map( objectPercentage =>{
     return {...objectPercentage, totalActive: totalActives}
   })
}, {})
return listActive;
}
}

const getObjectForDonutChartInActive = (clientsInactives = []) => {

  if (!clientsInactives) {
    return [];
  }else{
    let listInactive = clientsInactives.reduce((prev, curr) => {
    const keyOfObj = Object.keys(curr);
    const listObject = keyOfObj.map(key => {
      if(key === 'mas12meses'){
        return {periodo: "> 12 meses", porcentaje: curr[key]};
      }
      if(key === 'menor12meses'){
        return {periodo: "6-12 meses", porcentaje: curr[key]};
      }
      if(key === 'menor6meses'){
        return {periodo: "< 6 meses", porcentaje: curr[key]};
      }
    })
    let totalInactives= additionOfData(listObject);
    return listObject.map( objectPercentage =>{
      return {...objectPercentage, totalInactive: totalInactives}
    })
}, {})
return listInactive;
}
}

export default connect(
  state => ({
    fetchStateLineChart: state.charts.statusLineChart,
    fetchStateClients: state.charts.statusClients,
    fetchstStateSubfamily: state.charts.statusSubfamily,
    fetchStateClientsActive: state.charts.statusClientsActive,
    fetchStateClientsInactive: state.charts.statusClientsInactive,
    process: state.forms.process,
    procId: state.forms.procId,
    taskName: state.forms.taskName,
    taskId: state.forms.taskId,
    completed: state.forms.completed,
    yearList: getYears(state.charts.yearList, state.charts.hourList),
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
    clientsDataActives: getObjectForDonutChartActive(state.charts.clientsDataActivity)  || [],
    clientsDataInactives: getObjectForDonutChartInActive(state.charts.clientsDataSales) || [],
    pendingTasks: state.charts.pendingTasks,
    periodTimeSelected: state.charts.periodTimeSelected,
    measuringUnitSelected: state.charts.measuringUnitSelected,
  }),
  { fetchTaskForm, fetchSalesByYear, fetchSalesByMonth, fetchSalesByDay, fetchSalesByHour, fetchClientsData, fetchPendingTasks }
)(View);
