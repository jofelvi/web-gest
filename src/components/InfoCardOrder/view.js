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
            dataIndex="idproducto"
            key="idproducto"
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
