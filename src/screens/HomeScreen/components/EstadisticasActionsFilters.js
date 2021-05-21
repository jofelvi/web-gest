import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider, Spin} from 'antd';
import * as moment from "moment";
import Utils from "../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {DatePickerFromTo, Maincontainer, TableContainer} from "../../../lib/styled";
import ResizableTable from "../../shared/ResizableTable";
import {LIMIT} from "../../../constants";
import {estados} from './../../../modules/clients-indas/api';
import * as api from "../../../modules/charts/api";
import {ExportOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';

const { Option } = Select;

const getYears = () => {
    let years = []
    for (var i = 2018; i <= parseInt(moment().format('YYYY')); i++) {
        years.push( i );
    }
    return years;
}
const validateYear = (string, callback) => {
    if ( parseInt(string) > 1990 && parseInt(string) <= parseInt(moment().format('YYYY') ) ) {
        callback(string)
    }
}
class EstadisticasActionsFilters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exportLoading: false,
        }
        this.searchedValueDesde = this.searchedValueDesde.bind(this);
        this.searchedValueHasta = this.searchedValueHasta.bind(this);
    }
    searchedValueDesde = (yearString) => {
        const {filters, setFilters} = this.props;
        const newFilters = {
            ...filters,
            desde: yearString,
        }
        setFilters( newFilters );
    }
    searchedValueHasta = (yearString) => {
        const {filters, setFilters} = this.props;
        const newFilters = {
            ...filters,
            hasta: yearString,
        }
        setFilters( newFilters );
    }

    render() {
        const { exportLoading } = this.state
        const { loading, filters, setFilters } = this.props;
        return (
            <div className="table-actions">
                <div className="table-action-button">
                    <Button
                        type="link"
                        style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0}}
                        onClick={
                            () => {
                                this.setState({exportLoading: true})
                                api.exportStats({ desde: filters.desde, hasta: filters.hasta} , () => {
                                    this.setState({exportLoading: false})
                                }, (errorMessage) => {
                                    this.setState({exportLoading: false})
                                    alert(errorMessage)

                                })
                            }
                        }
                    >
                        {exportLoading ? <Spin/> : <ExportOutlined style={{fontSize: '20px'}}/> }
                    </Button>
                    <span style={{ marginLeft: '10px', marginRight: '5px'}}>Año inicio:</span>
                    <Select
                        style={{width: '200px'}}
                        type="text"
                        disabled={loading}
                        onChange={(e) => { this.searchedValueDesde(e) } }
                        defaultValue={filters.desde}
                    >
                        { getYears().map( (year) => (<Option value={year}>{year}</Option>) ) }
                    </Select>


                    <span style={{ marginLeft: '10px', marginRight: '5px'}}>Año fin:</span>
                    <Select
                        disabled={loading}
                        style={{width: '200px'}}
                        type="text"
                        onChange={(e) => { this.searchedValueHasta(e)} }
                        defaultValue={filters.hasta}
                    >
                        { getYears().map( (year) => (<Option value={year}>{year}</Option>) ) }
                    </Select>

                    <span style={{ marginLeft: '10px', marginRight: '5px'}}>Agrupar por:</span>
                    <Select disabled={loading} style={{ width:'140px'}} value={filters.grupo} onSelect={ (key) => { setFilters({ ...filters, grupo: key }) } }>
                        <Option key={'mes'}>Mes</Option>
                        <Option key={'año'}>Año</Option>
                    </Select>

                </div>
            </div>
        );
    };

}

export default  connect(
    state => ({
    }),
    {  }
)( EstadisticasActionsFilters );
