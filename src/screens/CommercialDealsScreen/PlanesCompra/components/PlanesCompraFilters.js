import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { takeLatest, call, put } from 'redux-saga/effects';

import { Checkbox, Button, Col, Row, Select} from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

import {DatePickerFromTo, InputBox, InputsContainer }  from '../../../../lib/styled';
import OrderFilterEntity from "../../../OrderListScreen/components/OrderFilterEntity";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import * as moment from "moment";

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

class PlanesCompraFilters extends React.Component {
    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.searchedValue = this.searchedValue.bind(this)

        this.state = {
            idcliente: '',
            idestado: '',
            searchByEntity: '',
            page: props.page,
            fechas: [],
            fechasValue: [],
            expandFilters: false,
            coddelegado: '',
            isFilterChanged: false,
            contareaspendientes: false,
        }
    }

    clearFilters = () => {
        this.setState({
            idcliente: '',
            fechasValue: [],
            searchByEntity: '',
            page: 0,
            coddelegado: '',
            idestado: '',
            fechas: [],
            expandedKeys: [],
            isFilterChanged: false,
            contareaspendientes: false,

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
                fechas: [
                    moment(dateString[0]).startOf('day').format( 'YYYY-MM-DD' ),
                    moment(dateString[1]).endOf('day').format( 'YYYY-MM-DD' ),
                ],
                fechasValue: [
                    moment(dateString[0]),
                    moment(dateString[1])
                ], isFilterChanged: true
            });
        } else {
            this.setState({
                ...this.state,
                fechas: [],
                fechasValue: [],
                isFilterChanged: true
            });
        }

    }

    isFilterActive = () => {
        return (
            this.state.fechas.length !== 0 ||
            this.state.idcliente !== '' ||
            this.state.searchByEntity !== '' ||
            this.state.idestado !== '' ||
            this.state.coddelegado !== '' ||
            this.state.contareaspendientes !== ''
        );
    }

    setFilters = () => {
        this.setState({isFilterChanged: false})
        this.props.setFilters(this.state)
    }

    render() {

        const { page, idcliente, searchByPlanDate, idestado, coddelegado, searchByEntity } = this.state;

        return (
            <div className="table-filters-indas">
                <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                    <Row style={{width: '100%', marginBottom: 0}}>
                        <Col span={18} style={{padding: '10px'}}>
                            <span style={{padding: '10px'}}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                            <OrderFilterEntity
                                column={"idcliente"}
                                value={searchByEntity}
                                onChange={ (entity) => this.searchedValue('searchByEntity', entity) }
                                onChangeClient={ (client) => this.searchedValue('idcliente', client) }
                            />
                        </Col>

                        <Col span={6} style={{padding: '10px'}}>
                            <span style={{padding: '10px'}}>Código Cliente</span>
                            <InputBox
                                placeholder="Código Cliente"
                                value={idcliente}
                                onChange={(event) => this.searchedValue('idcliente', event.target.value)}
                                style={{width: '100%'}}
                            />
                        </Col>
                    </Row>
                </InputsContainer>
                <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
                    <Row style={{width: '100%'}}>
                        <Col span={8} style={{padding: '10px', paddingTop: 0}}>
                            <span style={{padding: '10px'}}>PC vigentes en este intervalo</span>
                            <DatePickerFromTo
                                style={{width: '100%'}}
                                format={dateFormat}
                                onChange={this.searchedValueDate}
                                placeholder={['desde', 'hasta']}
                                value={this.state.fechasValue}
                            />
                        </Col>

                        <Col span={11} style={{padding: '10px', paddingTop: 0}}>
                            <span style={{padding: '10px'}}>Delegado Comercial</span>
                            <Select
                                value={coddelegado}
                                onChange={(value) => this.searchedValue('coddelegado', value)}
                                style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                                showSearch
                                allowClear
                                filterOption={(input, option) => {
                                    return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) > -1)
                                } }
                            >
                                <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                                { this.props.delegados && this.props.delegados.map( (delegado) => {
                                    return (
                                        <Option value={delegado.coddelegado}>{delegado.nombre}</Option>
                                    );
                                } ) }
                            </Select>
                        </Col>

                        <Col span={5} style={{padding: '10px', paddingTop: 0}}>
                            <span style={{padding: '10px'}}>Estado</span>
                            <Select
                                value={idestado}
                                onChange={(value) => this.searchedValue('idestado', value)}
                                style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                            >
                                <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                                <Option value="0">Borrador</Option>
                                <Option value="1">Activo</Option>
                                <Option value="2">Inactivo</Option>
                            </Select>
                        </Col>

                    </Row>
                </InputsContainer>
                <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
                    <Row style={{width: '100%'}}>
                        <Col span={8} style={{padding: '20px', paddingTop: 0}}>
                            <Checkbox
                                checked={this.state.contareaspendientes}
                                onChange={(e) => this.searchedValue('contareaspendientes', e.target.checked) }
                            >
                                Ver solo planes con tareas pendientes.
                            </Checkbox>
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
PlanesCompraFilters.propTypes = {
};

export default connect( ( state ) => ({
    delegadosComerciales: state.planesCompra.delegadosComerciales
}), {  } )( PlanesCompraFilters );
