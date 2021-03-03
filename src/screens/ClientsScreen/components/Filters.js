import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider, Radio} from 'antd';
import {DatePickerFromTo, InputBox, InputsContainer} from "../../../lib/styled";
import OrderFilterEntity from "../../OrderListScreen/components/OrderFilterEntity";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {get} from "lodash";
import * as moment from "moment";
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class ClientsFilters extends React.Component {
    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.searchedValue = this.searchedValue.bind(this)

        this.state = {
            idcliente: get( props, 'filters.idcliente', ''),
            codcli_cbim: get( props, 'filters.codcli_cbim', ''),
            idestado: get( props, 'filters.idestado', ''),
            searchByEntity: get( props, 'filters.searchByEntity', ''),
            page: props.page,
            especial: get( props, 'filters.especial', ''),
            fechas: get( props, 'filters.fechas', []),
            fechasValue: get( props, 'filters.fechasValue', []),
            expandFilters: get( props, 'filters.expandFilters', false),
            coddelegado: get( props, 'filters.coddelegado', ''),
            isFilterChanged: get( props, 'filters.isFilterChanged', false),
        }
    }

    clearFilters = () => {
        this.setState({
            idcliente: '',
            codcli_cbim: '',
            fechasValue: [],
            searchByEntity: '',
            page: 0,
            especial: '',
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

        const { page, idcliente, especial, searchByPlanDate, idestado, coddelegado, searchByEntity, codcli_cbim } = this.state;

        return (
            <div className="table-filters-indas">
                <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                    <Row key={'filters_b'} style={{width: '100%', marginBottom: 0}}>
                        <Col span={18} style={{padding: '10px'}}  key={'col_1'}>
                            <span style={{padding: '10px'}}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                            <OrderFilterEntity
                                column={"object"}
                                key={'filters_entity_search'}
                                value={searchByEntity}
                                onChange={ (entity) => this.searchedValue('searchByEntity', entity) }
                                onChangeClient={ (client) => {
                                    const idCliente = client ? client.idcliente : '';
                                    const codcliCbim = client ? client.codcli_cbim : '';
                                    this.searchedValue( 'idcliente', idCliente )
                                    this.searchedValue( 'codcli_cbim', codcliCbim )
                                } }
                            />
                        </Col>

                        <Col span={6} style={{padding: '10px'}} key={'col_2'}>
                            <span style={{padding: '10px'}}>Código Cliente</span>
                            <InputBox
                                placeholder="Código Cliente"
                                value={codcli_cbim}
                                disabled
                                style={{width: '100%'}}
                            />
                        </Col>
                    </Row>
                </InputsContainer>
                <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}} key={'filters_b_2'}>
                    <Row style={{width: '100%'}}>
                        <Col span={8} style={{padding: '10px', paddingTop: 0}}>
                            <span style={{padding: '10px'}}>Filtro especial</span>
                            <Select
                                value={especial}
                                onChange={ ( value ) => { this.searchedValue( 'especial', value ) } }
                                style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                            >
                                <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                                <Option value="activos">Solo clientes Activos</Option>
                                <Option value="inactivos">Solo clientes Inactivos</Option>
                                <Option value="altas">Altas</Option>
                                <Option value="bajas">Bajas</Option>
                                <Option value="sinplan">Clientes sin Plan de compra</Option>
                            </Select>
                            { ['activos', 'inactivos', 'altas', 'bajas' ].indexOf( especial ) > -1 && (
                                <React.Fragment>
                                    <div style={{padding: '10px', marginTop: '10px', paddingBottom: 0 }}>Rango de fechas del filtro especial:</div>
                                    <DatePickerFromTo
                                        style={{width: '100%'}}
                                        format={dateFormat}
                                        onChange={this.searchedValueDate}
                                        placeholder={['desde', 'hasta']}
                                        value={this.state.fechasValue}
                                    />
                                </React.Fragment>
                            ) }
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
                            <span style={{padding: '10px'}}>Estado cliente</span>
                            <Select
                                value={idestado}
                                onChange={(value) => this.searchedValue('idestado', value)}
                                style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                            >
                                <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                                <Option value="1">Activo</Option>
                                <Option value="2">Inactivo</Option>
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
ClientsFilters.propTypes = {
};

export default  connect(
    state => ({
        delegados: state.planesCompra.delegados,
    }),
    {  }
)( ClientsFilters );
