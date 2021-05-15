import DataSet from '@antv/data-set';
import {euroSymbol} from '../../constants'

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
const subfamiliaM ='#fe9c8f ';
const subfamiliaN ='#feb2a8';
const subfamiliaO ='#fec8c1';
const subfamiliaP ='#fad9c1';
const subfamiliaQ ='#f9caa7';
const subfamiliaR ='#c68642';
const subfamiliaS ='#f1c27d';
const subfamiliaT ='#8d5524';
const menosDeSeisMeses ='#17A589';
const entreSeisYDoceMeses ='#2471A3';
const masDeDoceMeses ='#F1C40F';

const sectionColor = new Map()
  .set('< 6 meses', [menosDeSeisMeses])
  .set('6-12 meses', [entreSeisYDoceMeses])
  .set('> 12 meses', [masDeDoceMeses])
  .set("ABSORBENTES PARA INCONTINENCIA DE ADULTOS".toLowerCase(), [subfamiliaA])
  .set("APÓSITOS DE GASA ESTERILIZADOS".toLowerCase(), [subfamiliaB])
  .set("PAÑALES INFANTILES".toLowerCase(), [subfamiliaC])
  .set("PROTECTORES ABSORBENTES".toLowerCase(), [subfamiliaD])
  .set("COMPRESAS TOCOLÓGICAS".toLowerCase(), [subfamiliaE])
  .set("TOALLITAS HÚMEDAS".toLowerCase(), [subfamiliaF])
  .set("HIGIENE CORPORAL ADULTOS".toLowerCase(), [subfamiliaG])
  .set("ALGODÓN HIDRÓFILO SANITARIO".toLowerCase(), [subfamiliaH])
  .set("PROTEGESLIP POSPARTO".toLowerCase(), [subfamiliaI])
  .set("APÓSITOS DE TEJIDO SIN TEJER ALGODON ESTERILIZADOS".toLowerCase(), [subfamiliaJ])
  .set("VENDAS ELÁSTICAS".toLowerCase(), [subfamiliaK])
  .set("PREVENCIÓN DE ULCERACIONES".toLowerCase(), [subfamiliaL])
  .set("DISCOS DESMAQUILLADORES".toLowerCase(), [subfamiliaM])
  .set("OTROS PRODUCTOS INFANTILES".toLowerCase(), [subfamiliaN])
  .set("GEL CICATRIZANTE".toLowerCase(), [subfamiliaO])
  .set("BASTONCILLOS COSMÉTICOS".toLowerCase(), [subfamiliaP])
  .set("APÓSITOS PARA TRAQUEOTOMIZADOS".toLowerCase(), [subfamiliaQ])
  .set("DISCOS DE LACTANCIA ABSORBENTES".toLowerCase(), [subfamiliaR])
  .set("COLECTORES".toLowerCase(), [subfamiliaS])
  .set("PROTECTORES ANTIESCARAS".toLowerCase(), [subfamiliaT]);

  export const colorControl = (colors) => {
    return sectionColor.get(colors.toLowerCase()) || [];
  }



export const sortingDataByTime = (stateYear, stateMonth, stateDay, stateHour, dataYear, dataMonth, dataDay, dataHour) => {
  let dataCantidad = [];
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
  }

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



export const putEuroSymbolToPvm = (pvm ) =>{
  if(pvm){
    return euroSymbol;
  }else{
    return ''
  }
}
