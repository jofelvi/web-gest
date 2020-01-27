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
  import DataSet from '@antv/data-set';
import {ChartDonut} from './styles'

  class DonutChart extends React.Component {
    render() {
        const {labeldonuts} = this.props;
        const { DataView } = DataSet;
        //const buffer = new ArrayBuffer(16);
        const { Html } = Guide;
        const data = [
        { periodo: '< 6 meses', porcentaje: 40 },
        { periodo: '6-12 meses', porcentaje: 21 },
        { periodo: '> 12 meses', porcentaje: 39 }
        ];
        const dv = new DataView();
        dv.source(data).transform({
        type: 'percent',
        field: 'porcentaje',
        dimension: 'periodo',
        as: 'percent'
        });
        const cols = {
        percent: {
          formatter: val => {
            val = (val * 100) + '%';
            return val;
          }
        }
        }   
        return(
      
        <ChartDonut data={dv} scale={cols} padding={[ 80, 80, 100, 100 ]} forceFit={true}>
          {window.innerWidth < 1500? 
          <div><Coord type={'theta'} radius={0.35} innerRadius={1.7} />
          <Axis name="percent" />
          <Legend position='right' offsetY={-window.innerHeight / 2 + 300} offsetX={-60} textStyle={{fontSize: 12}} /></div>: <div> <Coord type={'theta'} radius={0.50} innerRadius={1.7} />
          <Axis name="percent" />
          <Legend position='right' offsetY={-window.innerHeight / 2 + 340} offsetX={0} textStyle={{fontSize: 12}} /></div>}
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};font-size:{"2.5em"} class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Guide >
            <Html position ={[ '50%', '50%' ]} html= '<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;"><br><span style="color:#8C8C8C;font-size:1.5em">Activos</span></div>' alignX='middle' alignY='middle'/>
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color={['periodo', ['#17A589', '#2471A3' , '#F1C40F']]}
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
        )
    }}
    DonutChart.propTypes = {
 
    };
    export default DonutChart;