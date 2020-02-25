import React from "react";
import{ 
  Geom, 
  Axis, 
  Tooltip, 
  Coord,  
  Guide, 
  
   } from "bizcharts";
 
import { ChartDonut } from './styles';


  class DonutChart extends React.Component {
    render() {
        
        const { Html } = Guide;
       
        const cols = {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
        }   
        return(
          <div>
       
        <ChartDonut width={190} height={190} data={this.props.dataClient} scale={cols} padding={[ 5, 10, 5, 10 ]} forceFit={true}>
          <Coord type={'theta'} radius={0.55} innerRadius={1.7} />
          <Axis name="percent" />
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
            >
        
          </Geom>
        </ChartDonut>
        
        </div>
        )
    }}
    DonutChart.propTypes = {
 
    };
    export default DonutChart;