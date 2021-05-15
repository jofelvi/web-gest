import React from 'react';


import PropTypes from 'prop-types';

import {Descriptions}   from 'antd';

import {
  InfoContainer,

} from './styles';

const InfoCardEntity = ({ 
  codEntity,
  company,
  tEntity,
  stateEntity,
  addressEntity,
  zipcodeEntity,
  cityEntity,
  provinceEntity,
}) => 

(
  <div>
    <InfoContainer>
    <Descriptions title="Datos Entidad" layout="horizontal" colon={false}>
    <Descriptions.Item label="Código CBIM">{codEntity}</Descriptions.Item>
    <Descriptions.Item label="Razón Social">{company}</Descriptions.Item>
    <Descriptions.Item label="Tipo">{tEntity}</Descriptions.Item>
    <Descriptions.Item label="Estado">{stateEntity}</Descriptions.Item>
    <Descriptions.Item label="Dirección">{addressEntity}</Descriptions.Item>
    <Descriptions.Item label="Código Postal">{zipcodeEntity}</Descriptions.Item>
    <Descriptions.Item label="Población">{cityEntity}</Descriptions.Item>
    <Descriptions.Item label="Provincia">{provinceEntity}</Descriptions.Item>
  </Descriptions>
    </InfoContainer>
    </div>
)


  
InfoCardEntity.propTypes = {
  logout: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
};

export default InfoCardEntity;
