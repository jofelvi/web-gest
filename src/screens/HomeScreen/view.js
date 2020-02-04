import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


import { Button, Timeline, Badge } from 'antd';
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
  DataDisplayContainer,
  DataContainer,
  DataDisplayContainerElements,
  PieChartContainer,
  ChartContainerPie,
  PieDatsDisplayContainer

} from './styled';
import LineChart from '../../components/LineChart/view.js';
import DonutChart from '../../components/DonutChart/view.js';
import PieChart from '../../components/PieChart/view.js';
import ButtonTasks from '../../components/ButtonTasks/view.js';
import ButtonPeriod from '../../components/ButtonPeriod/view.js';
import DataDisplay from '../../components/DataDisplay/view.js';
import DataDisplayPie from '../../components/DataDisplayPie/view.js';

import ButtonQuantity from '../../components/ButtonQuantity/view.js';


import utils from '../../lib/utils';
import { sortingDataToShowChartLine, tranformDataForDonutClient, tranformDataForDonut, colorControl } from './utils'


const label1 = '<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;"><br><span style="color:#B4B0B0;font-size:1.2em">';
const label2 = '</span><br><span style="color:#4E4E4E;font-size:1.2em">';
const label3 = '</span></div>';




const HomeScreen = ({
  fetchTaskForm,
  process,
  procId,
  taskName,
  taskId,
  completed,
  history,
  yearList,
  monthList,
  dayList,
  hourList,
  fetchSalesByYear,
  fetchSalesByMonth,
  fetchSalesByDay,
  fetchSalesByHour,
  entitiesList,
  subfamiliesList,
  clientsData,
  fetchClientsData,
  clientsDataActivity,
  clientsDataSales,
  fetchPendingTasks,
  pendingTasks
}) => {

  useEffect(() => {
    fetchClientsData();
    fetchPendingTasks();
    if (utils.getTaskId() || taskId) {
      fetchClientsData();
      const id = utils.getTaskId();
      fetchTaskForm({ taskId: id || taskId, history });
    }

  }, [fetchClientsData, fetchPendingTasks, taskId, fetchTaskForm]);

  const [numeroPedidos, setNumeroPedidos] = useState(false);
  const [numeroPVM, setNumeroPVM] = useState(false);
  const [timeYear, setTimeYear] = useState(false);
  const [timeMonth, setTimeMonth] = useState(false);
  const [timeDay, setTimeDay] = useState(false);
  const [timeHour, setTimeHour] = useState(false);

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
        <ButtonPeriod
          onClickDay={() => {
            fetchPendingTasks();
            fetchSalesByDay();
            setTimeDay(true);
            setTimeYear(false);
            setTimeMonth(false);
            setTimeHour(false);
          }}

          onClickHour={() => {
            fetchSalesByHour();
            setTimeHour(true);
            setTimeYear(false);
            setTimeMonth(false);
            setTimeDay(false);

          }}
          onClickMonth={() => {
            fetchSalesByMonth();
            setTimeMonth(true);
            setTimeYear(false);
            setTimeDay(false);
            setTimeHour(false);
          }}

          onClickYear={() => {
            fetchSalesByYear();
            setTimeYear(true);
            setTimeMonth(false);
            setTimeDay(false);
            setTimeHour(false);
          }}> </ButtonPeriod>
        <ChartContainerLineDonut>
          <ChartContainerLine>

            <ButtonQuantity onClickNumeroPedido={() => {
              setNumeroPedidos(true)
              setNumeroPVM(false)
            }} onClickPVM={() => {
              setNumeroPVM(true)
              setNumeroPedidos(false)
            }}></ButtonQuantity>
            <SubTitle>Ventas</SubTitle>
            <LineChart dataLine={sortingDataToShowChartLine(timeYear, timeMonth, timeDay, timeHour, yearList,
              monthList, dayList, hourList)} numeroPedidosType={numeroPedidos} PVMtype={numeroPVM} />
          </ChartContainerLine>

          <DataDisplayContainer>
            <SubTitle>Entidades</SubTitle>
            <DataContainer>
              {entitiesList ? entitiesList.map(ent => {

                return (
                  <DataDisplayContainerElements>
                    <DataDisplay numberElement={ent.nuevosRegistros} textElement={' Nuevos Registros'} iconType="right-circle" styleColor={{ color: '#4DCE5C', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                    <DataDisplay numberElement={ent.clientesActivos} textElement={' Clientes Activos'} iconType="right-circle" styleColor={{ color: '#F8E60B', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                    <DataDisplay numberElement={ent.bajas} textElement={' Bajas'} iconType="right-circle" styleColor={{ color: '#EF4D26', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                  </DataDisplayContainerElements>
                )
              }) : ''}
            </DataContainer>
          </DataDisplayContainer>
          <ChartContainerPie>
            <SubTitle>Ventas por Subfamilias</SubTitle>
            <PieChartContainer>

              <PieChart
                dataClient={subfamiliesList ? tranformDataForDonut(subfamiliesList) : ''}
                pos={['50%', '50%']}
                textHtml={label1 + 'Ventas Subfamilias' + label2 + label3}
                alignYpos={'middle'}
                colorSection={['subfamilia', (subfamilia) => { return colorControl(subfamilia) }]} />
              <PieDatsDisplayContainer>
                {subfamiliesList ? subfamiliesList.map(subfamily => {
                  if (subfamily.porcentaje >= 6) {
                    return (
                      <DataDisplayPie numberElement={subfamily.porcentaje + ' %'} textElement={subfamily.subfamilia} iconType="pie-chart" styleColor={{ color: colorControl(subfamily.subfamilia), padding: '0px 10px 0px 0px' }} ></DataDisplayPie>
                    )
                  }
                }) : ''}

              </PieDatsDisplayContainer>
            </PieChartContainer>

          </ChartContainerPie>

        </ChartContainerLineDonut>
      </ChartsDataPeriodContainer>
      <ClientsChartTitleContainer>
        <SubTitle>Actividad de Clientes</SubTitle>
        <ClientsChartContainer>
          {clientsDataActivity ?
            <ChartContainer>
              <ContainerUpData>
                <DataDisplay numberElement={clientsDataActivity[0].porcentaje + ' %'} textElement={clientsDataActivity[0].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActivity[0].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
                <DataDisplay numberElement={clientsDataActivity[1].porcentaje + ' %'} textElement={clientsDataActivity[1].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActivity[1].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
              </ContainerUpData>
              <DonutChart
                dataClient={clientsDataActivity ? tranformDataForDonutClient(clientsDataActivity) : ''}
                pos={['50%', '50%']}
                textHtml={label1 + 'Activos' + label2 + clientsData[0].activos + label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />

              <ContainerDownData>
                <DataDisplay numberElement={clientsDataActivity[2].porcentaje + ' %'} textElement={clientsDataActivity[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActivity[2].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
              </ContainerDownData>
            </ChartContainer> : ''}
          {clientsDataSales ?
            <ChartContainer>
              <ContainerUpData>
                <DataDisplay numberElement={clientsDataSales[0].porcentaje + ' %'} textElement={clientsDataSales[0].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataSales[0].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
                <DataDisplay numberElement={clientsDataSales[1].porcentaje + ' %'} textElement={clientsDataSales[1].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataSales[1].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
              </ContainerUpData>
              <DonutChart
                dataClient={clientsDataSales ? tranformDataForDonutClient(clientsDataSales) : ''}
                pos={['50%', '50%']}
                textHtml={label1 + 'Inactivos' + label2 + clientsData[0].inactivos + label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />


              <ContainerDownData>
                <DataDisplay numberElement={clientsDataSales[2].porcentaje + ' %'} textElement={clientsDataSales[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataSales[2].periodo), padding: '0px 10px 0px 0px' }} ></DataDisplay>
              </ContainerDownData>
            </ChartContainer> : ''}
        </ClientsChartContainer>
      </ClientsChartTitleContainer>
    </StaticticsContainer>
    <TaskContainer>
      <Title>Tareas Pendientes</Title>
      <ContentContainerTask>
        <ContainerTask>
          {pendingTasks ?
            <Timeline>
              {pendingTasks.map(task =>
                <Timeline.Item>{task.per}</Timeline.Item>
              )}
            </Timeline> : ''}
          {/* el boton de actualizar tendría que hacer un fetch de las tareas*/}
          <Button type="primary" onClick={fetchPendingTasks} style={{ marginTop: 16 }} >
            Actualizar Tareas
        </Button>
        </ContainerTask>
        <ButtonTaskContainer>
          <ButtonTasks
            counter={2}
            iconType={'user-add'}
            buttonText={'Registro de clientes'}>
          </ButtonTasks>
          <ButtonTasks
            counter={2}
            iconType={'shopping-cart'}
            buttonText={'Pedidos con incidencias'}>
          </ButtonTasks>
          <ButtonTasks
            counter={2}
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
