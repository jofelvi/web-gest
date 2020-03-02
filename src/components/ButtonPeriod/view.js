import React from "react";

import { ButtonPeriodContainer, ButtonPerYear, ButtonPerMonth, ButtonPerDay, ButtonPerHour } from './styles';

  const ButtonPeriod = ({ onClickYear, onClickMonth, onClickDay, onClickHour, clickYear, clickMonth, clickDay , clickHour}) => {        return(
          <ButtonPeriodContainer size = {'small'}>
          <ButtonPerYear onClick = {onClickYear} selectedYear = {clickYear}>Año</ButtonPerYear>
          <ButtonPerMonth onClick = {onClickMonth} selectedMonth = {clickMonth}>Mes</ButtonPerMonth>
          <ButtonPerDay onClick = {onClickDay} selectedDay = {clickDay}>Día</ButtonPerDay>
          <ButtonPerHour onClick = {onClickHour} selectedHour = {clickHour}>Hora</ButtonPerHour>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonPeriod.propTypes = {
 
    };
    export default ButtonPeriod;