import React from "react";

import { ButtonPeriodContainer } from './styles';
import { Button } from "antd";



  const ButtonQuantity = ({ onClickPVM, onClickNumeroPedido }) => {
       
        return(
          <ButtonPeriodContainer>
          <Button onClick = {onClickPVM}>PVM</Button>
          <Button onClick = {onClickNumeroPedido} >Nº de Pedidos</Button>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonQuantity.propTypes = {
 
    };
    export default ButtonQuantity;