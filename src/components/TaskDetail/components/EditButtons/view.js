import React from 'react';

import ContainerEditButton from '../ContainerEditButton';
import Utils from '../../../../lib/utils';


const EditButtons = ({
  setInputKey,
  showModal,
  due,
  assignee,
  priority,
  created,
  setDetailTaskKey
}) => {

  const onClick = (key)=>() => { 
    showModal();
    setInputKey(key);
    setDetailTaskKey();
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