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
  PieDatsDisplayContainer,
  EntitiesChartPieContainer,
  SubTitleVentas,
  ButtonsPeriodQuantityContainer,
  ContainerButtonsTitle,
  ContainerClientsActivityAndStatistics,
  ContainerSpin,
  ContainerChartSpinner,
  PieContainerSpin,
  ChartLegendContainer

} from './styled';
import LineChart from '../../components/LineChart/view.js';
import DonutChart from '../../components/DonutChart/view.js';
import PieChart from '../../components/PieChart/view.js';
import ButtonTasks from '../../components/ButtonTasks/view.js';
import ButtonPeriod from '../../components/ButtonPeriod/view.js';
import DataDisplay from '../../components/DataDisplay/view.js';
import DataDisplayPie from '../../components/DataDisplayPie/view.js';

import ButtonQuantity from '../../components/ButtonQuantity/view.js';

import { STATUS } from '../../modules/charts/constants'
import utils from '../../lib/utils';
import { tranformDataForDonutClient, tranformDataForDonut, colorControl, sortingNumbers, sortingDataByTime } from './utils'
import {calculatePercentage, calculatePercentageCLients} from "./utils_date"
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
  monthList,
  monthsList,
  dayList,
  daysList,
  hourList,
  fetchSalesByYear,
  fetchSalesByMonth,
  fetchSalesByDay,
  fetchSalesByHour,
  entitiesList,
  entitiesYearList,
  entitiesYearActivesList,
  entitiesMonthList,
  entitiesMonthActivesList,
  entitiesDayList,
  entitiesDayActivesList,
  entitiesHourList,
  entitiesHourActivesList,
  subfamiliesList,
  subfamiliesListYear,
  subfamiliesListMonth,
  subfamiliesListDay,
  subfamiliesListHour,
  clientsData,
  fetchClientsData,
  clientsDataActives,
  clientsDataInactives,
  fetchPendingTasks,
  pendingTasks,
  fetchStateCli,
  fetchStateLineChart,
  fetchStateClients,
  fetchstStateSubfamily,
  fetchStateClientsActive,
  fetchStateClientsInactive,
  activesEntitiesList
}) => {
  const [numeroPedidos, setNumeroPedidos] = useState(false);
  const [numeroPVM, setNumeroPVM] = useState(false);
  const [timeYear, setTimeYear] = useState(false);
  const [timeMonth, setTimeMonth] = useState(false);
  const [timeDay, setTimeDay] = useState(false);
  const [timeHour, setTimeHour] = useState(false);

  const testIfThereIsTask = (idTask, util, history)=>{
    if (util.getTaskId() || idTask) {
      const id = utils.getTaskId();
      return fetchTaskForm({ idTask: id || idTask, history });
    }
  }

  useEffect(()=>{
    async function fetchData() {
      await testIfThereIsTask(taskId, utils, history);
      await fetchSalesByYear();
      await fetchSalesByDay();
      await fetchSalesByMonth();
      await fetchSalesByHour();
      setInterval(async()=>{
       await fetchSalesByHour();
      }, 180000);
      await fetchClientsData();
      await fetchPendingTasks();
    }
    fetchData();  
    setTimeYear(true);
    setNumeroPVM(true);
 }, [fetchClientsData, fetchPendingTasks, fetchSalesByYear, fetchSalesByMonth, fetchSalesByHour, fetchSalesByDay, taskId, fetchTaskForm]);

  let subfamilyDataSortedByBiggestNumber = sortingNumbers( sortingDataByTime(timeYear, timeMonth, timeDay, timeHour, 
    subfamiliesListYear, subfamiliesListMonth, subfamiliesListDay,subfamiliesListHour), numeroPVM, numeroPedidos)

  const id = utils.getTaskId() ? utils.getTaskId() : taskId;
 
  if (id && procId && !completed) {
    return <Redirect to={`/task/${taskId}/process/${procId}`} />;
  }

  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }

  const salesLineChartData = yearList || monthsList || daysList || hourList ? sortingDataByTime(timeYear, timeMonth, timeDay, timeHour, yearList,
    monthsList, daysList, hourList) : [];
    
  const subFamiliaData = subfamilyDataSortedByBiggestNumber ? sortingNumbers(sortingDataByTime(timeYear, timeMonth, timeDay, timeHour, 
    subfamiliesListYear, subfamiliesListMonth, subfamiliesListDay, subfamiliesListHour), numeroPVM, numeroPedidos) : []

  const subFamiliaDataLegend = subFamiliaData.length ? calculatePercentage(subFamiliaData.slice(0, 5), numeroPedidos , numeroPVM) : [];

  const subFamiliaChartData = subFamiliaData.length ? tranformDataForDonut(subFamiliaData, numeroPVM, numeroPedidos): [];
