
import React from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Popconfirm, Tooltip} from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import {LoadingOutlined} from "@ant-design/icons";

const ModalDetailOrder =({ visibility,lastDeletedId, ok, cancel, customFooter, content, deleteOrderById, deleteLoadingId, order, entity, client, deleteOrderSetLoading }) =>
{
    const disable = deleteLoadingId || !order || ( order.codestado != "completed" && order.codestado != "retained" );

    const actions =  order && ( disable ? (
        <Tooltip title={deleteLoadingId ? "" : "Sólo se pueden modificar pedidos en estado 'Tramitado' y 'Retenido'"}>
            <Button className="ant-btn-dangerous" style={{marginTop: '10px'}} disabled={ true }>{ deleteLoadingId == order.idpedido ? (<LoadingOutlined />) : 'Anular Pedido' }</Button>
        </Tooltip>
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
            <Button className="ant-btn-dangerous" danger style={{marginTop: '10px'}} >{ order && order.loadingDelete ? (<LoadingOutlined />) : 'Anular Pedido' }</Button>
        </Popconfirm>) );

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

                {actions}
                <span style={{color: 'red', marginLeft: '10px'}} hidden={!(order && order.error)}>{order && order.error ? order.error : ''}</span>

            </Modal>
        </div>
    );

}



ModalDetailOrder.propTypes = {

};
export default ModalDetailOrder;

