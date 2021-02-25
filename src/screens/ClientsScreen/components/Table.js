import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../lib/styled";
import PlanesCompraFilters from "../../CommercialDealsScreen/PlanesCompra/components/PlanesCompraFilters";
import PlanesCompraActions from "../../CommercialDealsScreen/PlanesCompra/components/PlanesCompraActions";
import ResizableTable from "../../shared/ResizableTable";
import {LIMIT} from "../../../constants";

class ClientsTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'Cod. Cliente', dataIndex: 'codcli_cbim', key: 'id',
                width: 180, sorter: true,
            },
            {
                title: 'Cod. Entidad', dataIndex: 'codentidad_cbim', key: 'id',
                width: 180,
            },
            {
                title: 'Tipo', dataIndex: 'ind_esfarmacia', key: 'nombre',
                width: 200,
                render: ( value ) => ( value ? 'Farmacia' : 'SL' )
            },
            {
                title: 'Nombre Entidad', dataIndex: 'nomentidad_cbim', key: 'nombre',
                width: 200, sorter: true,
            },
            {
                title: 'Email', dataIndex: 'cliente_email', key: 'cliente_email',
                width: 200,
            },
            {
                title: 'Provincia', dataIndex: 'provincia', key: 'provincia',
                width: 200,
            },
            {
                title: 'Delegado', dataIndex: 'delegado_nombre', key: 'delegado_nombre',
                width: 200, sorter: true,
            },
            {
                title: 'Fecha últ. acceso', dataIndex: 'fecha_ultimo_acceso', key: 'fecha_ultimo_acceso',
                width: 200, sorter: true,
                render: (dateStr, record, index) => (
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                        <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                    </Tooltip>
                )
            },
            {
                title: 'Estado Cliente', dataIndex: 'cliente_estado', key: 'cliente_estado',
                width: 200,sorter: true,
            },
            {
                title: 'PC Activos', dataIndex: 'planes_activos', key: 'planes_activos',
                width: 200,
                render: ( value ) => ( value > 0 ? `Sí ( ${value} )` : 'No' )
            },
            {
                title: 'Fecha fin último PC', dataIndex: 'fecha_ultimo_acceso', key: 'fecha_ultimo_acceso',
                width: 200,sorter: true,
                render: (dateStr, record, index) => (
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                        <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                    </Tooltip>
                )
            },
            {
                title: 'Fecha último pedido', dataIndex: 'fecha_ultimo_pedido', key: 'fecha_ultimo_pedido',
                width: 200,
                render: (dateStr, record, index) => (
                    <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                        <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                    </Tooltip>
                )
            },
            {
                title: 'Nombre Entidad',
                dataIndex: 'nomentidad_cbim',
                key: 'nombre',
                width: 200,
            },
        ];

        const { data, selectedRowKeys, onSelectRowChange, onChangeSorter, loading, page, onChangePage, count } = this.props;

        return (
            <TableContainer style={{ overflow: 'visible'}}>

                <ResizableTable
                    dataSource={ data }
                    className="table"

                    onRow={(record, rowIndex) => {
                        return {
                            key: record.codentidad_cbim
                        };
                    }}
                    rowKey={ 'codentidad_cbim' }
                    rowSelection={{ selectedRowKeys, onChange: onSelectRowChange }}
                    loading={ loading }
                    onChange={  (pagination, filters, sorter) => {
                        onChangeSorter( sorter )
                    } }
                    pagination={{
                        position:'both',
                        pageSize: LIMIT,
                        total: count,
                        current: page,
                        onChange: onChangePage
                    }}
                    tableLayout="auto"
                    scroll={{ x: 'calc(700px + 60%)'}}
                    columns={columns}
                />
            </TableContainer>
        );
    };

}
ClientsTable.propTypes = {
    page: PropTypes.number,
    count: PropTypes.number,
    data: PropTypes.array,
    loading: PropTypes.bool,
    onSorterChange: PropTypes.func,
    onPageChange: PropTypes.func,
    onSelectRowChange: PropTypes.func,
};

export default  connect(
    state => ({
    }),
    {  }
)( ClientsTable );
