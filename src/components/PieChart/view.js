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
  Shape,
   } from "bizcharts";
 
import {ChartDonut, ContainerDownData, ContainerLeftData, ContainerRightData, ContainerUpData, TextBadge, DataNumber} from './styles';
import {Icon} from 'antd';
import DataDisplay from '../../components/DataDisplay/view.js';

  class PieChart extends React.Component {
    render() {
        
        
        //const buffer = new ArrayBuffer(16);
        const { Html } = Guide;
        // const data = [
        // { periodo: '< 6 meses', porcentaje: 40 },
        // { periodo: '6-12 meses', porcentaje: 21 },
        // { periodo: '> 12 meses', porcentaje: 39 }
        // ];
        // const dv = new DataView();
        // dv.source(data).transform({
        // type: 'percent',
        // field: 'porcentaje',
        // dimension: 'periodo',
        // as: 'percent'
        // });
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
       
        <ChartDonut width={220} height={220} data={this.props.dataClient} scale={cols} padding={[ 5, 10, 5, 10 ]} forceFit={true}>
          
          {window.innerWidth < 1500? 
          <div><Coord type={'theta'} radius={0.55}  />
          <Axis name="percent" />
          {/* <Legend position='right' offsetY={-window.innerHeight / 2 + 380} offsetX={-20} textStyle={{fontSize: 12}} /> */}
          </div>: <div> <Coord type={'theta'} radius={0.9}  />
          <Axis name="percent" />
          {/* <Legend position='right' offsetY={-window.innerHeight / 2 + 450} offsetX={-20} textStyle={{fontSize: 12}} /> */}
          </div>}
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};font-size:{"2.5em"} class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Guide >
            {/* <Html position ={this.props.pos} html={this.props.textHtml} alignY={this.props.alignYpos}/> */}
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={this.props.colorSection}
            //tooltip={['item*percent',(item, percent) => {
              //percent = percent * 100 + '%';
             // return {
               // name: item,
               // value: percent
             // };
           // }]}
            //style={{lineWidth: 1,stroke: '#fff'}}
            >
        
          </Geom>
        </ChartDonut>
        
        </div>
        )
    }}
    PieChart.propTypes = {
 
    };
    export default PieChart;