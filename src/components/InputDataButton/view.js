import React from "react";

import { Container, ButtonCustom, Label, ContainerData, ContainerDataLabel, ContentContainer } from './styles';

  const InputDataButton = ({buttons}) => {        
    return(
        <Container> 
            {buttons.map(({
              title,
              data,
              noButton,
              ...rest})=> 
                <ContentContainer>
                  <ContainerDataLabel>
                    <Label>{title}:</Label>
                    <ContainerData>{data}</ContainerData>
                  </ContainerDataLabel>
                  {!noButton&& (
                    <ButtonCustom 
                      {...rest} 
                      shape="circle" 
                      icon={'edit'} 
                      size= {'small'}>
                    </ButtonCustom>
                    )
                  }
                </ContentContainer>
              )
            }
        </Container>
        )
    }
    InputDataButton.propTypes = {
 
    };
    export default InputDataButton;