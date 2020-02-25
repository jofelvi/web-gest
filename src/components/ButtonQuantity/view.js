import React from "react";

import { ButtonPeriodContainer, ButtonPVM, ButtonNumeroPedidos } from './styles';
import { Button } from "antd";



  const ButtonQuantity = ({ onClickPVM, onClickNumeroPedido, clickNumeroPedidos, clickPVM }) => {
       
        return(
          <ButtonPeriodContainer>
          <ButtonPVM  selectedPVM = {clickPVM} onClick = {onClickPVM}>PVM</ButtonPVM>
          <ButtonNumeroPedidos selectedNumeroPedidos= {clickNumeroPedidos} onClick = {onClickNumeroPedido} >Nº de Pedidos</ButtonNumeroPedidos>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonQuantity.propTypes = {
 
    };
    export default ButtonQuantity;