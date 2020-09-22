import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Button, Timeline, Tabs, Spin, Empty } from 'antd';

import {
  ChartContainer,
  StaticticsContainer,
  ChartContainerLine,
  ClientsChartTitleContainer,
  ChartContainerLineDonut,
  ContainerTask,
  ButtonTaskContainer,
  ContentContainerTask,
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
  PieDatsDisplayContainer,
  EntitiesChartPieContainer,
  ButtonsPeriodQuantityContainer,
  ContainerClientsActivityAndStatistics,
  ContainerSpin,
  ContainerChartSpinner,
  PieContainerSpin,
  ChartLegendContainer,
  ContainerLineChartAndTitle,
  SubTitleVentas,
  DonutContainerSpin,
  ContainerLineChart,
} from './styled';

import LineChart from '../../components/LineChart';
import DonutChart from '../../components/DonutChart';
import PieChart from '../../components/PieChart';
import ButtonTasks from '../../components/ButtonTasks';
import DataDisplay from '../../components/DataDisplay';
import DataDisplayPie from '../../components/DataDisplayPie';

import PeriodButtons from './components/PeriodButtons';
import QuantityButtons from './components/QuantityButtons';

import { STATUS, PERIOD_TIME_SELECTED, MEASURING_UNIT_SELECTED } from '../../modules/charts/constants'
import utils from '../../lib/utils';
import { tranformDataForDonutClient, tranformDataForDonut, colorControl, sortingNumbers, sortingDataByTime, putEuroSymbolToPvm } from './utils'
import {calculatePercentage, calculatePercentageCLients} from "./utils_date"
import { formatNumber } from '../../utils'

