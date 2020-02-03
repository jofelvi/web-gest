import React from "react";
import{
  Chart, 
  Geom, 
  Axis, 
  Tooltip, 
  Coord, 
  Label, 
  Legend, 
  View, 
  Guide, 
  Shape } from "bizcharts";

import {ChartLineContainer} from './styles'


const sortingQuantity = (statePVM, statePedidosNumero)=>{
let dataCantidad;
    if(statePVM === false &&  statePedidosNumero === true){
     
      return dataCantidad = 'totalNumero'
      
    }
    if(statePVM === true &&  statePedidosNumero === false){
     
      return dataCantidad = 'totalPVM' 
      
    }
    return dataCantidad 
  }

const sortingTime = (data)=>{
  console.log("DATA IN CHART", data)
if (data){
  let dataTiempo = '';
  data.map(dat =>{
    
    if(dat.month){
      console.log('month');
    
      dataTiempo = 'month';
      return dataTiempo
      
    }
   
    if(dat.year){
      console.log('year');
    return dataTiempo = 'year';
      
    }
    
    if(dat.day){
      console.log('day');
      return dataTiempo = 'day';
      
    }
    
    if(dat.hour){
      console.log('hour');
      return dataTiempo = 'hour';
      
    }
    
  })
   return dataTiempo 
  }
}

class LineChart extends React.Component {
  render() {
    
    
return(
  
    <ChartLineContainer height={370} width= {580} data={this.props.dataLine} forceFit={false}  numeroPedidosEstado= {this.props.numeroPedidosType} PVMestado = {this.props.PVMtype}>
    <Axis name="month" />
    <Axis name="PVM" />
    <Axis name="Nº pedidos"/>
    {console.log("data entering in chart line", this.props.dataLine)}
    <Tooltip 
      containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
      itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}"> total {name}</td><td>{value}</td></tr>'
      offset={50}
      g2-tooltip={{
      position: 'absolute',
      visibility: 'hidden',
      border : '1px solid #efefef',
      backgroundColor: 'white',
      color: '#000',
      opacity: "0.8",
      padding: '5px 15px',
      'transition': 'top 200ms,left 200ms'
    }}  g2-tooltip-list={{
      margin: '10px'
    }}
      />
    <Geom type='line' position={sortingTime(this.props.dataLine)+'*'+sortingQuantity(this.props.PVMtype, this.props.numeroPedidosType)}/>
  </ChartLineContainer>
  
  )
  }
}
LineChart.propTypes = {
 
};
export default LineChart;