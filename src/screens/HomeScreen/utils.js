import DataSet from '@antv/data-set';

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
const codeColors1 = '';
const codeColors2 = '';
const codeColors3 = '';
const codeColors4 = '';
const codeColors5 = '';
const codeColors6 = '';
const codeColors7 = '';
const codeColors8 = '';
const codeColors9 = '';
const sectionColor = new Map()
  .set('< 6 meses', [menosDeSeisMeses])
  .set('6-12 meses', [entreSeisYDoceMeses])
  .set('> 12 meses', [masDeDoceMeses])
  .set("ABSORBENTES PARA INCONTINENCIA DE ADULTOS", [subfamiliaA])
  .set("APÓSITOS DE GASA ESTERILIZADOS", [subfamiliaB])
  .set("PAÑALES INFANTILES", [subfamiliaC])
  .set("PROTECTORES ABSORBENTES", [subfamiliaD])
  .set("COMPRESAS TOCOLÓGICAS", [subfamiliaE])
  .set("TOALLITAS HÚMEDAS", [subfamiliaF])
  .set("HIGIENE CORPORAL ADULTOS", [subfamiliaG])
  .set("ALGODÓN HIDRÓFILO SANITARIO", [subfamiliaH])
  .set("PROTEGESLIP POSPARTO", [subfamiliaI]);
  // .set(codeColors, [subfamiliaJ])
  // .set(codeColors, [subfamiliaK])
  // .set(codeColors, [subfamiliaL]);

  export const colorControl = (colors) => {
   
    return sectionColor.get(colors) || [];
  }
  


export const sortingDataByTime = (stateYear, stateMonth, stateDay, stateHour, dataYear, dataMonth, dataDay, dataHour) => {
  let dataCantidad;
  if (stateYear) {
    return dataCantidad = dataYear;
  };
  if (stateMonth) {
    return dataCantidad = dataMonth;
  };
  if (stateDay) {
    return dataCantidad = dataDay;
  };
  if (stateHour) {
    return dataCantidad = dataHour;
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
  let numero = 'totalpvm';
  if (statePVM) {
    return numero = 'totalpvm';
  }
  if (stateNumero) {
    return numero = 'totalnumero';
  }
  return numero
}

export const tranformDataForDonut = (datos, statePVM, stateNumero) => {
  const dv = new DataView();
  let numero = typeOfUnits(statePVM, stateNumero)
  if(numero && datos){
    return dv.source(datos).transform({
      type: 'percent',
      field: numero ,
      dimension:'subfamilia' ,
      as: 'percent'
    });
  }
}

export const sortingNumbers = (numberArray, statePVM, stateNumeroPedidos) => {
  let arrayFinal;
  if(numberArray){
  if (statePVM) {
    return arrayFinal = numberArray.sort((a, b) => (a.totalpvm < b.totalpvm) ? 1 : -1)
  }
  if (stateNumeroPedidos) {
    return arrayFinal = numberArray.sort((a, b) => (a.totalnumero < b.totalnumero) ? 1 : -1)
  }
}
  return arrayFinal;
}


 
  
