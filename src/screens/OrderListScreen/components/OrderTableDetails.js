import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {DeleteRowOutlined, LoadingOutlined} from "@ant-design/icons";

import {Menu, Dropdown, Table, Tooltip, Button, Popconfirm} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import {
    deleteOrderLineById,
    deleteOrderLineSetLoading,
} from '../../../modules/orders/actions';

class OrderTableDetails extends React.Component {
    render() {
        const { order, deleteLineLoadingId, deleteOrderLineById, deleteOrderLineSetLoading } = this.props;
        const disable = order.lineas.length < 2 || deleteLineLoadingId || ( order.codestado != 'completed' && order.codestado != 'retained' )

        const columnsEntities = [
            {
                title: 'Cód. Nacional',
                dataIndex: 'codnacional',
                key: 'codnacional',
                width: 120,
                sortDirections: ['descend', 'ascend'],
                sorter: (a,b) => a.codnacional - b.codnacional,
                align: 'center',
            },
            {
                title: 'Cód. Indas',
                dataIndex: 'codindas',
                key: 'codindas',
                width: 120,
                style: { textAlign: 'center' },
                sortDirections: ['descend', 'ascend'],
                sorter: (a,b) => a.codindas - b.codindas,
                align: 'center',
            },
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                sortDirections: ['descend', 'ascend'],
                sorter: (a,b) => a.nombre - b.nombre
            },
            {
                title: 'Cantidad',
                dataIndex: 'cantidad',
                key: 'cantidad',
                width: 80,
                align:"center",
            },
            {
                title: 'Descuento',
                dataIndex: 'descuento',
                key: 'descuento',
                width: 80,
                align: 'center',
            },
            {
                align: 'center',
                width: 80,
                title: order.tipo == 'Pedidos' ? 'Pts. Acumu.' : 'Pts. Coste',
                dataIndex: order.tipo == 'Pedidos' ? 'puntos_acumulados_unidad' : 'puntos_coste_unidad',
                key: order.tipo == 'Pedidos' ? 'puntos_acumulados_unidad' : 'puntos_coste_unidad',
            },
            {
                align: 'center',
                width: 80,
                title: 'Total Puntos',
                render: (text, record) => {
                    const pts = order.tipo == 'Pedidos' ? record.puntos_acumulados_unidad : record.puntos_coste_unidad
                    return ( pts * record.cantidad )
                },
                key: 'total_puntos',
            },
            {
                align: 'center',
                width: 80,
                title: '',
                render: (text, row) => {
                    if ( disable ) {
                        return (
                            <Tooltip title="Sólo se pueden modificar pedidos en estado 'Tramitado' y 'Retenido'">
                                <Button disabled={ true } className="ant-btn-dangerous" danger style={{marginTop: '0px'}}>{ deleteLineLoadingId == row.idproducto ? <LoadingOutlined /> : <DeleteRowOutlined /> }</Button>
                            </Tooltip>
                        );
                    }
                    return (
                        <Popconfirm
                            placement="topLeft"
                            title={`Se va a proceder a la anulación de la línea del producto ${row.nombre}`}
                            onConfirm={() => {
                                console.log('CONFIRM', row)
                                deleteOrderLineSetLoading({ id: row.idproducto })
                                deleteOrderLineById({ idproducto: row.idproducto, idpedido: order.idpedido, codpedido_origen: order.codpedido_origen })
                            }}
                            okText="Confirmar"
                            cancelText="Cancelar"
                        >
                            <Button className="ant-btn-dangerous" variant="danger" style={{marginTop: '0px'}}>{ deleteLineLoadingId == row.idproducto ? <LoadingOutlined /> : <DeleteRowOutlined /> }</Button>
                        </Popconfirm>);
                },
                key: 'acciones',
            }
        ]
        return (
            <div className="table-indas-expand">
                <h4 className="table-indas-title">Detalles del pedido</h4>
                <Table
                    dataSource={order.lineas}
                    columns={columnsEntities}
                    rowKey="idproducto"
                    size="small"
                    pagination={false}
                ></Table>
            </div>
        );
    }
};


OrderTableDetails.propTypes = {
    order: PropTypes.shape({}).isRequired,
};

export default connect(
    ( state ) => ({
        deleteLineLoadingId: state.orders.deleteLineLoadingId
    }),
    { deleteOrderLineSetLoading, deleteOrderLineById  }
)( OrderTableDetails );
