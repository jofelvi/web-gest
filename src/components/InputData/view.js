import React from "react";

import { Container, ButtonCustom, Label, ContainerData, ContainerDataLabel } from './styles';

  const InputData = ({
    title,
    data,
    onClick,
    noButton,
  ...rest}) => {        return(
         
  <Container> 
    <ContainerDataLabel>
      <Label>{title}:</Label>
      <ContainerData>{data}</ContainerData>
    </ContainerDataLabel>
    {!noButton && (
    <ButtonCustom {...rest} shape="circle" onClick = {onClick} icon={'edit'} size= {'small'}>
    </ButtonCustom>
    )}
  </Container>
        )
    }
    InputData.propTypes = {
 
    };
    export default InputData;