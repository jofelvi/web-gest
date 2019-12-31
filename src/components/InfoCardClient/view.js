import React from 'react';


import PropTypes from 'prop-types';

import { Descriptions } from 'antd';

import {
  InfoContainer,
  MainContainerModal
} from './styles';
import { DatePickerFromTo } from '../../screens/OrderListScreen/styled';




const InfoCardClient = ({ 
  }) => {

return(
  <div>
    <InfoContainer>
    <Descriptions title="Datos Cliente" layout="horizontal">
    <Descriptions.Item label="Código Cliente">dato1</Descriptions.Item>
    <Descriptions.Item label="Nombre">dato2</Descriptions.Item>
    <Descriptions.Item label="Correo electrónico">dato3</Descriptions.Item>
    <Descriptions.Item label="Fecha de alta">dato4</Descriptions.Item>
    <Descriptions.Item label="Estado">dato5 </Descriptions.Item>
  </Descriptions>
    </InfoContainer>
    </div>
)

} 
  
     
          

InfoCardClient.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardClient;
