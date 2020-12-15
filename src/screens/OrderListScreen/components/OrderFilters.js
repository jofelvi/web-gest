import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { takeLatest, call, put } from 'redux-saga/effects';

import {Button, Col, Row, Select} from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

import * as apiClientes from '../../../modules/clients-indas/api';
import {DatePickerFromTo, InputBox, InputsContainer} from "../styled";
import OrderFilterEntity from "./OrderFilterEntity";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import * as moment from "moment";
import {modifyOrderDate} from "../utils";
import {searchOrder, countOrders, fetchOrders} from "../../../modules/orders/actions";
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;

class OrderFilters extends React.Component {

    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.searchedValue = this.searchedValue.bind(this)

        this.state = {
            searchByClient: '',
            searchByCodPedido: '',
            searchByState: '',
            searchByEntity: '',
            searchByType: '',
            page: props.page,
            searchByOrderDate: [],
            searchByOrderDateValue: [],
            expandFilters: false,
            searchByProduct: '',
            isFilterChanged: false,
        }
    }

    clearFilters = () => {
        this.setState({
            searchByClient: '',
            searchByOrderDateValue: [],
            searchByEntity: '',
            searchByCodPedido: '',
            searchByType: '',
            page: 0,
            searchByProduct: '',
            searchByState: '',
            searchByOrderDate: [],
            expandedKeys: [],
            isFilterChanged: false,

        }, this.setFilters)

    }

    searchedValue = (key, value) => {
        if (typeof (value) == 'undefined') {
            this.setState({ [key]: '', isFilterChanged: true })
        } else {
            this.setState({ [key]: value, isFilterChanged: true })
        }

    }

    searchedValueDate = (dateString) => {
        if (dateString[0] && dateString[1]) {

            this.setState({
                ...this.state,
                searchByOrderDate: [
                    moment(dateString[0]).startOf('day').toDate().toISOString(),
                    moment(dateString[1]).endOf('day').toDate().toISOString(),
                ],
                searchByOrderDateValue: [
                    moment(dateString[0]),
                    moment(dateString[1])
                ], isFilterChanged: true
            });
        } else {
            this.setState({
                ...this.state,
                searchByOrderDate: [],
                searchByOrderDateValue: [],
                isFilterChanged: true
            });
        }

    }

    isFilterActive = () => {
        return (
            this.state.searchByOrderDate.length !== 0 ||
            this.state.searchByClient !== '' ||
            this.state.searchByEntity !== '' ||
            this.state.searchByState !== '' ||
            this.state.searchByType !== '' ||
            this.state.searchByProduct !== '' ||
            this.state.searchByCodPedido !== ''
        );
    }

    setFilters = () => {
        const { page, searchByState, searchByProduct, searchByOrderDate, searchByClient, searchByCodPedido, searchByEntity, searchByType, searchByOrderId } = this.state;
        this.setState({isFilterChanged: false})
        this.props.setFilters(this.state)
    }

    render() {
        const { page, searchByState,searchByProduct, searchByOrderDate, searchByClient, searchByCodPedido, searchByEntity, searchByType, searchByOrderId } = this.state;
       return (
           <div className="table-filters-indas">
               <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                   <Row style={{width: '100%', marginBottom: 0}}>
                       <Col span={18} style={{padding: '10px'}}>
                           <span style={{padding: '10px'}}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                           <OrderFilterEntity
                               value={searchByEntity}
                               onChange={ (entity) => this.searchedValue('searchByEntity', entity) }
                               onChangeClient={ (client) => this.searchedValue('searchByClient', client) }
                           />
                       </Col>

                       <Col span={6} style={{padding: '10px'}}>
                           <span style={{padding: '10px'}}>Código Cliente</span>
                           <InputBox
                               placeholder="Código Cliente"
                               value={searchByClient}
                               onChange={(event) => this.searchedValue('searchByClient', event.target.value)}
                               style={{width: '100%'}}
                           />
                       </Col>
                   </Row>
               </InputsContainer>
               <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
                   <Row style={{width: '100%'}}>
                       <Col span={8} style={{padding: '10px', paddingTop: 0}}>
                           <span style={{padding: '10px'}}>Intervalo de fechas</span>
                           <DatePickerFromTo
                               style={{width: '100%'}}
                               format={dateFormat}
                               onChange={this.searchedValueDate}
                               placeholder={['desde', 'hasta']}
                               value={this.state.searchByOrderDateValue}
                           />
                       </Col>
                       <Col span={6} style={{padding: '10px', paddingTop: 0}}>
                           <span style={{padding: '10px'}}>Cód. Pedido</span>
                           <InputBox
                               placeholder="Cód. Pedido"
                               value={searchByCodPedido}
                               onChange={(event) => this.searchedValue('searchByCodPedido', event.target.value)}
                               style={{width: '100%',marginTop: '10px' }}
                           />
                       </Col>
                       <Col span={5} style={{padding: '10px', paddingTop: 0}}>
                           <span style={{padding: '10px'}}>Tipo</span>
                           <Select
                               value={searchByType}
                               onChange={(value) => this.searchedValue('searchByType', value)}
                               style={{width: '100%', marginTop: '10px', marginLeft:10 }}
                           >

                               <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                               <Option value="Pedidos">Pedidos</Option>
                               <Option value="Puntos">Puntos</Option>
                           </Select>
                       </Col>

                       <Col span={5} style={{padding: '10px', paddingTop: 0}}>
                           <span style={{padding: '10px'}}>Estado</span>
                           <Select
                               value={searchByState}
                               onChange={(value) => this.searchedValue('searchByState', value)}
                               style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                           >
                               <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                               { this.props.states && this.props.states.map( (stateObject) => {
                                   return (
                                       <Option value={stateObject.codestado}>{stateObject.nombre}</Option>
                                   );
                               } ) }
                           </Select>
                       </Col>

                   </Row>

               </InputsContainer>
               <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
                   <Row style={{width: '100%'}}>
                       <Col span={12} style={{padding: '10px', paddingTop: 0}}>
                           <span style={{padding: '10px'}}>Producto</span>
                           <Select
                               value={searchByProduct}
                               onChange={(value) => this.searchedValue('searchByProduct', value)}
                               style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                               showSearch
                               allowClear
                               filterOption={(input, option) => {
                                   if (option.props.children.length > 0) {
                                       var convertedChildren = [];
                                       for(var i = 0; i < option.props.children.length; ++i)  {
                                           convertedChildren.push(option.props.children[i]);
                                       }
                                       return convertedChildren.join(',').toLowerCase().indexOf(input.toLowerCase()) >= 0
                                   }

                                   return option.props.children ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                                }
                               }
                           >
                               <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                               { this.props.products && this.props.products.map( (stateObject) => {
                                   return (
                                       <Option value={stateObject.codindas}>{stateObject.codindas} - {stateObject.nombre}</Option>
                                   );
                               } ) }
                           </Select>
                       </Col>
                   </Row>
               </InputsContainer>
               <InputsContainer style={{width: '100%', marginTop: 0, paddingTop: 0}}>
                   <Row style={{width: '100%'}}>
                       <Col span={24} align="right">
                           <div style={{alignSelf: 'flex-end'}}>
                               <a
                                   style={{ fontSize: 12 }}
                                   onClick={() => {
                                       this.setState({expandFilters: !this.state.expandFilters});
                                   }}
                               >
                                   {this.state.expandFilters ? <React.Fragment><UpOutlined /> Mostar menos</React.Fragment> : <React.Fragment><DownOutlined /> Mostar más</React.Fragment>}
                               </a>

                               <Button
                                   icon= 'search'
                                   type="primary"
                                   disabled={!this.isFilterActive() || (this.isFilterActive() && !this.state.isFilterChanged )}
                                   style={{alignSelf: 'flex-end', margin: '0px 10px 0px 10px'}}
                                   onClick={() => {
                                       this.setState({ page: 0 }, this.setFilters)
                                   }}
                               >Filtrar</Button>
                               <Button
                                   icon= 'delete'
                                   disabled={!this.isFilterActive()}
                                   style={{alignSelf: 'flex-end', margin: '0px 0px 0px 0px'}}
                                   onClick={this.clearFilters}
                               >Limpiar</Button>
                           </div>
                       </Col>
                   </Row>

               </InputsContainer>
           </div>
       );
    };

}
OrderFilters.propTypes = {
};

export default connect( ( state ) => ({
    states: state.orders.states,
    products: state.orders.products,
}), { searchOrder, countOrders, fetchOrders } )( OrderFilters );
