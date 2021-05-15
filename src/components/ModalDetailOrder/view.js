
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Popconfirm, Tooltip} from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import {LoadingOutlined} from "@ant-design/icons";

const ModalDetailOrder =({ me, onRefresh, visibility,lastDeletedId, ok, cancel, customFooter, content, deleteOrderById, realDeleteLoadingId, realDeleteOrderById, deleteLoadingId, order, entity, client }) =>
{
    const [ loadingAction, setLoadingAction ] = useState( false );
    const [ errorAction, setErrorAction ] = useState( '' );
    const disable = deleteLoadingId || !order || ( order.codestado != "completed" && order.codestado != "retained" );

    // me.id
    const actions =  order && ( disable ? (
        <React.Fragment>
            <Tooltip title={deleteLoadingId ? "" : "Sólo se pueden modificar pedidos en estado 'Tramitado' y 'Retenido'"}>
                <Button className="ant-btn-dangerous" style={{marginTop: '10px'}} disabled={ true }>{ deleteLoadingId == order.idpedido ? (<LoadingOutlined />) : 'Anular Pedido' }</Button>
            </Tooltip>
        </React.Fragment>
    ) : (
        <Popconfirm
            placement="topLeft"
            title={`Se va a proceder a la anulación del pedido "${order.codpedido_origen}" de la entidad ${order.nomentidad_cbim}.`}
            onConfirm={() => {
                deleteOrderById({ id: order.codpedido_origen, idpedido: order.idpedido } )
            }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <Button className="ant-btn-dangerous" danger style={{marginTop: '10px'}} >Anular Pedido</Button>
        </Popconfirm>) );

    const deleteAction = order && (
        <Popconfirm
            placement="topLeft"
            title={`Se va a proceder a eliminar el pedido "${order.codpedido_origen}" de la entidad ${order.nomentidad_cbim}.`}
            onConfirm={() => {
                setLoadingAction( true )
                realDeleteOrderById( {
                    codpedido_origen: order.codpedido_origen,
                    id_usuario: me.id,
                    success: ( data ) => {
                        setLoadingAction( false )
                        onRefresh()
                        cancel()
                    },
                    error: ( e ) => {
                        setLoadingAction( false )
                        setErrorAction( e );
                    }
                } )
            }}
            okText="Confirmar"
            cancelText="Cancelar"
        >
            <Button className="ant-btn-dangerous" danger style={{marginLeft: '20px', marginTop: '10px'}} >Eliminar Pedido</Button>
        </Popconfirm>
    )

    return (
        <div>
            <Modal
                title="Detalles"
                visible={visibility && order}
                destroyOnClose={true}
                onOk={ok}
                onCancel={cancel}
                footer={customFooter}
                width= {900}
                bodyStyle = {{height: '600px'}}
            >
                {content}
                { ( (order && order.loadingDelete) || loadingAction) ? (<LoadingOutlined />) : ( <div>{actions}{deleteAction}</div> ) }
                <span style={{color: 'red', marginLeft: '10px'}} hidden={!(order && order.error)}>{order && order.error ? order.error : ''}</span>
                <span style={{color: 'red', marginLeft: '10px'}} hidden={'' !== errorAction}>{errorAction}</span>

            </Modal>
        </div>
    );

}

export default ModalDetailOrder;

