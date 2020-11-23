import React from 'react';


import PropTypes from 'prop-types';

import {Button, Descriptions, Popconfirm, Table} from 'antd';
import {
    DeleteOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import {
  InfoContainer,
  DescriptionContainer,
  TableContainer,
} from './styles';

import {deleteOrderLineSetLoading} from "../../modules/orders/actions";

const { Column } = Table;

const InfoCardOrder = ({
orders,
numOrder,
dateOrder,
stateOrder,
dateModOrder,
typeOrder,
codDiscountOrder,
detailOrder,
setLoading,
loading,
deleteOrderLineById,
deleteOrderLineSetLoading,
}) => (
    <div>
      <InfoContainer>
        <DescriptionContainer>
        <Descriptions title="Datos Pedido" layout="horizontal">
          <Descriptions.Item label="Num. Pedido">{numOrder}</Descriptions.Item>
          <Descriptions.Item label="Fecha Pedido">{dateOrder}</Descriptions.Item>
          <Descriptions.Item label="Estado">{stateOrder}</Descriptions.Item>
          <Descriptions.Item label="Fecha Modificación">{dateModOrder}</Descriptions.Item>
          <Descriptions.Item label="Tipo">{typeOrder} </Descriptions.Item>
          <Descriptions.Item label="Cod. Campaña">{codDiscountOrder} </Descriptions.Item>
        </Descriptions>
        </DescriptionContainer>
        <TableContainer>

      <Table dataSource= {detailOrder} pagination= {false}>
          {/* <Column
            title="Item"
            dataIndex="idpedido"
            key="idpedido"
          /> */}

          <Column
            title="Cod. Nacional"
            dataIndex="codnacional"
            key="codnacional"
          />

          <Column
            title="Nombre Producto"
            dataIndex="nombre"
            key="nombre"
          />

          <Column
            title="Unidades"
            dataIndex="cantidad"
            key="cantidad"
          />



          <Column
            title="Descuento"
            dataIndex="descuento"
            key="descuento"
          />

        {typeOrder === 'Pedidos'?
          <Column
          title="Puntos Acomulados"
          dataIndex="puntos_acumulados_unidad"
          key="puntos_acumulados_unidad"
        />
        :''}

        {typeOrder === 'Puntos'?
        <Column
          title="Puntos Coste"
          dataIndex="puntos_coste_unidad"
          key="puntos_coste_unidad"
        />
        :''}
          { detailOrder && detailOrder.length > 1 &&
          <Column
              title="Acciones"
              dataIndex="delete"
              key="delete"
              render={ (text, row) => (
                  <Popconfirm
                      placement="topLeft"
                      title={`Se va a proceder a la anulación de la línea del producto ${row.nombre}`}
                      onConfirm={() => {
                          deleteOrderLineSetLoading({ id: row.idproducto })
                          deleteOrderLineById({ idproducto: row.idproducto, idpedido: row.idpedido   })
                      }}
                      okText="Confirmar"
                      cancelText="Cancelar"
                  >
                      <Button disabled={loading!=false} className="ant-btn-dangerous" danger style={{marginTop: '10px'}}>{ loading == row.idproducto ? <LoadingOutlined /> : <DeleteOutlined /> }</Button>
                  </Popconfirm>)
              }
          />
          }

        </Table>
        </TableContainer>
      </InfoContainer>

    </div>
  )






InfoCardOrder.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardOrder;
