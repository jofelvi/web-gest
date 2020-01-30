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
const totalN = 'totalNumero';
const totalPVM = 'totalPVM';
const m = 'month'
class LineChart extends React.Component {
  render() {

return(
  
    <ChartLineContainer height={370} width= {580} data={this.props.dataLine} forceFit={false} >
    <Axis name="month" />
    <Axis name="totalPVM" />
    <Axis name="totalNumero"/>
    <Tooltip 
      containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
      itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>'
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
    <Geom type='line' position={m+'*'+totalN}/>
  </ChartLineContainer>
  
  )
  }
}
LineChart.propTypes = {
 
};
export default LineChart;