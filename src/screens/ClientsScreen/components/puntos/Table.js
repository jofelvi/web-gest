import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../../lib/styled";
import ResizableTable from "../../../shared/ResizableTable";
import {LIMIT} from "../../../../constants";

const renderDate = (dateStr, record, index) => {
    if ( ! dateStr ) {
        return ( '-' );
    }
    return (
        <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
            <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
        </Tooltip>);
}
class PuntosTable extends React.Component {
    render() {
        const columns = [
            {
                title: 'Fecha Movimiento', fecha_movimiento: 'fecha_movimiento', key: 'fecha_movimiento', width: 200,
                render: renderDate,
            },
            {
                title: 'Descripcion', dataIndex: 'descripcion', key: 'descripcion', width: 200,
            },
            {
                title: 'Puntos', dataIndex: 'puntos', key: 'puntos', width: 200,
            },
            {
                title: 'Fecha Caducidad', dataIndex: 'fecha_caducidad', key: 'fecha_caducidad', width: 200,
                render: renderDate,
            },
            {
                title: 'Pedido', dataIndex: 'idpedido', key: 'idpedido', width: 200,
            },
            {
                title: 'Consumidos', dataIndex: 'consumidos', key: 'consumidos', width: 200,
            },
            {
                title: 'Cancelados', dataIndex: 'cancelados', key: 'cancelados', width: 200,
            },
        ];

        const { data, selectedRowKeys, onSelectRowChange, onChangeSorter, loading, page, onChangePage, count } = this.props;

        return (
            <TableContainer style={{ overflow: 'visible'}}>
                <ResizableTable
                    dataSource={ data }
                    className="table"

                    rowKey={ 'codentidad_cbim' }
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
PuntosTable.propTypes = {
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
)( PuntosTable );
