import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Table, Icon, Button, Row, Col, Tooltip} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../../constants';
import '../../../lib/styles.css';
import ResizableTable from '../../shared/ResizableTable';
import { withRouter } from 'react-router-dom';

import {
    FileExcelOutlined
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



const { Link } = Anchor;

const dateFormat = 'YYYY/MM/DD';
const { Column } = Table;
const { Option } = Select;

class PlanesCompra extends React.Component {
    constructor(props) {
        super(props)
        this.onSelectRowChange = this.onSelectRowChange.bind(this);
    }
    state = {
        selectedRowsKeys: [],
        selectedRowsAction: false,
    }

    componentDidMount() {
        this.props.fetchPlans()
    }

    onSelectRowChange ( selectedRowsKeys ) {
        this.setState({ selectedRowsKeys })
    }

    render() {
        const { selectedRowsKeys, selectedRowsAction } = this.state;
        const { loadingList, history } = this.props;
        const hasRowsSelected = selectedRowsKeys.length > 0;


        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                width: 50,
            },
            {
                title: 'Plan de Compra',
                dataIndex: 'nombre',
                key: 'nombre',
                width: 200,
            },

            {
                title: 'Fecha Inicio',
                dataIndex: 'fecha_inicio',
                key: 'fecha_inicio',
                width: 120,
            },
            {
                title: 'Fecha Fin',
                dataIndex: 'fecha_fin',
                key: 'fecha_fin',
                width: 120,
            },
            {
                title: 'Uds Compromiso',
                dataIndex: 'uds_compromiso',
                key: 'uds_compromiso',
                width: 110,
            },
            {
                title: 'Descuento',
                dataIndex: 'descuento',
                key: 'descuento',
                width: 100,
                render: (text, record, index) => (text+" %")
            },
            {
                title: 'Cod Entidad',
                dataIndex: 'codentidad',
                key: 'codentidad',
                width: 80,
            },
            {
                title: 'Nombre Entidad',
                dataIndex: 'nomentidad',
                key: 'nomentidad',
                width: 180,
            },
            {
                title: 'Delegado Comercial',
                dataIndex: 'delegadocomercial',
                key: 'delegadocomercial',
                width: 180,
            },
            {
                title: 'Estado',
                dataIndex: 'estado',
                key: 'estado',
                width: 100,
            },
            {
                title: 'Renov. Auto.',
                dataIndex: 'autorenovar',
                key: 'autorenovar',
                width: 80,
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
                        setFilters={() => { }}
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
                                            <Button style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
                                                alert("Do something")
                                            }}>
                                                Editar
                                            </Button>
                                            <Button style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
                                                alert("Do something")
                                            }}>
                                                Copiar
                                            </Button>
                                            <Button style={{marginLeft: '3px', marginRight: '3px'}} onClick={() => {
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
                                        <Button style={{marginLeft: '3px', marginRight: '3px' }} onClick={() => { alert("Do something") }}>
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
                                            <Button style={{marginLeft: '3px', marginRight: '3px' }}>
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
                                            <Button style={{marginLeft: '3px', marginRight: '3px' }}>
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
                                            <Button style={{marginLeft: '3px', marginRight: '3px' }}>
                                                Regularización Aut. <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </React.Fragment>
                                    )

                                }
                                <Button style={{marginLeft: '3px', marginRight: '0px' }} onClick={() => { alert("Do something") }}>
                                    <FileExcelOutlined />
                                </Button>

                            </div>
                        </div>


                        <ResizableTable
                            dataSource={this.props.plans}
                            className="table"
                            rowSelection={{ selectedRowsKeys, onChange: this.onSelectRowChange }}
                            pagination={{
                                position:'both',
                                pageSize: LIMIT,
                                total: 999,
                                current: 1,
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