const { TabPane } = Tabs;
const label1 = '<div style="color:#8c8c8c;font-size:12px;text-align: center;width: 10em;"><br><span style="color:#B4B0B0;font-size:12px">';
const label2 = '</span><br><span style="color:#4E4E4E;font-size:12px">';
const label3 = '</span></div>';
const toolTipPieSubfamilias1 = '<li data-index={index} style="font-size: 10px; min-width: 100px"><span style="background-color:{color};font-size: 0px;" class="g2-tooltip-marker"></span> '
const toolTipPieSubfamilias2 = '</li>';
function callback(key) {
  console.log(key);
}
const HomeScreen = ({
  fetchTaskForm,
  process,
  procId,
  taskName,
  taskId,
  completed,
  history,
  yearList,
  monthsList,
  daysList,
  hourList,
  fetchSalesByYear,
  fetchSalesByMonth,
  fetchSalesByDay,
  fetchSalesByHour,
  entitiesYearList,
  entitiesYearActivesList,
  entitiesMonthList,
  entitiesMonthActivesList,
  entitiesDayList,
  entitiesDayActivesList,
  entitiesHourList,
  entitiesHourActivesList,
  subfamiliesListYear,
  subfamiliesListMonth,
  subfamiliesListDay,
  subfamiliesListHour,
  fetchClientsData,
  clientsDataActives,
  clientsDataInactives,
  fetchPendingTasks,
  pendingTasks,
  fetchStateLineChart,
  fetchStateClients,
  fetchstStateSubfamily,
  fetchStateClientsActive,
  fetchStateClientsInactive,
  periodTimeSelected,
  measuringUnitSelected,
}) => {
  const testIfThereIsTask = (idTask, util, history)=>{
    if (util.getTaskId() || idTask) {
      const id = utils.getTaskId();
      return fetchTaskForm({ idTask: id || idTask, history });
    }
  }
  const setMasuringUnitToPVM = measuringUnitSelected === MEASURING_UNIT_SELECTED.PVM;
  const setMasuringUnitToPedidos = measuringUnitSelected === MEASURING_UNIT_SELECTED.PEDIDOS;

  const setTimeToYear = periodTimeSelected === PERIOD_TIME_SELECTED.YEAR;
  const setTimeToMonth = periodTimeSelected === PERIOD_TIME_SELECTED.MONTH;
  const setTimeToDay = periodTimeSelected === PERIOD_TIME_SELECTED.DAY; 
  const setTimeToHour = periodTimeSelected === PERIOD_TIME_SELECTED.HOUR; 

  const thereIsNoDataByYear = !yearList  || !subfamiliesListYear  || !entitiesYearList || !entitiesYearActivesList;
  const thereIsNoDataByDay = !daysList || !monthsList || !subfamiliesListDay || !entitiesDayList || !entitiesDayActivesList;
  const thereIsNoDataByHour = !hourList || !subfamiliesListHour || !entitiesHourList || !entitiesHourActivesList;
  const thereIsNoDataByMonth = !subfamiliesListMonth || !entitiesMonthList || !entitiesMonthActivesList;
  
  useEffect(()=>{
    let timerId;

    async function fetchData() {
      await testIfThereIsTask(taskId, utils, history);
      if(thereIsNoDataByYear){
        fetchSalesByYear();
      }
      if(thereIsNoDataByDay){
        fetchSalesByDay();
      }
      if(thereIsNoDataByHour){
        fetchSalesByHour();
      }
      if(thereIsNoDataByMonth){
        fetchSalesByMonth();
      }
    
      fetchClientsData();
      fetchPendingTasks();

      timerId = setInterval(()=>{
        fetchSalesByHour();
       }, 360000);
    }
    fetchData();  
    
    return () => clearInterval(timerId);
 }, [ ]);

  let subfamilyDataSortedByBiggestNumber = sortingNumbers( sortingDataByTime(setTimeToYear, setTimeToMonth, setTimeToDay, setTimeToHour,
    subfamiliesListYear, subfamiliesListMonth, subfamiliesListDay,subfamiliesListHour), setMasuringUnitToPVM, setMasuringUnitToPedidos)

  const id = utils.getTaskId() ? utils.getTaskId() : taskId;
 
  if (id && procId && !completed) {
    return <Redirect to={`/task/${taskId}/process/${procId}`} />;
  }

  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }

  const salesLineChartData = yearList || monthsList || daysList || hourList ? sortingDataByTime(setTimeToYear, setTimeToMonth, setTimeToDay, setTimeToHour, yearList,
    monthsList, daysList, hourList) : [];
    
  const subFamiliaData = subfamilyDataSortedByBiggestNumber ? sortingNumbers(sortingDataByTime(setTimeToYear, setTimeToMonth, setTimeToDay, setTimeToHour, 
    subfamiliesListYear, subfamiliesListMonth, subfamiliesListDay, subfamiliesListHour), setMasuringUnitToPVM, setMasuringUnitToPedidos) : []

  const subFamiliaDataLegend = subFamiliaData.length ? calculatePercentage(subFamiliaData.slice(0, 5), setMasuringUnitToPedidos , setMasuringUnitToPVM) : [];

  const subFamiliaChartData = subFamiliaData.length ? tranformDataForDonut(subFamiliaData, setMasuringUnitToPVM, setMasuringUnitToPedidos): [];
    
  return <ContentContainer>
    <Tabs defaultActiveKey="1" onChange={callback} style={{width: '100%', height: '88vh'}}>
  <TabPane tab={"Estadísticas"} key={"1"}  style={{width: '100%', height: '100%'}}>
    <StaticticsContainer>
        <ButtonsPeriodQuantityContainer>
          <PeriodButtons />
          <QuantityButtons />
        </ButtonsPeriodQuantityContainer>
        <ContainerClientsActivityAndStatistics>
      
        <ChartContainerLineDonut>
        <ContainerLineChart>
        <ContainerLineChartAndTitle>
        <SubTitleVentas>Ventas</SubTitleVentas> 

        {
        fetchStateLineChart === STATUS.FETCHED_FAIL?<span>Error fetching data</span> :
     <ContainerChartSpinner>
        {fetchStateLineChart === STATUS.FETCHED ?
        
          <ChartContainerLine> 
            
            {
            !!salesLineChartData.length && (
            <LineChart dataLine={salesLineChartData} numeroPedidosType={setMasuringUnitToPedidos} PVMtype={setMasuringUnitToPVM} />
            )}
            {!
            salesLineChartData.length &&(
            <Empty/>
            )}
          </ChartContainerLine>: <ContainerSpin><Spin/></ContainerSpin>}</ContainerChartSpinner>
          
          }
          </ContainerLineChartAndTitle>
       </ContainerLineChart>
          <EntitiesChartPieContainer>
            <DataDisplayContainer>
              <SubTitle>Clientes transferindas</SubTitle>
              
              {fetchStateClients === STATUS.FETCHED ? (   
               
              <DataContainer>   
                 
                    <DataDisplayContainerElements>
                    {entitiesYearList  && (
                      <div>
                    {sortingDataByTime(setTimeToYear, setTimeToMonth, setTimeToDay, setTimeToHour, 
                      entitiesYearList, entitiesMonthList, entitiesDayList, entitiesHourList).map(ent => {
                       return ( 
                         <div>
                        <DataDisplay numberElement={formatNumber(ent.nuevosregistros)} textElement={' Nuevos'} iconType="right-circle" styleColor={{ color: '#4DCE5C', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                        <DataDisplay numberElement={formatNumber(ent.bajas)} textElement={' Bajas'} iconType="right-circle" styleColor={{ color: '#EF4D26', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                        </div>
                       )
                    })}</div>)}
                    {entitiesYearActivesList && (
                    <div>
                    { sortingDataByTime(setTimeToYear, setTimeToMonth, setTimeToDay, setTimeToHour, 
                      entitiesYearActivesList, entitiesMonthActivesList, entitiesDayActivesList, entitiesHourActivesList).map(ent => {
                       return ( 
                        <DataDisplay numberElement={formatNumber(ent.clientesactivos)} textElement={' Activos'} iconType="right-circle" styleColor={{ color: '#F8E60B', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                       )})}</div>)}
                    </DataDisplayContainerElements> 
                    {entitiesYearList && !entitiesYearList.length &&(
                      <Empty/>
                    )}
                    {entitiesYearActivesList && !entitiesYearActivesList.length &&(
                      <Empty/>
                    )} 
              </DataContainer>): <PieContainerSpin><Spin/> </PieContainerSpin>}
            </DataDisplayContainer>
           
            <ChartContainerPie>
              <SubTitle>Ventas por Subfamilias</SubTitle>
              {
                fetchstStateSubfamily === STATUS.FETCHED_FAIL? <Empty/> : (
                <PieChartContainer>
                {
                  fetchstStateSubfamily === STATUS.FETCHED ?
                  <PieChartContainer>
                    {
                      !!subFamiliaData.length &&(
                        <PieChart
                          dataClient={subFamiliaChartData}
                          pos={['50%', '50%']}
                          textHtml={label1 + 'Ventas Subfamilias' + label2 + label3}
                          toolTipInfo = {toolTipPieSubfamilias1 + `{name}: <span style = "font-weight: 700; color: #595959">{value}${putEuroSymbolToPvm(setMasuringUnitToPVM)}</span>` + toolTipPieSubfamilias2}
                          alignYpos={'middle'}
                          colorSection={['subfamilia', (subfamilia) => { return colorControl(subfamilia) }]}
                          numeroPedidosType={setMasuringUnitToPedidos}
                          PVMtype={setMasuringUnitToPVM}
                        />
                      )
                    }
                    {
                      !subFamiliaData.length && (
                        <Empty/>
                      )
                    }

                    <PieDatsDisplayContainer>
                      {subfamilyDataSortedByBiggestNumber && subFamiliaDataLegend.length ? [...subFamiliaDataLegend].map(subfamily => {
                        
                        if (setMasuringUnitToPedidos && subfamily.totalnumero) {
                          return (
                            
                            <DataDisplayPie numberElement={subfamily.totalnumero} textElement={subfamily.subfamilia.toLowerCase()} iconType="pie-chart" styleColor={{ color: colorControl(subfamily.subfamilia), padding: '0px 10px 0px 0px' }} ></DataDisplayPie>
                          )
                        }
                        if (setMasuringUnitToPVM && subfamily.totalpvm) {
                          return (
                            <DataDisplayPie numberElement={subfamily.totalpvm} textElement={subfamily.subfamilia.toLowerCase()} iconType="pie-chart" styleColor={{ color: colorControl(subfamily.subfamilia), padding: '0px 10px 0px 0px' }} ></DataDisplayPie>
                          )
                        }
                      }): '' }

                    </PieDatsDisplayContainer>
                  </PieChartContainer> : (
                  <PieContainerSpin>
                    <Spin/>
                  </PieContainerSpin>
                )}
                </PieChartContainer>
              )}

            </ChartContainerPie>
          </EntitiesChartPieContainer>
        </ChartContainerLineDonut>
     
      <ClientsChartTitleContainer>
        <SubTitle>Actividad de Clientes</SubTitle>        
        <ClientsChartContainer>
        { fetchStateClientsActive === STATUS.FETCHED ?
        <ChartLegendContainer>
          {clientsDataActives.length?
            <ChartContainer>
              <ContainerUpData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataActives)[0].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataActives)[0].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActives[0].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataActives)[1].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataActives)[1].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActives[1].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
              </ContainerUpData>
              <DonutChart
                dataClient={clientsDataActives ? tranformDataForDonutClient(clientsDataActives) : ''}
                pos={['50%', '50%']}
                textHtml={label1 + 'Activos' + label2 + formatNumber(clientsDataActives[0].totalActive)+ label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />
              <ContainerDownData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataActives)[2].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataActives)[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActives[2].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
              </ContainerDownData>
            </ChartContainer> 
           : <Empty/>}</ChartLegendContainer>: <DonutContainerSpin><Spin/></DonutContainerSpin>}
        { fetchStateClientsInactive === STATUS.FETCHED ?
           <ChartContainer>
          {clientsDataInactives.length?
            <ChartContainer>
             
              <ContainerUpData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataInactives)[0].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataInactives)[0].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataInactives[0].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataInactives)[1].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataInactives)[1].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataInactives[1].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
              </ContainerUpData> 
              <DonutChart
                dataClient={clientsDataInactives ? tranformDataForDonutClient(clientsDataInactives) : ''}
                pos={['50%', '50%']}
                textHtml={label1 + 'Inactivos' + label2 + formatNumber(clientsDataInactives[0].totalInactive) + label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />
              <ContainerDownData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataInactives)[2].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataInactives)[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataInactives[2].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients ></DataDisplay>
              </ContainerDownData>
            </ChartContainer> : <Empty/>} </ChartContainer> :  <DonutContainerSpin><Spin/></DonutContainerSpin>}
           
        </ClientsChartContainer>
      </ClientsChartTitleContainer>
      </ContainerClientsActivityAndStatistics>
    </StaticticsContainer>
   </TabPane>
   <TabPane tab={"Tareas Pendientes"} key={"2"}>
    <TaskContainer>
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
    </TabPane>
    </Tabs>
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
