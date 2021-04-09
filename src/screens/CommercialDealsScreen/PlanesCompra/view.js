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
import PlanesCompraActions from "./components/PlanesCompraActions";

import {filterOrderType, modifyOrderDate} from "../../OrderListScreen/utils";
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";

const { Link } = Anchor;

const dateFormat = 'DD/MM/YYYY';
const { Column } = Table;
const { Option } = Select;
//SAVE REDUX

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
        this.saveState = this.saveState.bind(this);

        this.state = props.filters != null ? props.filters : {
            selectedRowKeys: [],
            page: 1,
            filters: { },
            selectedRowsAction: false,
        };

    }

    componentWillMount() {
        this.updateList();
        //this.props.fetchPlans( { page: 1 } )
        this.props.fetchDelegados();
    }

    onSelectRowChange ( selectedRowKeys, row ) {
        this.setState({ selectedRowKeys }, () => {
            this.saveState();
        })
    }

    saveState () {
        this.props.setFilters( this.state )
    }

    setFilters( filters ) {
        this.setState({ filters: { ...filters }, page: 1, selectedRowKeys: [] }, this.updateList )

        //SAVE REDUX
    }
    updateList() {
        const { filters, page } = this.state;
        this.props.fetchPlans( { ...filters, page })
        this.saveState();
    }

    render() {
        const { selectedRowKeys, selectedRowsAction, filters } = this.state;
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
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
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
                dataIndex: 'descuento',
                key: 'descuento',
                width: 100,
                render: (text, record, index) => ( Utils.renderFloat( record.escalados[0].descuento )+" %")
            },
            {
                title: 'Margen',
                dataIndex: 'margen',
                key: 'margen',
                width: 100,
                render: (text, record, index) => ( Utils.renderFloat( record.margen )+" %")
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
                title: 'Forzar Mercancía pendiente',
                dataIndex: 'ind_regularizar',
                key: 'forzarmercancia',
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
                            filters={ this.state.filters }
                        />
                        <TableContainer style={{ overflow: 'visible'}}>
                            <PlanesCompraActions
                                selectedRowKeys={ selectedRowKeys }
                                updateSelectedRowKeys={ (newSelectedRowKeys) => (this.setState({ selectedRowKeys: newSelectedRowKeys}) ) }
                                filters={ filters }
                                plans =  { plans }
                            />
                            <hr />

                            <ResizableTable
                                dataSource={ plans.map( (plan) => { return { ...plan, key: plan.id } } ) }
                                className="table"

                                onRow={(record, rowIndex) => {
                                    return {
                                        key: record.idcondcomercial
                                    };
                                }}
                                rowKey={ 'idcondcomercial' }
                                rowSelection={{ selectedRowKeys, onChange: this.onSelectRowChange }}
                                loading={this.props.loadingList}
                                pagination={{
                                    position:'both',
                                    pageSize: LIMIT,
                                    total: count,
                                    current: this.state.page,
                                    onChange: (page, pageSize) => {
                                        this.setState( { page: page, selectedRowKeys: [] }, this.updateList )
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

