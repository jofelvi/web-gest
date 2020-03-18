import React from "react";
import{ 
  Geom, 
  Axis, 
  Tooltip, 
  Coord,  
  Guide, 
  
   } from "bizcharts";
 
import { ChartDonut } from './styles';
import { getToolTipVariableForInfoDonutChart } from '../utils_chart';

  class DonutChart extends React.Component {
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
        return(
          <div>
       
        <ChartDonut width={190} height={window.innerHeight / 6} data={this.props.dataClient} scale={cols} padding={[ 5, 10, 5, 10 ]} forceFit={true}>
          <Coord type={'theta'} radius={0.55} innerRadius={1.7} />
          <Axis name="periodo" />
          <Axis name="totalnumero" />
          <Axis name="totalpvm" />
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};font-size:{"2.5em"} class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Guide >
            <Html position ={this.props.pos} html={this.props.textHtml} alignY={this.props.alignYpos}/>
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={this.props.colorSection}
            tooltip={['periodo*porcentaje', (periodo, porcentaje) => {
             
                return { 
                  name: periodo,
                  value: porcentaje
                };
             
            }
          ]}
            >
        
          </Geom>
        </ChartDonut>
        
        </div>
        )
    }}
    DonutChart.propTypes = {
 
    };
    export default DonutChart;