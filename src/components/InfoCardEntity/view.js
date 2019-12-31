import React from 'react';


import PropTypes from 'prop-types';

import { Descriptions } from 'antd';

import {
  InfoContainer,
  MainContainerModal
} from './styles';
import { DatePickerFromTo } from '../../screens/OrderListScreen/styled';




const InfoCardEntity = ({ 
  label1, 
  label2, 
  label3, 
  label4, 
  label5, 
  label6, 
  label7, 
  label8,
  dato1,
  dato2,
  dato3,
  dato4,
  dato5,
  dato6,
  dato7,
  dato8 }) => {

return(
  <div>
    <InfoContainer>
    <Descriptions title="Datos Entidad" layout="horizontal" colon={false}>
    <Descriptions.Item label="Código CBIM">dato1</Descriptions.Item>
    <Descriptions.Item label="Razón Social">dato2</Descriptions.Item>
    <Descriptions.Item label="Tipo">dato3</Descriptions.Item>
    <Descriptions.Item label="Estado">dato4</Descriptions.Item>
    <Descriptions.Item label="Dirección">dato5</Descriptions.Item>
    <Descriptions.Item label="Código Postal">dato6</Descriptions.Item>
    <Descriptions.Item label="Población">dato7</Descriptions.Item>
    <Descriptions.Item label="Provincia">dato8</Descriptions.Item>
  </Descriptions>
    </InfoContainer>
    </div>
)

} 
  
     
          

InfoCardEntity.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardEntity;
