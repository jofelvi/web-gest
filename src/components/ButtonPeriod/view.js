import React from "react";

import { ButtonPeriodContainer, ButtonPerYear, ButtonPerMonth, ButtonPerDay, ButtonPerHour } from './styles';

  const ButtonPeriod = ({ onClickYear, onClickMonth, onClickDay, onClickHour, clickYear, clickMonth, clickDay , clickHour}) => {        return(
          <ButtonPeriodContainer size = {'small'}>
          <ButtonPerYear onClick = {onClickYear} selectedYear = {clickYear}>Últimos 5 Años</ButtonPerYear>
          <ButtonPerMonth onClick = {onClickMonth} selectedMonth = {clickMonth}>Últimos 12 Meses</ButtonPerMonth>
          <ButtonPerDay onClick = {onClickDay} selectedDay = {clickDay}>Últimos 7 Días</ButtonPerDay>
          <ButtonPerHour onClick = {onClickHour} selectedHour = {clickHour}>Día Actual</ButtonPerHour>
        </ButtonPeriodContainer>
        
        )
    }
    ButtonPeriod.propTypes = {
 
    };
    export default ButtonPeriod;