console.log("subfamilia", subFamiliaChartData)
  return <ContentContainer>
    <Tabs defaultActiveKey="1"  onChange={callback} style={{width: '100%', height: '88vh'}}>
  <TabPane tab={"Estadísticas"} key={"1"}  style={{width: '100%', height: '100%'}}>
    <StaticticsContainer>
        <ButtonsPeriodQuantityContainer>
          <ContainerButtonsTitle>
            <SubTitle>Periodo</SubTitle>
            <ButtonPeriod
              
              onClickDay={() => {
                fetchPendingTasks();
                setTimeDay(true);
                setTimeYear(false);
                setTimeMonth(false);
                setTimeHour(false);
              }}
              clickDay= {timeDay}
              onClickHour={() => {
                setTimeHour(true);
                setTimeYear(false);
                setTimeMonth(false);
                setTimeDay(false);
              }}
              clickHour= {timeHour}
              onClickMonth={() => {
                setTimeMonth(true);
                setTimeYear(false);
                setTimeDay(false);
                setTimeHour(false);
              }}
              clickMonth = {timeMonth}
              onClickYear={() => {
                setTimeYear(true);
                setTimeMonth(false);
                setTimeDay(false);
                setTimeHour(false);
              }}
              clickYear = {timeYear}
              > </ButtonPeriod>
          </ContainerButtonsTitle>
          <ContainerButtonsTitle>
            <SubTitle>Unidades</SubTitle>
            <ButtonQuantity 
            clickNumeroPedidos = {numeroPedidos}
            clickPVM = {numeroPVM}
            onClickNumeroPedido={() => {
              setNumeroPedidos(true)
              setNumeroPVM(false)
            }} onClickPVM={() => {
              setNumeroPVM(true)
              setNumeroPedidos(false)
            }}></ButtonQuantity>
          </ContainerButtonsTitle>
        </ButtonsPeriodQuantityContainer>
        <ContainerClientsActivityAndStatistics>
      
        <ChartContainerLineDonut>

        {
        fetchStateLineChart === STATUS.FETCHED_FAIL?<span>Error fetching data</span> :
     <ContainerChartSpinner>
        {fetchStateLineChart === STATUS.FETCHED ?
        
          <ChartContainerLine>  
            {
            !!salesLineChartData.length && (
            <LineChart dataLine={salesLineChartData} numeroPedidosType={numeroPedidos} PVMtype={numeroPVM} />
            )}
            {!
            salesLineChartData.length &&(
            <Empty/>
            )}
          </ChartContainerLine>: <ContainerSpin><Spin/></ContainerSpin>}</ContainerChartSpinner>
          
          }
          <EntitiesChartPieContainer>
            <DataDisplayContainer>
              <SubTitle>Clientes transferindas</SubTitle>
              
              {fetchStateClients === STATUS.FETCHED ? (   
               
              <DataContainer>   
                 
                    <DataDisplayContainerElements>
                    {entitiesYearList  && (
                      <div>
                    {sortingDataByTime(timeYear, timeMonth, timeDay, timeHour, 
                      entitiesYearList, entitiesMonthList, entitiesDayList, entitiesHourList).map(ent => {
                       return ( 
                         <div>
                        <DataDisplay numberElement={ent.nuevosregistros} textElement={' Nuevos'} iconType="right-circle" styleColor={{ color: '#4DCE5C', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                        <DataDisplay numberElement={ent.bajas} textElement={' Bajas'} iconType="right-circle" styleColor={{ color: '#EF4D26', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
                        </div>
                       )
                    })}</div>)}
                    {entitiesYearActivesList && (
                    <div>
                    { sortingDataByTime(timeYear, timeMonth, timeDay, timeHour, 
                      entitiesYearActivesList, entitiesMonthActivesList, entitiesDayActivesList, entitiesHourActivesList).map(ent => {
                       return ( 
                        <DataDisplay numberElement={ent.clientesactivos} textElement={' Activos'} iconType="right-circle" styleColor={{ color: '#F8E60B', fontSize: '14px', padding: '0px 10px 0px 0px' }} ></DataDisplay>
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
                      !!subFamiliaData.length && subFamiliaDataLegend.length &&(
                        <PieChart
                          dataClient={subFamiliaChartData}
                          pos={['50%', '50%']}
                          textHtml={label1 + 'Ventas Subfamilias' + label2 + label3}
                          toolTipInfo = {toolTipPieSubfamilias1 + `{name}: <span style = "font-weight: 700; color: #595959">{value}</span>` + toolTipPieSubfamilias2}
                          alignYpos={'middle'}
                          colorSection={['subfamilia', (subfamilia) => { return colorControl(subfamilia) }]}
                          numeroPedidosType={numeroPedidos}
                          PVMtype={numeroPVM}
                        />
                      )
                    }
                    {
                      !subFamiliaData.length && (
                        <Empty/>
                      )
                    }

                    {console.log("subfamilia data legend", subFamiliaDataLegend[0].totalnumero)}
                    <PieDatsDisplayContainer>
                      {subfamilyDataSortedByBiggestNumber && subFamiliaDataLegend.length ? [...subFamiliaDataLegend].map(subfamily => {
                        
                        if (numeroPedidos && subfamily.totalnumero) {
                          return (
                            
                            <DataDisplayPie numberElement={subfamily.totalnumero} textElement={subfamily.subfamilia.toLowerCase()} iconType="pie-chart" styleColor={{ color: colorControl(subfamily.subfamilia), padding: '0px 10px 0px 0px' }} ></DataDisplayPie>
                          )
                        }
                        if (numeroPVM && subfamily.totalpvm) {
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
                textHtml={label1 + 'Activos' + label2 + clientsDataActives[0].totalActive + label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />
              <ContainerDownData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataActives)[2].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataActives)[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataActives[2].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients></DataDisplay>
              </ContainerDownData>
            </ChartContainer> 
           : <Empty/>}</ChartLegendContainer>: <PieContainerSpin><Spin/></PieContainerSpin>}
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
                textHtml={label1 + 'Inactivos' + label2 +clientsDataInactives[0].totalInactive+ label3}
                alignYpos={'middle'}
                colorSection={['periodo', (periodo) => { return colorControl(periodo) }]} />
              <ContainerDownData>
                <DataDisplay numberElement={calculatePercentageCLients(clientsDataInactives)[2].porcentaje + ' %'} textElement={calculatePercentageCLients(clientsDataInactives)[2].periodo} iconType="pie-chart" styleColor={{ color: colorControl(clientsDataInactives[2].periodo), padding: '0px 10px 0px 0px' }} dataDisplayClients ></DataDisplay>
              </ContainerDownData>
            </ChartContainer> : <Empty/>} </ChartContainer> :  <PieContainerSpin><Spin/></PieContainerSpin>}
           
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
