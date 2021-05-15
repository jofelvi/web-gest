import React from 'react';

import GroupButtons from '../../../../components/GroupButtons';

import {
  SubTitle,
  ContainerButtonsTitle,
} from './styles';

const ContainerGroupButton = ({
  title,
  ...rest
}) => (
  <ContainerButtonsTitle>
    <SubTitle>{title}</SubTitle>
    <GroupButtons {...rest} />
  </ContainerButtonsTitle>
);

export default ContainerGroupButton;