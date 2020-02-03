import React from "react";

import { ButtonPeriodContainer } from './styles';
import { Button } from "antd";



  const ButtonPeriod = ({ onClickYear, onClickMonth, onClickDay, onClickHour }) => {
       
        return(
          <ButtonPeriodContainer>
          <Button onClick = {onClickYear}>Año</Button>
          <Button onClick = {onClickMonth} >Mes</Button>
          <Button onClick = {onClickDay} >Día</Button>
          <Button onClick = {onClickHour}>Hora</Button>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonPeriod.propTypes = {
 
    };
    export default ButtonPeriod;