import React from "react";
import {
  Geom,
  Axis,
  Tooltip,
  Label,
  Coord
} from "bizcharts";

import { ChartLineContainer, SubTitleVentas } from './styles'
import { sortingQuantity, sortingTime, formatNumber } from './utils'
const styleLabels = {
  textStyle: {
  textAlign: 'center',
  fontSize: '10',

}

}

class LineChart extends React.Component {

  render() {
    const cols = {
      totalnumero: {
        formatter: val => {
          console.log("format", formatNumber(val))
          console.log("totalnumero", val);
          return formatNumber(val);
        }
      },
      totalpvm: {
        formatter: val => {
          console.log("format",formatNumber(val))
         console.log("totalpvm", val);
          return formatNumber(val);
        }
      }
      }   
    return (

      <ChartLineContainer height={(window.innerHeight / 3.5)} width={(window.innerWidth/3.3)} scale={cols} data={this.props.dataLine} padding={[50, 50, 50, 40]} forceFit={true} numeroPedidosEstado={this.props.numeroPedidosType} PVMestado={this.props.PVMtype}>
       
        <Coord type={'rect'} scale ={[1, 1]} />
        <Axis name={'year'} 
        label={styleLabels} 
        />
        <Axis name={'month'} 
        label={styleLabels} 
        />
         <Axis name={'day'} 
         label={styleLabels} 
        />
         <Axis name={'hour'} 
         label={styleLabels} 
        />
        <Axis name={'totalnumero'}
          label={styleLabels}
        />
        <Axis name={'totalpvm'}
          label={styleLabels}
        />
        



        <Tooltip
          containerTpl='<div class="g2-tooltip"><p class="g2-tooltip-title"></p><table class="g2-tooltip-list"></table></div>'
          itemTpl='<tr class="g2-tooltip-list-item"><td style="color:{color}"> total {name}</td><td>{value}</td></tr>'
          offset={50}
          g2-tooltip={{
            position: 'absolute',
            visibility: 'hidden',
            border: '1px solid #efefef',
            backgroundColor: 'white',
            color: '#000',
            opacity: "0.8",
            padding: '5px 15px',
            'transition': 'top 200ms,left 200ms'
          }} g2-tooltip-list={{
            margin: '10px'
          }}
        />
        {/* <Geom type='line' position={this.props.dataLine && (this.props.PVMtype||this.props.numeroPedidosType)? sortingTime(this.props.dataLine) + '*' + sortingQuantity(this.props.PVMtype, this.props.numeroPedidosType):"year*totalPVM"}> */}
        <Geom
          type='line'
          position={sortingTime(this.props.dataLine) + '*' + (sortingQuantity(this.props.PVMtype, this.props.numeroPedidosType) ? sortingQuantity(this.props.PVMtype, this.props.numeroPedidosType) : "totalPVM")}>
        </Geom>


      </ChartLineContainer>

    )
  }
}
LineChart.propTypes = {

};
export default LineChart;