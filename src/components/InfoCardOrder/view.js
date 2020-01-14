import React from 'react';


import PropTypes from 'prop-types';

import { Descriptions, Table } from 'antd';

import {
  InfoContainer,
  DescriptionContainer,
  TableContainer,
} from './styles';

const { Column } = Table;


const InfoCardOrder = ({
orders,
numOrder,
dateOrder,
stateOrder,
dateModOrder,
typeOrder,
codDiscountOrder,
detailOrder
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
          <Column
            title="Item"
            dataIndex="idpedido"
            key="idpedido"
          />

          <Column
            title="Cod. Producto"
            dataIndex="codindas"
            key="codindas"
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

          <Column
            title="Puntos"
            dataIndex="puntos"
            key="puntos"
          />

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
