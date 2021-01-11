import React from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Button, Row, Col, Tooltip} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../../constants';
import '../../../lib/styles.css';

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
        const { loadingList } = this.props;
        const hasRowsSelected = selectedRowsKeys.length > 0;

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
                                <Select
                                    value={selectedRowsAction}
                                    onChange={(value) => this.setState({selectedRowsAction: value})}
                                    disabled={!hasRowsSelected}
                                    style={{minWidth: '80px'}}
                                >
                                    <Option value={false}  style={{ color: '#CCC' }}>- Acciones en masa -</Option>
                                    <Option value="renew">Renovar</Option>
                                    <Option value="inactive">Cambiar a Inactivo</Option>
                                    <Option value="active">Cambiar a Activo</Option>
                                    <Option value="activar_renovacion_automatica">Activar Renovación Automática</Option>
                                    <Option value="cancelar_renovacion_auomatica">Cancelar Renovación Automática</Option>
                                </Select>

                                <Button style={{marginLeft: '10px'}} type="primary" onClick={() => { alert("Do something") }} disabled={!selectedRowsAction} loading={loadingList}>
                                    Aplicar
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                {hasRowsSelected ? `${selectedRowsKeys.length} planes seleccionados.` : ''}
                            </span>
                            </div>
                        </div>


                        <Table
                            dataSource={this.props.plans}
                            className="table"
                            rowSelection={{ selectedRowsKeys, onChange: this.onSelectRowChange }}
                            pagination={{
                                position:'both',
                                pageSize: LIMIT,
                                total: 999,
                                current: 1,
                            }}
                            scroll={{ x: true }}
                            tableLayout="auto"
                            scroll={{ x: 'calc(700px + 50%)'}}
                        >

                            <Column
                                title="ID"
                                dataIndex="id"
                                key="id"
                                align="center"
                            />

                            <Column
                                title="Nombre"
                                dataIndex="nombre"
                                key="nombre"

                            />
                            <Column
                                title="Fecha Inicio"
                                dataIndex="fecha_inicio"
                                key="fecha_inicio"
                            />
                            <Column
                                title="Fecha Fin"
                                dataIndex="fecha_fin"
                                key="fecha_fin"
                            />
                            <Column
                                title="Uds Compra"
                                dataIndex="uds_compra"
                                key="uds_compra"
                                align="center"
                            />
                            <Column
                                title="Descuento"
                                dataIndex="descuento"
                                key="descuento"
                            />
                            <Column
                                title="Cod Entidad"
                                dataIndex="codentidad"
                                key="codentidad"
                            />
                            <Column
                                title="Nombre Entidad"
                                dataIndex="nomentidad"
                                key="nomentidad"
                            />
                            <Column
                                title="Delegado Comrcial"
                                dataIndex="delegadocomercial"
                                key="delegadocomercial"
                            />
                            <Column
                                title="Estado"
                                dataIndex="estado"
                                key="estado"
                            />
                            <Column
                                title="Renov. Auto."
                                dataIndex="autorenovar"
                                key="autorenovar"
                            />
                            <Column
                                title="#"
                                dataIndex="acciones"
                                key="acciones"
                            />


                        </Table>
                    </TableContainer>

                </div>
            </Maincontainer>
        );
    }
};


PlanesCompra.propTypes = {

};

export default PlanesCompra;
