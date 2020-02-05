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

        <ChartDonut numeroPedidos ={this.props.numeroPedidosType} numeroPVM ={this.props.PVMtype} width={220} height={220} data={this.props.dataClient}  padding={[5, 10, 5, 10]} forceFit={true}>
          
          {window.innerWidth < 1500 ?
            <div><Coord type={'theta'} radius={0.55} />
              <Axis name="subfamilia" />
            </div> : <div> <Coord type={'theta'} radius={0.9} />
              <Axis name="subfamilia" />
            </div>}
          
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