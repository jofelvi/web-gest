import React, { useEffect, Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Descriptions, Icon, Button } from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../constants';
import './styles.css'
import { 
  InputsContainer, 
  Maincontainer, 
  InputBox, 
  DatePickerFromTo, 
  PaginationButton, 
  ButtonsContainer, 
  SerachOrdersButton, 
  InfoContainer, 
  MainContainerModal,
  TableContainer,
} from './styled';
import Utils from '../../lib/utils';
import {pedidos} from '../../constants';
import {cliente} from '../../constants';
import ModalDetailOrder from '../../components/ModalDetailOrder';
import {} from './styled'
import InfoCardEntity from '../../components/InfoCardEntity/view';
import InfoCardClient from '../../components/InfoCardClient/view';
import InfoCardOrder from '../../components/InfoCardOrder/view';

const dateFormat = 'YYYY/MM/DD';
const { Column, ColumnGroup } = Table;

class OrderListScreen extends React.Component {

  state = {
    searchByDateFrom: '',
    searchByDateTo: '',
    searchByClient: '',
    searchByEntity: '',
    searchByType: '',
    pag: 0,
    buttonIsvisible: false,
    searchByOrderDate: [],
    visible: false,
  }
  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ]

  componentDidMount() {

    this.props.fetchOrders(this.state.pag)

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  modifyOrderDate = (order) =>{
    const newOderList = [];
    
   let orderFilterd={}
  order.map( ord => {
      let date = ord.fecha_alta
      
    orderFilterd = {...ord,
    fecha_alta: Utils.renderDate(date)
    };
    
   
   return newOderList.push(orderFilterd);
  })
  
  return newOderList;
  
  }
  
  

  searchedValue = (key, value) => {

    this.setState({ [key]: value })
  }
  searchedValueDate = (date, dateString) => {
    if (dateString[0]&& dateString[1]) {
      
      this.setState({
        ...this.state,
        searchByOrderDate: [
          moment(dateString[0]).startOf('day').toDate().toISOString(),
          moment(dateString[1]).endOf('day').toDate().toISOString(),
        ],
      });
    }
    
  }

  handleSubmitOrdersSearch = () => {
  
    const { searchOrder } = this.props;
    const { searchByDateFrom, pag, searchByDateTo,searchByOrderDate, searchByClient, searchByEntity, searchByType } = this.state;

    searchOrder({
      fecha_desde: searchByDateFrom,
      fecha_hasta: searchByDateTo,
      codentidad_cbim: searchByEntity,
      tipo: searchByType,
      codcli_cbim: searchByClient,
      pages: pag,
      dates : searchByOrderDate

    })

  }
  
  render() {
    const { searchByClient, searchByEntity, searchByType } = this.state;
    const { orders, order, fetchOrderById, entity } = this.props;   
   
 
    return (
      <Maincontainer>
 <div className="table-indas">
                <h2 className="table-indas-title">Pedidos</h2>
        <InputsContainer>

          <DatePickerFromTo
            format={dateFormat}
            onChange={this.searchedValueDate}
            placeholder = {['desde', 'hasta']}
          />

          <InputBox
            placeholder="Código Cliente"
            value={searchByClient}
            onChange={(event) => this.searchedValue('searchByClient', event.target.value)}
          />

          <InputBox
            placeholder="Código Entidad"
            value={searchByEntity}
            onChange={(event) => this.searchedValue('searchByEntity', event.target.value)}
          />

          <InputBox
            placeholder="Tipo"
            value={searchByType}
            onChange={(event) => this.searchedValue('searchByType', event.target.value)}
          />

          <SerachOrdersButton
            icon="search"
            onClick={() => {
              this.setState({ pag: 0 }, function () {
                this.handleSubmitOrdersSearch()
              })
            }} />

        </InputsContainer>
            <TableContainer>
        <Table dataSource={this.modifyOrderDate(orders)} className="table" pagination={false} scroll={{x:true}}>
              
          <Column
            title="nº pedido"
            dataIndex="idpedido"
            key="idpedido"
          />

          <Column
            title="Fecha"
            dataIndex="fecha_alta"
            key="fecha_alta" />

          <Column
            title="Entidad"
            dataIndex="nomentidad_cbim"
            key="nomentidad_cbim" />

          <Column
            title="Cod. Cliente"
            dataIndex="codcli_cbim"
            key="codcli_cbim"

          />

          <Column
            title="Tipo"
            dataIndex="tipo"
            key="tipo" />

          <Column
            title="Mayorista"
            dataIndex="nombre_mayorista"
            key="nombre_mayorista" />

          <Column
            title="Estado"
            dataIndex="estado"
            key="estado" />

          <Column
            title="Ver detalle"
            key="operation" 
            render ={(text, row) => <Button onClick= {() => {
              const id = row.idpedido
              this.showModal();
              fetchOrderById({ id });
             }}>Ver detalle</Button>} />

        </Table>
        </TableContainer>
   <ModalDetailOrder 
   visibility ={this.state.visible} 
   ok= {this.handleOk} 
   cancel= {this.handleCancel}
   customFooter = {[]}
   content = { 
     <MainContainerModal>
   {order && entity ? 
   <div>    
   <InfoCardClient/>
   <InfoCardEntity
   codEntity = {entity.codentidad_cbim}
   company = {entity.nomentidad_cbim}
   tEntity = {''}
   stateEntity = {entity.estado}
   addressEntity = {entity.direccion}
   zipcodeEntity = {''}
  //  cityEntity = {}
  //  provinceEntity = {}
   />
   
   <InfoCardOrder
   numOrder = {order.idpedido}
   dateOrder = {Utils.renderDate(order.fecha_alta)}
   stateOrder = {order.estado}
   dateModOrder = {order.fecha_modif === null? '' : Utils.renderDate(order.fecha_modif)}
   typeOrder = {order.tipo}
   codDiscountOrder = {order.codcupon}
   detailOrder = {order.lineas}
  />
  
   </div> : ''}
    </MainContainerModal>
  }
   ></ModalDetailOrder>

        <ButtonsContainer>
          <PaginationButton
            icon="arrow"
            onClick={() => { Math.sign(this.state.pag) <= 0 ? this.setState({ pag: 0 }) : this.setState({ pag: this.state.pag - LIMIT }, function () { this.handleSubmitOrdersSearch() }) }}>
            <Icon type="left" /></PaginationButton>
          <PaginationButton
            icon="arrow"
            onClick={() => {
              this.setState({ pag: this.state.pag + LIMIT }, function () { this.handleSubmitOrdersSearch() })
            }}>
            <Icon type="right" /></PaginationButton>

        </ButtonsContainer>
</div>
      </Maincontainer>
    );
  }
};


OrderListScreen.propTypes = {
  searchOrder: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default OrderListScreen;
