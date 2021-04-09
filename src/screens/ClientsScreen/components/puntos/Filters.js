import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider, Radio} from 'antd';
import {DatePickerFromTo, InputBox, InputsContainer} from "../../../../lib/styled";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {get} from "lodash";
import * as moment from "moment";
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class PuntosFilters extends React.Component {
    constructor(props) {
        super(props)
        this.setFilters = this.setFilters.bind(this)
        this.searchedValue = this.searchedValue.bind(this)

        this.state = {
            codpedido_origen: get( props, 'filters.codpedido_origen', ''),
            fechas: get( props, 'filters.fechas', []),
            fechasValue: get( props, 'filters.fechasValue', []),
        }
    }

    clearFilters = () => {
        this.setState({
            codpedido_origen: '',
            fechasValue: [],
            fechas: [],
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
            this.state.codpedido_origen !== ''
        );
    }

    setFilters = () => {
        this.setState({isFilterChanged: false})
        this.props.setFilters(this.state)
    }

    render() {

        const { codpedido_origen } = this.state;

        return (
            <div className="table-filters-indas">
                <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                    <Row key={'filters_b'} style={{width: '100%', marginBottom: 0}}>
                        <Col span={12} style={{ padding: '10px'}} key={'col_1'}>
                                <div style={{padding: '0 10px 0 10px'}}>Rango de fechas:</div>
                                <DatePickerFromTo
                                    style={{width: '100%'}}
                                    format={dateFormat}
                                    onChange={this.searchedValueDate}
                                    placeholder={['desde', 'hasta']}
                                    value={this.state.fechasValue}
                                />
                        </Col>
                        <Col span={6} style={{padding: '10px'}} key={'col_2'}>
                            <span style={{padding: '10px'}}>Código Pedido</span>
                            <InputBox
                                placeholder="Código Pedido"
                                value={codpedido_origen}
                                onChange = { ( { target }) => {
                                    this.searchedValue('codpedido_origen', target.value)
                                }}
                                style={{width: '100%'}}
                            />
                        </Col>
                    </Row>
                </InputsContainer>

                <InputsContainer style={{width: '100%', marginTop: 0, paddingTop: 0}}>
                    <Row style={{width: '100%'}}>
                        <Col span={24} align="right">
                            <div style={{alignSelf: 'flex-end'}}>

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
PuntosFilters.propTypes = {
};

export default  connect(
    state => ({
    }),
    {  }
)( PuntosFilters );
