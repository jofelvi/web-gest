import React from 'react';

import ContainerGroupButtons from '../ContainerGroupButtons';

import { PERIOD_TIME_SELECTED } from '../../../../modules/charts/constants'

const PeriodButtons = ({
  changeTimePeriod,
  periodTimeSelected,
}) => {
  const periodButtons = [{
    onClick: () => changeTimePeriod({ periodSelected: PERIOD_TIME_SELECTED.YEAR }),
    selected: periodTimeSelected === PERIOD_TIME_SELECTED.YEAR,
    text: 'Últimos 5 Años',
  }, {
    onClick: () => changeTimePeriod({ periodSelected: PERIOD_TIME_SELECTED.MONTH }),
    selected: periodTimeSelected === PERIOD_TIME_SELECTED.MONTH,
    text: 'Últimos 12 Meses',
  }, {
    onClick: () => changeTimePeriod({ periodSelected: PERIOD_TIME_SELECTED.DAY }),
    selected: periodTimeSelected === PERIOD_TIME_SELECTED.DAY,
    text: 'Últimos 7 Días',
  }, {
    onClick: () => changeTimePeriod({ periodSelected: PERIOD_TIME_SELECTED.HOUR }),
    selected: periodTimeSelected === PERIOD_TIME_SELECTED.HOUR,
    text: 'Día Actual',
  }];

  return (
    <ContainerGroupButtons
      title="Periodo"
      buttons={periodButtons}
    />
  );
};

export default PeriodButtons;