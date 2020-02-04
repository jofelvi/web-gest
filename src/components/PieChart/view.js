import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
} from "bizcharts";

import { ChartDonut } from './styles';


class PieChart extends React.Component {
  render() {

    ;
    const { Html } = Guide;

    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }
    return (
      <div>

        <ChartDonut width={220} height={220} data={this.props.dataClient} scale={cols} padding={[5, 10, 5, 10]} forceFit={true}>

          {window.innerWidth < 1500 ?
            <div><Coord type={'theta'} radius={0.55} />
              <Axis name="percent" />
            </div> : <div> <Coord type={'theta'} radius={0.9} />
              <Axis name="percent" />
            </div>}
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};font-size:{"2.5em"} class="g2-tooltip-marker"></span>{name}: {value}</li>'
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