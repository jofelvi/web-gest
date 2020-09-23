import * as moment from 'moment';
import { number } from 'yup';

export const sortingYears = (numberArray) => numberArray.sort((a, b) => (a.year > b.year) ? 1 : -1);

export const sortingDays = (numberArray) =>  numberArray.sort((a, b) => (a.day > b.day) ? 1 : -1);
export const sortingHours = (numberArray) =>  numberArray.sort((a, b) => (a.hour > b.hour) ? 1 : -1);


export const generateDays = (num = 12, key = 'months') => {
  let days = [];

  [...Array(num).keys()].map(value => {
    days = [...days, { totalnumero: 0, totalpvm: 0, day: moment().subtract(value, key).format('YYYY-MM-DD') }];
  });
  
  return days;
};

export const generateHours = (num = 24) => {
  let hours = [];

  [...Array(num).keys()].map(value => {
    hours = [...hours, { totalnumero: 0, totalpvm: 0, hour: moment({ minute: 0, hour: value}).format('HH:mm') }];
  });
  return hours;
};

export const generateSevenDays = (num = 6, key = 'days') => {
  let days = [];

  [...Array(num).keys()].map(value => {
    days = [...days, { totalnumero: 0, totalpvm: 0, day: moment().subtract(value + 1, key).format('YYYY-MM-DD') }];
  });
  return days;
};

export const generateYears = (num = 5, key = 'Years') => {
  let years = [];

  [...Array(num).keys()].map(value => {
    years = [...years, { totalnumero: 0, totalpvm: 0, year: moment().subtract(value, key).format('YYYY') }];
  });
  return years;
};

export const groupHoursByDay = (hourList) => {
  if(!hourList || !hourList.length){
    return {
      day: moment().format('YYYY-MM-DD'),
      totalnumero: 0,
      totalpvm: 0
    }
  }
  return hourList.reduce((acc, value) => {
    return {
      day: moment(value.fecha_alta).format('YYYY-MM-DD'),
      totalnumero: (acc.totalnumero || 0) + value.totalnumero,
      totalpvm: (acc.totalpvm || 0) + value.totalpvm
    }
  }, {})
};

export const groupHoursByYear = (hourList) => {
  if(!hourList || !hourList.length){
    return {
      year: moment().format('YYYY'),
      totalnumero: 0,
      totalpvm: 0
    }
  }
  return hourList.reduce((acc, value) => {
    return {
      year: moment(value.fecha_alta).format('YYYY'),
      totalnumero: (acc.totalnumero || 0) + value.totalnumero,
      totalpvm: (acc.totalpvm || 0) + value.totalpvm
    }
  }, {})
};
export const calculatePercentage = (numbers, numeroPedidos, numeroPVM) => {
  const listOfPercentages = []
  if (!numbers || !numbers.length) {
    return [];
  }
  
    if(numeroPedidos){
      let totalPedidos = numbers.reduce((prev, cur)=> {
        return prev + cur.totalnumero;
      }, 0);
      numbers.map(num => { 
        let objectPedidosPercentage = {...num, totalnumero: Math.round((num.totalnumero*100)/totalPedidos)}
        return listOfPercentages.push(objectPedidosPercentage);
      })
     }
    if(numeroPVM){
      let totalPVM = numbers.reduce((prev, cur)=> {
        return prev + cur.totalpvm;
      }, 0);
    numbers.map(num => {
      let objectPVMpercentage = {...num, totalpvm: Math.round((num.totalpvm*100)/totalPVM)};
        return listOfPercentages.push(objectPVMpercentage);
      })   
    }    
    return listOfPercentages;
  };

  export const calculatePercentageCLients = (activityData = []) => {
    const listOfPercentages = []
    if (!activityData) {
      return [];
    }
    let totalNum = additionOfData(activityData)
        activityData.map(num => {
        let objectPercentage = {...num, porcentaje: Math.round((num.porcentaje*100)/totalNum)};
          return listOfPercentages.push(objectPercentage);
        })   
       
      return listOfPercentages;
    };
export const additionOfData = (activityData = []) =>{
  if (!activityData) {
    return [];
  }
      let totalNum = activityData.reduce((prev, cur)=> {
          return prev + cur.porcentaje;
        }, 0);
      return totalNum;
}