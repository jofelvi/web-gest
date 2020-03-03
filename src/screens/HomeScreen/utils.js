import DataSet from '@antv/data-set';
import * as moment from 'moment';

const { DataView } = DataSet;

const subfamiliaA ='#bbdefb';
const subfamiliaB ='#64b5f6';
const subfamiliaC ='#2196f3';
const subfamiliaD ='#0277bd';
const subfamiliaE ='#00acc1';
const subfamiliaF ='#4dd0e1';
const subfamiliaG ='#9fefed';
const subfamiliaH ='#004d40';
const subfamiliaI ='#7cb342';
const subfamiliaJ ='#dce775';
const subfamiliaK ='#afb42b';
const subfamiliaL ='#827717';
const menosDeSeisMeses ='#17A589';
const entreSeisYDoceMeses ='#2471A3';
const masDeDoceMeses ='#F1C40F';


const sectionColor = new Map()
  .set('< 6 meses', [menosDeSeisMeses])
  .set('6-12 meses', [entreSeisYDoceMeses])
  .set('> 12 meses', [masDeDoceMeses])
  .set('A', [subfamiliaA])
  .set('B', [subfamiliaB])
  .set('C', [subfamiliaC])
  .set('D', [subfamiliaD])
  .set('E', [subfamiliaE])
  .set('F', [subfamiliaF])
  .set('G', [subfamiliaG])
  .set('H', [subfamiliaH])
  .set('I', [subfamiliaI])
  .set('J', [subfamiliaJ])
  .set('K', [subfamiliaK])
  .set('L', [subfamiliaL]);

  export const colorControl = (colors) => {
    return sectionColor.get(colors) || [];
  }
  
export const sortingDataToShowChartLine = (stateYear, stateMonth, stateDay, stateHour, dataYear, dataMonth, dataDay, dataHour) => {
  let dataCantidad;
  if (stateYear === true) {
    return dataCantidad = dataYear;
  };
  if (stateMonth === true) {
    return dataCantidad = dataMonth
  };
  if (stateDay === true) {
    return dataCantidad = dataDay
  };
  if (stateHour === true) {
    return dataCantidad = dataHour
  };
  return dataCantidad;
}

export const tranformDataForDonutClient = (datos) => {
  const dv = new DataView();

  return dv.source(datos).transform({
    type: 'percent',
    field: 'porcentaje',
    dimension: 'periodo',
    as: 'percent'
  });
}
const typeOfUnits = (statePVM, stateNumero) => {
  let numero = 'porcentajePVM';
  if (statePVM) {
    return numero = 'porcentajePVM';
  }
  if (stateNumero) {
    return numero = 'porcentajeNumero';
  }
  return numero
}

export const tranformDataForDonut = (datos, statePVM, stateNumero) => {
  const dv = new DataView();
  let numero = typeOfUnits(statePVM, stateNumero)
  if(numero && datos){
    return dv.source(datos).transform({
      type: 'percent',
      field: numero,
      dimension: 'subfamilia',
      as: 'percent'
    });
  }
}

export const sortingNumbers = (numberArray, statePVM, stateNumeroPedidos) => {
  let arrayFinal;
  if (statePVM) {
    return arrayFinal = numberArray.sort((a, b) => (a.totalpvm < b.totalpvm) ? 1 : -1)
  }
  if (stateNumeroPedidos) {
    return arrayFinal = numberArray.sort((a, b) => (a.totalnumero < b.totalnumero) ? 1 : -1)
  }
  return arrayFinal;
}
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
