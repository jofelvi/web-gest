import React from 'react';


import PropTypes from 'prop-types';

import { Descriptions, Table } from 'antd';

import {
  InfoContainer,
  DescriptionContainer
} from './styles';

const { Column } = Table;


const InfoCardOrder = ({

}) => {

  return (
    <div>
      <InfoContainer>
        <DescriptionContainer>
        <Descriptions title="Datos Pedido" layout="horizontal">
          <Descriptions.Item label="Num. Pedido">dato1</Descriptions.Item>
          <Descriptions.Item label="Fecha Pedido">dato2</Descriptions.Item>
          <Descriptions.Item label="Estado">dato3</Descriptions.Item>
          <Descriptions.Item label="Fecha Modificación">dato4</Descriptions.Item>
          <Descriptions.Item label="Tipo">dato5 </Descriptions.Item>
          <Descriptions.Item label="Cod. Compañia">dato6 </Descriptions.Item>
        </Descriptions>
        </DescriptionContainer>
        <Table>
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
      </InfoContainer>
    </div>
  )

}




InfoCardOrder.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardOrder;
