import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Table, Icon, Button, Row, Col, Tooltip} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../../constants';
import '../../../lib/styles.css';
import ResizableTable from '../../shared/ResizableTable';
import { withRouter } from 'react-router-dom';

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

import ButtonGroup from "antd/lib/button/button-group";
import { Anchor } from 'antd';
import {LoadingOutlined, ArrowsAltOutlined, ShrinkOutlined, DeleteOutlined} from "@ant-design/icons";
import {Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import PlanesCompraFilters from "./components/PlanesCompraFilters";

import {filterOrderType, modifyOrderDate} from "../../OrderListScreen/utils";
import * as api from './../../../modules/planes-compra/api';
import {call} from "redux-saga/effects";



const { Link } = Anchor;

const dateFormat = 'YYYY/MM/DD';
const { Column } = Table;
const { Option } = Select;

class PlanesCompra extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectRowChange = this.onSelectRowChange.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    state = {
        selectedRowsKeys: [],
        page: 1,
        filters: {},
        selectedRowsAction: false,
    }

    componentWillMount() {
        this.props.fetchPlans( { page: 1 } )
        this.props.fetchDelegados();
    }

    onSelectRowChange ( selectedRowsKeys ) {
        this.setState({ selectedRowsKeys })
    }

    setFilters( filters ) {
        this.setState({ filters: filters }, this.updateList )
    }
    updateList() {
        const { filters, page } = this.state;
        this.props.fetchPlans( { ...filters, page })
    }

    render() {
        const { selectedRowsKeys, selectedRowsAction } = this.state;
        const { loadingList, history, count, delegados } = this.props;
        const hasRowsSelected = selectedRowsKeys.length > 0;

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
                key: 'uds_compromiso',
                width: 110,
                render: (value, record, index) => (value[0].udsminimas)
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
            },
            {
                title: '#',
                key: 'acciones',
                width: 30
            }
        ];

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <h2 className="table-indas-title">Planes de Compra</h2>
                    <PlanesCompraFilters
                        setFilters={ this.setFilters  }
                        delegados={ delegados }
                    />
                    <TableContainer>
                        <div class="table-actions">
                            <div className="table-action-button" >
                                <Button style={{marginLeft: '10px', marginRight: '10px' }} type="primary" onClick={() => { history.push('/planes-de-compra/crear') }}>
                                    Nuevo
                                </Button>
                                {
                                    selectedRowsKeys.length == 1 && (
                                        <React.Fragment>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
                                                alert("Do something")
                                            }}>
                                                Editar
                                            </Button>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
                                                alert("Do something")
                                            }}>
                                                Copiar
                                            </Button>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
                                                alert("Do something")
                                            }}>
                                                Avance
                                            </Button>
                                    </React.Fragment>
                                    )
                                }
                                {
                                    selectedRowsKeys.length >= 1 && (
                                    <React.Fragment>
                                        <Button type="link" style={{marginLeft: '3px', marginRight: '3px' }} onClick={() => { alert("Do something") }}>
                                            Renovar
                                        </Button>
                                        <Dropdown overlay={(
                                            <Menu onClick={() => {
                                                alert("Do something")
                                            }}>
                                                <Menu.Item key="1">
                                                    Activo
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                    Inactivo
                                                </Menu.Item>
                                            </Menu>
                                        )}>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px' }}>
                                                Cambiar a <DownOutlined />
                                            </Button>
                                        </Dropdown>

                                        <Dropdown overlay={(
                                            <Menu onClick={() => {
                                                alert("Do something")
                                            }}>
                                                <Menu.Item key="1">
                                                    Activar
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                    Desactivar
                                                </Menu.Item>
                                            </Menu>
                                        )}>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px' }}>
                                                Renovación Aut. <DownOutlined />
                                            </Button>
                                        </Dropdown>


                                        <Dropdown overlay={(
                                            <Menu onClick={() => {
                                                alert("Do something")
                                            }}>
                                                <Menu.Item key="1">
                                                    Activar
                                                </Menu.Item>
                                                <Menu.Item key="2">
                                                    Desactivar
                                                </Menu.Item>
                                            </Menu>
                                        )}>
                                            <Button type="link" style={{marginLeft: '3px', marginRight: '3px' }}>
                                                Regularización Aut. <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </React.Fragment>
                                    )

                                }
                                <Button
                                    type="link"
                                    style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0 }}
                                    onClick={
                                        () => {
                                         api.exportPlans( this.state.filters, 'export_planes_compra.xls' )
                                        }
                                    }
                                >
                                    <ExportOutlined style={{ fontSize: '20px'}} />
                                </Button>

                            </div>
                        </div>
                        { loadingList && (<div style={{ marginTop: '60px'} }></div> ) }


                        <ResizableTable
                            dataSource={this.props.plans}
                            className="table"
                            rowSelection={{ selectedRowsKeys, onChange: this.onSelectRowChange }}
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
        );
    }
};


PlanesCompra.propTypes = {

};

export default withRouter(PlanesCompra);
