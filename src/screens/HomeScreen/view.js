import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


import { Button, Timeline } from 'antd';
import {
  ChartContainer,
  StaticticsContainer,
  ChartContainerLine,
  ClientsChartTitleContainer,
  ChartContainerLineDonut,
  Title, ContainerTask,
  ButtonTaskContainer,
  ContentContainerTask,
  ChartsDataPeriodContainer,
  SubTitle,
  ContentContainer,
  TaskContainer,
  ContainerUpData,
  ContainerDownData,
  ClientsChartContainer,
  DataDisplayContainer
} from './styled';
import LineChart from '../../components/LineChart/view.js';
import DonutChart from '../../components/DonutChart/view.js';
import ButtonTasks from '../../components/ButtonTasks/view.js';
import ButtonPeriod from '../../components/ButtonPeriod/view.js';
import DataDisplay from '../../components/DataDisplay/view.js';


import DataSet from '@antv/data-set';
import utils from '../../lib/utils';
import { dataInactive, dataActive, dataaa, dataLineChart, dataClientsActivity, dataSubfamilias } from '../../constants';
const activos = 123.455;
const inactivos = 345.908;
const { DataView } = DataSet;
const label1 = '<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;"><br><span style="color:#B4B0B0;font-size:1.2em">';
const label2 = '</span><br><span style="color:#4E4E4E;font-size:1.2em">';
const label3 = '</span></div>';
const menosDeSeisMeses = " - 6 meses";
const masDeDoceMeses = " + 12 meses";
const deSeisAdoceMeses = " 6-12 meses";
const colorArray = [,  , , , '#', '#', '#','#', '#', '#', '#', '#'];

const sectionColor = new Map()
    .set('< 6 meses', ['#17A589' ])
    .set('6-12 meses', ['#2471A3'])
    .set('> 12 meses', ['#F1C40F'])
    .set('A', ['#17A589' ])
    .set('B', ['#EE8434'])
    .set('C', ['#80B192'])
    .set('D', ['#4B4E6D' ])
    .set('E', ['#EF798A'])
    .set('F', ['#A1E887'])
    .set('G', ['#493548' ])
    .set('H', ['#AE8799'])
    .set('I', ['#364949'])
    .set('J', ['#7899D3' ])
    .set('K', ['#E7EFC5'])
    .set('L', ['#A0583B']);
const tranformDataForDonutClient = (datos) => {
  
  const dv = new DataView();
  console.log(dv)
  return dv.source(datos).transform({
    type: 'percent',
    field: 'porcentaje',
    dimension: 'periodo',
    as: 'percent'
  });
}
const tranformDataForDonut = (datos) => {
  const dv = new DataView();
  console.log(dv)
  return dv.source(datos).transform({
    type: 'percent',
    field: 'porcentaje',
    dimension: 'subfamilia',
    as: 'percent'
  });
}

const colorControl = (colors) =>{
  
  return sectionColor.get(colors) || [];
    
}

