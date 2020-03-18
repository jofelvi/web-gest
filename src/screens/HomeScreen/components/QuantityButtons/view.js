import React from 'react';

import ContainerGroupButtons from '../ContainerGroupButtons';

import { MEASURING_UNIT_SELECTED } from '../../../../modules/charts/constants'

const QuantityButtons = ({
  changeMeasuringUnit,
  measuringUnitSelected,
}) => {
  const quantityButtons = [{
    onClick: () => changeMeasuringUnit({unitSelected: MEASURING_UNIT_SELECTED.PVM}),
    selected: measuringUnitSelected === MEASURING_UNIT_SELECTED.PVM,
    text: 'PVM',
  }, {
    onClick: () => changeMeasuringUnit({unitSelected: MEASURING_UNIT_SELECTED.PEDIDOS}),
    selected: measuringUnitSelected === MEASURING_UNIT_SELECTED.PEDIDOS,
    text: 'Nº de Pedidos',
  }]
  
  return (
    <ContainerGroupButtons
      title="Unidades"
      buttons={quantityButtons}
    />
  );
};

export default QuantityButtons;