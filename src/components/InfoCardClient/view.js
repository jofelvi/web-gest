import React from 'react';


import PropTypes from 'prop-types';

import { Descriptions } from 'antd';

import {
  InfoContainer,
  MainContainerModal
} from './styles';
import { DatePickerFromTo } from '../../screens/OrderListScreen/styled';




const InfoCardClient = ({ 
  codClient,
  nombreClient,
  emailClient,
  dateClient,
  stateClient,

  }) => (

  <div>
    <InfoContainer>
    <Descriptions title="Datos Cliente" layout="horizontal">
<Descriptions.Item label="Código Cliente">{codClient}</Descriptions.Item>
    <Descriptions.Item label="Nombre">{nombreClient}</Descriptions.Item>
    <Descriptions.Item label="Correo electrónico">{emailClient}</Descriptions.Item>
    <Descriptions.Item label="Fecha de alta">{dateClient}</Descriptions.Item>
<Descriptions.Item label="Estado">{stateClient}</Descriptions.Item>
  </Descriptions>
    </InfoContainer>
    </div>

)
  
     
          

InfoCardClient.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardClient;
