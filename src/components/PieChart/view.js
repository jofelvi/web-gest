import React from "react";
import {
  Geom,
  Axis,
  Tooltip,
  Coord,
  Guide,
} from "bizcharts";
import { ChartDonut } from './styles';

class PieChart extends React.Component {
  render() {
    const { Html } = Guide;
   
    return (
      <div>

        <ChartDonut numeroPedidos ={this.props.numeroPedidosType} numeroPVM ={this.props.PVMtype} width={(window.innerWidth/5)-90} height={window.innerHeight/5} data={this.props.dataClient}  padding={[0, 0, 0, 0]} forceFit={true}>
          
        <Coord type={'theta'} radius={0.9} />
              <Axis name="subfamilia" />
           
          
          <Tooltip
            showTitle={false}
            itemTpl ={'<li data-index={index}><span style="background-color:{color};font-size:{"2.9em"} class="g2-tooltip-marker"></span> {name}: {value}</li>'}
          />
          <Guide >
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={this.props.colorSection}
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