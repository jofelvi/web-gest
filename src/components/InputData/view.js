import React from "react";

import { Container, ButtonCustom, Label, ContainerData } from './styles';

  const InputData = ({
    title,
  ...rest}) => {        return(
         
  <Container> <Label>joooi{title}</Label><ContainerData>8987979</ContainerData><ButtonCustom shape="circle" icon={'edit'}></ButtonCustom> </Container>
        )
    }
    InputData.propTypes = {
 
    };
    export default InputData;