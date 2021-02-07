import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Menu, Dropdown, Table, Icon, Button, Row, Col, Tooltip, Spin} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../../constants';
import '../../../lib/styles.css';
import ResizableTable from '../../shared/ResizableTable';
import { withRouter } from 'react-router-dom';
import './styles.css'

import {
    ExportOutlined
} from '@ant-design/icons';

import Utils from '../../../lib/utils';
import {
    InputsContainer,
    Maincontainer,
    InputBox,
    DatePickerFromTo,
    PaginationButton,
    ButtonsContainer,
    SerachOrdersButton,
    MainContainerModal,
    TableContainer,
}  from '../../../lib/styled';
import { map } from 'lodash';
import ButtonGroup from "antd/lib/button/button-group";
import { Anchor } from 'antd';
import {LoadingOutlined, ArrowsAltOutlined, ShrinkOutlined, DeleteOutlined} from "@ant-design/icons";
import {Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import PlanesCompraFilters from "./components/PlanesCompraFilters";

import {filterOrderType, modifyOrderDate} from "../../OrderListScreen/utils";
import * as api from './../../../modules/planes-compra/api';
import {call} from "redux-saga/effects";
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";

const { Link } = Anchor;

const dateFormat = 'DD/MM/YYYY';
const { Column } = Table;
const { Option } = Select;

moment.locale("es", {
    week: {
        dow: 1
    }
});

class PlanesCompra extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectRowChange = this.onSelectRowChange.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    state = {
        exportLoading: false,
        selectedRowKeys: [],
        page: 1,
        filters: {},
        selectedRowsAction: false,
    }

    componentWillMount() {
        this.props.fetchPlans( { page: 1 } )
        this.props.fetchDelegados();
    }

    onSelectRowChange ( selectedRowKeys, row ) {
        this.setState({ selectedRowKeys })
    }

    setFilters( filters ) {
        this.setState({ filters: { ...filters }, page: 1, selectedRowKeys: [] }, this.updateList )
    }
    updateList() {
        const { filters, page } = this.state;
        this.props.fetchPlans( { ...filters, page })
    }

    render() {
        const { selectedRowKeys, selectedRowsAction, exportLoading } = this.state;
        const { loadingList, history, count, delegados, plans } = this.props;
        const hasRowsSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'idcondcomercial',
                key: 'id',
                width: 70,
            },
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                width: 200,
            },

            {
                title: 'Fecha Inicio',
                dataIndex: 'fechainicio',
                key: 'fecha_inicio',
                width: 120,
                render: (dateStr, record, index) => (
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                        <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                    </Tooltip>
                )
            },
            {
                title: 'Fecha Fin',
                dataIndex: 'fechafin',
                key: 'fecha_fin',
                width: 120,
                render: (dateStr, record, index) => (
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:ii')}>
                        <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                    </Tooltip>
                )
            },
            {
                title: 'Uds Compromiso',
                dataIndex: 'escalados',
                key: 'escalados',
                width: 110,
                render: (value, record, index) => (record.escalados[0].udsmaximas)
            },
            {
                title: 'Descuento',
                dataIndex: 'margen',
                key: 'descuento',
                width: 100,
                render: (text, record, index) => (text+" %")
            },
            {
                title: 'Cod Cliente',
                dataIndex: 'codcli_cbim',
                key: 'codentidad',
                width: 80,
            },
            {
                title: 'Nombre Cliente',
                dataIndex: 'nomcli_cbim',
                key: 'nomentidad',
                width: 180,
            },
            {
                title: 'Delegado Comercial',
                dataIndex: 'delegado',
                key: 'delegadocomercial',
                width: 180,
            },
            {
                title: 'Estado',
                dataIndex: 'estado2',
                key: 'estado',
                width: 100,
            },
            {
                title: 'Renov. Auto.',
                dataIndex: 'ind_renovar',
                key: 'autorenovar',
                width: 80,
                render: (text, record, index) => (text?'Si':'No')
            },
            {
                title: 'Forzar regularización',
                dataIndex: 'ind_regularizar',
                key: 'autorenovar',
                width: 80,
                render: (text, record, index) => (text?'Si':'No')
            }
        ];

        return (
            <ConfigProvider locale={ locale }>
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <h2 className="table-indas-title">Planes de Compra</h2>
                    <PlanesCompraFilters
                        setFilters={ this.setFilters  }
                        delegados={ delegados }
                    />
                    <TableContainer style={{ overflow: 'visible'}}>
                        <div class="table-actions">
                                <div className="table-action-button" >
                                    <Button style={{marginLeft: '10px', marginRight: '10px' }} type="primary" onClick={() => { history.push('/planes-de-compra/crear') }}>
                                        Nuevo
                                    </Button>
                                    <Button
                                        type="link"
                                        style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0 }}
                                        onClick={
                                            () => {
                                                this.setState({ exportLoading: true })
                                                const dateString = moment().format('YYYYMMDD');
                                                const filename = `export_pc_${dateString}.xlsx`;
                                                api.exportPlans( this.state.filters, () => {
                                                    this.setState({ exportLoading: false })
                                                })
                                            }
                                        }
                                    >
                                        { exportLoading ? <Spin /> : <ExportOutlined style={{ fontSize: '20px'}} /> }
                                    </Button>
                                    {
                                        selectedRowKeys.length == 1 && (
                                            <React.Fragment>
                                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                                                    this.props.history.push(`/planes-de-compra/${selectedRowKeys[0]}/editar`)
                                                }}>
                                                    Editar
                                                </Button>
                                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                                                    alert("función deshabilitada temporalmente.")
                                                }}>
                                                    Copiar
                                                </Button>
                                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                                                    alert("función deshabilitada temporalmente.")
                                                }}>
                                                    Avance
                                                </Button>
                                            </React.Fragment>
                                        )
                                    }
                                    {
                                        selectedRowKeys.length >= 1 && (
                                            <React.Fragment>
                                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px' }} onClick={() => {
                                                    alert("función deshabilitada temporalmente")
                                                }}>
                                                    Renovar
                                                </Button>
                                                <Dropdown overlay={(
                                                    <Menu onClick={() => {
                                                        alert("función deshabilitada temporalmente.")
                                                    }}>
                                                        <Menu.Item key="1">
                                                            Activo
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            Inactivo
                                                        </Menu.Item>
                                                    </Menu>
                                                )}>
                                                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px' }}>
                                                        Cambiar a <DownOutlined />
                                                    </Button>
                                                </Dropdown>

                                                <Dropdown overlay={(
                                                    <Menu onClick={() => {
                                                        alert("función deshabilitada temporalmente.")
                                                    }}>
                                                        <Menu.Item key="1">
                                                            Activar
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            Desactivar
                                                        </Menu.Item>
                                                    </Menu>
                                                )}>
                                                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px' }}>
                                                        Renovación Aut. <DownOutlined />
                                                    </Button>
                                                </Dropdown>


                                                <Dropdown overlay={(
                                                    <Menu onClick={() => {
                                                        alert("función deshabilitada temporalmente.")
                                                    }}>
                                                        <Menu.Item key="1">
                                                            Activar
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            Desactivar
                                                        </Menu.Item>
                                                    </Menu>
                                                )}>
                                                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px' }}>
                                                        Regularización Aut. <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                            </React.Fragment>
                                        )

                                    }

                                </div>
                        </div>
                        <hr />


                        <ResizableTable
                            dataSource={ plans.map( (plan) => { return { ...plan, key: plan.id } } ) }
                            className="table"

                            onRow={(record, rowIndex) => {
                                return {
                                    key: record.idcondcomercial
                                };
                            }}
                            rowKey={'idcondcomercial'}
                            rowSelection={{ selectedRowKeys, onChange: this.onSelectRowChange }}
                            loading={this.props.loadingList}
                            pagination={{
                                position:'both',
                                pageSize: LIMIT,
                                total: count,
                                current: this.state.page,
                                onChange: (page, pageSize) => {
                                    this.setState( { page: page }, this.updateList )
                                }
                            }}
                            tableLayout="auto"
                            scroll={{ x: 'calc(700px + 60%)'}}
                            columns={columns}
                        />
                    </TableContainer>

                </div>
            </Maincontainer>
            </ConfigProvider>
        );
    }
};


PlanesCompra.propTypes = {

};

export default withRouter(PlanesCompra);
