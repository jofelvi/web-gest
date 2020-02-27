import React from "react";
import {
  Geom,
  Axis,
  Tooltip,
  Label
} from "bizcharts";

import { ChartLineContainer, SubTitleVentas } from './styles'
import { sortingQuantity, sortingTime } from './utils'


class LineChart extends React.Component {

  render() {
    const scale = {
      year: {
        textStyle: {
          textAlign: 'center',
          fontSize: '10',

        }
      },
      month: {
        textStyle: {
          textAlign: 'center',
          fontSize: '10',

        }
      },
      day: {
        textStyle: {
          textAlign: 'center',
          fontSize: '10',

        }
      },
      hour: {
        textStyle: {
          textAlign: 'center',
          fontSize: '10',

        }
      }
    };


    return (

      <ChartLineContainer height={(window.innerHeight / 3.5) + 35} width={(window.innerWidth / 3)} data={this.props.dataLine} padding={[50, 50, 50, 30]} forceFit={true} scale={scale} numeroPedidosEstado={this.props.numeroPedidosType} PVMestado={this.props.PVMtype}>
        <SubTitleVentas>Ventas</SubTitleVentas>
        <Axis name={'year'} label={{
          textStyle: {
            textAlign: 'center',
            fontSize: '11',

          }

        }} />
        <Axis name={'month'} label={{
          textStyle: {
            textAlign: 'center',
            fontSize: '11',

          }

        }} />
         <Axis name={'day'} label={{
          textStyle: {
            textAlign: 'center',
            fontSize: '11',

          }

        }} />
         <Axis name={'hour'} label={{
          textStyle: {
            textAlign: 'center',
            fontSize: '11',

          }

        }} />
        <Axis name={this.props.PVMtype || this.props.numeroPedidosType ? sortingQuantity(this.props.PVMtype, this.props.numeroPedidosType) : 'totalPVM'}
          label={{
            textStyle: {
              textAlign: 'center',
              fontSize: '10',

            }

          }}
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