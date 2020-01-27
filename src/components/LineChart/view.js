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

class LineChart extends React.Component {
  render() {
const data = [
  {"month": 'en', "total": 7 },
  {"month": 'feb', "total": 6.9 },
  {"month": 'mar', "total": 9.5 },
  {"month": 'abr', "total": 14.5 },
  {"month": 'may', "total": 18.2 },
  {"month": 'jun', "total": 21.5 },
  {"month": 'jul', "total": 25.2 },
  {"month": 'agt', "total": 26.5 },
  {"month": 'set' , "total": 23.3 },
  {"month": 'oct', "total": 18.3 },
  {"month": 'nov', "total": 13.9 },
  {"month": 'dic', "total": 13.9 }

];
return(
    <Chart height={290} width= {450} data={data} forceFit >
    <Axis name="month" />
    <Axis name="total" />
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
    <Geom type='line' position='month*total' />
  </Chart>
  )
  }
}
LineChart.propTypes = {
 
};
export default LineChart;