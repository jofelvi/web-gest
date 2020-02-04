import DataSet from '@antv/data-set';

const { DataView } = DataSet;

const sectionColor = new Map()
    .set('< 6 meses', ['#17A589' ])
    .set('6-12 meses', ['#2471A3'])
    .set('> 12 meses', ['#F1C40F'])
    .set('A', ['#bbdefb' ])
    .set('B', ['#64b5f6'])
    .set('C', ['#2196f3'])
    .set('D', ['#0277bd' ])
    .set('E', ['#00acc1'])
    .set('F', ['#4dd0e1'])
    .set('G', ['#9fefed'])
    .set('H', ['#004d40'])
    .set('I', ['#7cb342'])
    .set('J', ['#dce775' ])
    .set('K', ['#afb42b'])
    .set('L', ['#827717']);
  
    
    export const sortingDataToShowChartLine = (stateYear, stateMonth, stateDay, stateHour, dataYear, dataMonth, dataDay, dataHour)=>{
      let dataCantidad;
          if(stateYear === true){
            return dataCantidad = dataYear;   
          };
          if(stateMonth === true){
            return dataCantidad = dataMonth   
          };
          if(stateDay === true){
            return dataCantidad = dataDay 
          };
          if(stateHour === true){
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
export const tranformDataForDonut = (datos) => {
  const dv = new DataView();
 
  return dv.source(datos).transform({
    type: 'percent',
    field: 'porcentaje',
    dimension: 'subfamilia',
    as: 'percent'
  });
}

export const colorControl = (colors) =>{
  
  return sectionColor.get(colors) || [];
    
}