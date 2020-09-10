import React from "react";

import { Container } from './styles';
import {Tabs, Table} from 'antd';
import { columns } from './constants'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

  const TabsTaskDetail = ({
    title,
    data,
    dataForTable,
    tableKey,
  ...rest}) => {     
    return(     
  <Container> 
    <Tabs defaultActiveKey="1" onChange={callback} style={{width: '100%', height: 'fit-content'}} >
    <TabPane tab={"Datos"} key={"1"}  style={{width: '100%', height: '100%', maxHeight: '220px', overflow: 'auto'}}>
      <Table 
      defaultCurrent={2} 
      pagination={{defaultCurrent: tableKey ? 1 : ''}}
      key = {tableKey}
      dataSource={dataForTable} 
      columns={columns}> 
      </Table>
    </TabPane>
    <TabPane tab={"Diagrama"} key={"2"}  style={{width: '100%', height: '100%'}}>
    </TabPane>
    <TabPane tab={"Historial"} key={"3"}  style={{width: '100%', height: '100%'}}>
    </TabPane>
    </Tabs>
  </Container>
        )
    }
    TabsTaskDetail.propTypes = {
 
    };
    export default TabsTaskDetail;