
import React from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Popconfirm} from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import {LoadingOutlined} from "@ant-design/icons";

const ModalDetailOrder =({ visibility, ok, cancel, customFooter, content, deleteOrderById, order, entity, client, deleteOrderSetLoading }) =>
  (
      <div>
        <Modal
          title="Detalles"
          visible={visibility}
          destroyOnClose={true}
          onOk={ok}
          onCancel={cancel}
          footer={customFooter}
          width= {900}
          bodyStyle = {{height: '600px'}} 
        >{content}
            { order ? (
                <Popconfirm
                    placement="topLeft"
                    title={`Se va a proceder a la anulación del pedido ${order.idpedido} de la entidad ${order.nomentidad_cbim}.`}
                    onConfirm={() => {
                        deleteOrderSetLoading({});
                        deleteOrderById({ id: order.idpedido})
                    }}
                    okText="Confirmar"
                    cancelText="Cancelar"
                >
                <Button className="ant-btn-dangerous" danger style={{marginTop: '10px'}} disabled={order && order.loadingDelete}>{ order && order.loadingDelete ? (<LoadingOutlined />) : 'Anular Pedido' }</Button>
            </Popconfirm>) : ''}
            <span style={{color: 'red', marginLeft: '10px'}} hidden={!(order && order.error)}>{order && order.error ? order.error : ''}</span>

        </Modal>
      </div>
    )
  

ModalDetailOrder.propTypes = {
 
};
export default ModalDetailOrder;

          