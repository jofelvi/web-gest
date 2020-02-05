import React from "react";
import{
  Geom, 
  Axis, 
  Tooltip, 
   } from "bizcharts";

import {ChartLineContainer} from './styles'
import {sortingQuantity, sortingTime} from './utils'


class LineChart extends React.Component {
  render() {
    
    
return(
  
    <ChartLineContainer height={300} width= {490} data={this.props.dataLine} padding={[ 50, 30, 50, 30 ]} forceFit={false}  numeroPedidosEstado= {this.props.numeroPedidosType} PVMestado = {this.props.PVMtype}>
    <Axis name="month" />
    <Axis name="PVM" />
    <Axis name="Nº pedidos"/>
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