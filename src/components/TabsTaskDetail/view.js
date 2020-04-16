import React from "react";

import { Container, ButtonCustom, Label, ContainerData, ContainerDataLabel } from './styles';
import {Tabs, Table} from 'antd';
import { dataSource, columns } from './constants'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

  const TabsTaskDetail = ({
    title,
    data,
  ...rest}) => {        return(
         
  <Container> 
    <Tabs defaultActiveKey="1" onChange={callback} style={{width: '100%', height: 'fit-content'}} >
    <TabPane tab={"Datos"} key={"1"}  style={{width: '100%', height: '100%'}}>
      <Table dataSource={dataSource} columns={columns}></Table>
    </TabPane>
    <TabPane tab={"Diagrama"} key={"2"}  style={{width: '100%', height: '100%'}}>
    </TabPane>
    <TabPane tab={"Historial"} key={"3"}  style={{width: '100%', height: '100%'}}>
    </TabPane>
    </Tabs>
    {/* <ContainerDataLabel>
      <Label>{title}:</Label>
      <ContainerData>{data}</ContainerData>
    </ContainerDataLabel>
    <ButtonCustom {...rest} shape="circle" icon={'edit'} size= {'small'}></ButtonCustom>  */}
  </Container>
        )
    }
    TabsTaskDetail.propTypes = {
 
    };
    export default TabsTaskDetail;