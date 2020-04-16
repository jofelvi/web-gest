import React from 'react';

import InputDataButton from '../../../InputDataButton';

import {
  ContainerButtonsTitle,
} from './styles';

const ContainerEditButton = ({
  title,
  data,
  noButton,
  ...rest
}) => (
  <ContainerButtonsTitle>
    <InputDataButton 
      title
      data
      noButton 
      {...rest} />
  </ContainerButtonsTitle>
);

export default ContainerEditButton;