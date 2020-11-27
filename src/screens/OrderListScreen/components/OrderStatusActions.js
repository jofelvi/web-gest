import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { Menu, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import {
    changeOrderStatusById,
} from '../../../modules/orders/actions';


class OrderStatusActions extends React.Component {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind( this );
    }

    changeStatus( status ) {
        const { order } = this.props;
        alert("ho")
        changeOrderStatusById ( { id: order.idpedido, status: status } )
    }

    render() {
        const { order } = this.props;
        let items = [];

        if ( order.codestado == 'retained' || order.codestado == 'completed' ) {
            items.push( { label: 'Enviar a Mayorista', action: 'pending' } )
            items.push( { label: 'Anular pedido', action: 'canceled' } )
        } else if ( order.codestado == 'pending' ) {
            items.push( { label: 'Marcar como Retenido', action: 'retained' } )
            items.push( { label: 'Marcar como Tramitado', action: 'completed' } )
        }

        const menu = (
            <Menu>
                { items.map( ( item, index ) => (
                    <Menu.Item key={ index }>
                        <a
                            onClick={
                                (event) => {
                                    this.changeStatus(
                                        event.target.attributes['data-action'].value
                                    )
                                }
                            }
                           data-action={ item.action }
                        >{ item.label }</a>
                    </Menu.Item>
                ) ) }
            </Menu>
        );

        const settings = items.length > 0 ? { } : { disabled : true }

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

export default connect( ( status ) => ({}), { changeOrderStatusById } )( OrderStatusActions );
