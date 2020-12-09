import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {DeleteOutlined, LoadingOutlined} from "@ant-design/icons";

import {Menu, Dropdown, Button, Popconfirm} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import {
    changeOrderStatusById,
    changeOrderStatusSetLoading,
} from '../../../modules/orders/actions';


class OrderStatusActions extends React.Component {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind( this );
    }

    changeStatus( status, status_name ) {
        const { order, changeOrderStatusById, changeOrderStatusSetLoading } = this.props;
        changeOrderStatusById ( { idpedido: order.idpedido, codestado: status, nombre_estado: status_name } )
        changeOrderStatusSetLoading ( { idpedido: order.idpedido })
    }

    render() {
        const { order, changeStateLoadingId } = this.props;
        let items = [];

        const loading = changeStateLoadingId > 0;

        if ( order.codestado == 'retained' || order.codestado == 'completed' ) {
            items.push( { label: 'Enviar a Mayorista', action: 'pending', action_name: 'En envío a Mayorista' } )
            items.push( { label: 'Anular pedido', action: 'canceled', action_name: 'Anulado' } )
        } else if ( order.codestado == 'pending' ) {
            items.push( { label: 'Marcar como Retenido', action: 'retained', action_name: 'Retenido' } )
            items.push( { label: 'Marcar como Tramitado', action: 'completed', action_name: 'Tramitado' } )
        }

        const menu = (
            <Menu>
                { items.map( ( item, index ) => (
                    <Menu.Item key={ index }>
                        <Popconfirm
                            placement="topLeft"
                            title={`Se va a proceder a cambiar a '${item.action_name}'`}
                            onConfirm={() => {
                                this.changeStatus(item.action, item.action_name)
                            }}
                            okText="Confirmar"
                            cancelText="Cancelar"
                        >
                            <a>{ item.label }</a>
                        </Popconfirm>

                    </Menu.Item>
                ) ) }
            </Menu>
        );

        const settings = items.length > 0 && changeStateLoadingId < 1 ? { } : { disabled: true }

        if ( loading && changeStateLoadingId == order.idpedido ) {
            return (<LoadingOutlined />);
        }

        return (
            <div>
                { order.nombre_estado }
                <Dropdown overlay={menu} { ...settings } trigger={['click']}>
                    <a style={{ paddingLeft: '3px' }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <EditOutlined />
                    </a>
                </Dropdown>
            </div>
        );
    }
};


OrderStatusActions.propTypes = {
    order: PropTypes.shape({}).isRequired,
};

export default connect( ( state ) => ({ changeStateLoadingId: state.orders.changeOrderLoadingId }), { changeOrderStatusById, changeOrderStatusSetLoading } )( OrderStatusActions );
