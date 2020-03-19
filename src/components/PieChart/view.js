import React from "react";
import {
  Geom,
  Axis,
  Tooltip,
  Coord,
  Guide,
} from "bizcharts";
import { ChartDonut } from './styles';
import { getToolTipVariableForinfo } from '../utils_chart';
const formatNumber = (num)=> {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
class PieChart extends React.Component {
  render() {
    const { Html } = Guide;

   const cols = {
     percent: {
      formatter: val => {
        val = Math.round(((val * 100)* 100)/100) + '%';
        return val;
      }
    }
  }
       
    return (
      <div>

        <ChartDonut numeroPedidos ={this.props.numeroPedidosType} numeroPVM ={this.props.PVMtype} width={(window.innerWidth/5)-90} height={window.innerHeight/5} data={this.props.dataClient} scale = {cols} padding={[0, 0, 0, 0]} forceFit={true}>
          
        <Coord type={'theta'} radius={0.9} />
              <Axis name="subfamilia" />
              <Axis name="totalnumero" />
              <Axis name="totalpvm" />
          
          <Tooltip
            showTitle={false}
            itemTpl ={this.props.toolTipInfo}
          />
          <Guide >
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={this.props.colorSection}
            tooltip={[getToolTipVariableForinfo(this.props.numeroPedidosType, this.props.PVMtype), (subfamilia, totalnumero, totalpvm) => {
                if(totalnumero){
                  return { 
                    name: subfamilia.toLowerCase(),
                    value: formatNumber(totalnumero)
                  };
                }
                if(totalpvm){
                  return { 
                    name: subfamilia.toLowerCase(),
                    value: formatNumber(totalpvm)
                  };
                }
              }
            ]}
          >

          </Geom>
        </ChartDonut>

      </div>
    )
  }
}
PieChart.propTypes = {

};
export default PieChart;