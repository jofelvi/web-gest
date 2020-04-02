import React from 'react';

import ContainerEditButton from '../ContainerEditButton';
import Utils from '../../../../lib/utils';

import { MEASURING_UNIT_SELECTED } from '../../../../modules/charts/constants'

const EditButtons = ({
  setInputKey,
  showModal,
  due,
  assignee,
  priority,
  created,
}) => {

  const onClick = (key)=>() => { 
    showModal();
    setInputKey(key);
  }
  const editButtons = [
    {
      title: 'Fecha de creación',
      data:Utils.renderDate(created),
      noButton: true

    }, {
      onClick: onClick('assignee'),
      title: 'Asignado a',
      data: assignee,
      noButton: false

    }, {
      onClick: onClick('priority'),
      title: 'Prioridad',
      data: priority,
      noButton: false
    },{
      onClick: onClick('due'),
      title: 'Fecha de Vencimiento',
      data: due,
      noButton: false
  
    }
]
  
  return (
    <ContainerEditButton
      buttons={editButtons}
    />
  );
};

export default EditButtons;