import React from "react";

import { ButtonPeriodContainer } from './styles';
import { Button } from "antd";



  const ButtonPeriod = () => {
       
        return(
          <ButtonPeriodContainer>
          <Button >Año</Button>
          <Button >Mes</Button>
          <Button >Día</Button>
          <Button >Hora</Button>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonPeriod.propTypes = {
 
    };
    export default ButtonPeriod;