const HomeScreen = ({
  fetchTaskForm,
  process,
  procId,
  taskName,
  taskId,
  completed,
  history,
}) => {
  useEffect(() => {
    if (utils.getTaskId() || taskId) {
      const id = utils.getTaskId();
      fetchTaskForm({ taskId: id || taskId, history });
    }
  }, [taskId, fetchTaskForm]);

  const id = utils.getTaskId() ? utils.getTaskId() : taskId;

  if (id && procId && !completed) {
    return <Redirect to={`/task/${taskId}/process/${procId}`} />;
  }

  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }
  return <ContentContainer>
    <StaticticsContainer>
      <Title>Estadísticas</Title>
      <ChartsDataPeriodContainer>
        <SubTitle>Periodo</SubTitle>
        <ButtonPeriod> </ButtonPeriod>
        <ChartContainerLineDonut>
          <ChartContainerLine>
            <LineChart dataLine={dataLineChart} />
          </ChartContainerLine>
          <DataDisplayContainer>

          </DataDisplayContainer>
          <ChartContainer>
            <DonutChart
              dataClient={tranformDataForDonut(dataSubfamilias)}
              pos={['50%', '50%']}
              textHtml={ label1 +'Ventas Subfamilias'+ label2+ label3 }
              alignYpos={'middle'}
              colorSection = {['subfamilia',(subfamilia)=>{ return colorControl(subfamilia)} ]} />
          </ChartContainer>
          <ChartContainer></ChartContainer>
        </ChartContainerLineDonut>
      </ChartsDataPeriodContainer>
      <ClientsChartTitleContainer>
        <SubTitle>Actividad de Clientes</SubTitle>
        <ClientsChartContainer>
        <ChartContainer>
          <ContainerUpData>
            <DataDisplay numberElement={dataActive[2].porcentaje} textElement= {masDeDoceMeses} iconType="pie-chart" styleColor={{ color: '#F1C40F' }} ></DataDisplay>
            <DataDisplay numberElement={dataActive[1].porcentaje} textElement= {menosDeSeisMeses} iconType="pie-chart" styleColor={{ color: '#17A589' }} ></DataDisplay>
          </ContainerUpData>
          <DonutChart
            dataClient={tranformDataForDonutClient(dataActive)}
            pos={['50%', '50%']}
            textHtml={label1 +'Activos'+ label2+ dataClientsActivity[0].activos + label3}
            alignYpos={'middle'}
            colorSection = {['periodo', (periodo)=>{return colorControl(periodo)}]} />
             
            <ContainerDownData>
        <DataDisplay numberElement= {dataActive[2].porcentaje} textElement= {deSeisAdoceMeses} iconType= "pie-chart" styleColor = {{color: '#4586B1'}} ></DataDisplay>
            </ContainerDownData>
        </ChartContainer>
        <ChartContainer>
        <ContainerUpData>
            <DataDisplay numberElement={dataInactive[2].porcentaje} textElement= {masDeDoceMeses} iconType="pie-chart" styleColor={{ color: '#F1C40F' }} ></DataDisplay>
            <DataDisplay numberElement={dataInactive[0].porcentaje} textElement= {menosDeSeisMeses} iconType="pie-chart" styleColor={{ color: '#17A589' }} ></DataDisplay>
          </ContainerUpData>
          <DonutChart
            dataClient={tranformDataForDonutClient(dataInactive)}
            pos={['50%', '50%']}
            textHtml={label1 +'Inactivos'+ label2+ dataClientsActivity[0].activos + label3}
            alignYpos={'middle'}
            colorSection = {['periodo',  (periodo)=>{return colorControl(periodo)}]} />

            
            <ContainerDownData>
        <DataDisplay numberElement= {dataInactive[1].porcentaje} textElement= {deSeisAdoceMeses} iconType= "pie-chart" styleColor = {{color: '#4586B1'}} ></DataDisplay>
            </ContainerDownData>
        </ChartContainer>
        </ClientsChartContainer>
      </ClientsChartTitleContainer>
    </StaticticsContainer>
    <TaskContainer>
      <Title>Tareas Pendientes</Title>
      <ContentContainerTask>
        <ContainerTask>
          <Timeline>
            {dataaa.map(da =>
              <Timeline.Item>{da.per}</Timeline.Item>
            )}
          </Timeline>
          {/* el boton de actualizar tendría que hacer un fetch de las tareas*/}
          <Button type="primary" style={{ marginTop: 16 }} >
            Actualizar Tareas
        </Button>
        </ContainerTask>
        <ButtonTaskContainer>
          <ButtonTasks
            iconType={'user-add'}
            buttonText={'Registro de clientes'}
          ></ButtonTasks>
          <ButtonTasks
            iconType={'shopping-cart'}
            buttonText={'Pedidos con incidencias'}>
          </ButtonTasks>
          <ButtonTasks
            iconType={'user-delete'}
            buttonText={'Baja de clientes'}></ButtonTasks>
        </ButtonTaskContainer>
      </ContentContainerTask>
    </TaskContainer>
  </ContentContainer>

};

HomeScreen.propTypes = {
  process: PropTypes.string.isRequired,
  procId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default HomeScreen;
