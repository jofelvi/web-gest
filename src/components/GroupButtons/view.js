import React from "react";

import { ButtonContainer, Button } from './styles';

const GroupButtons = ({ buttons }) => {
  return (
    <ButtonContainer size={'small'}>
      {
        buttons.map(({ text, ...rest }) => <Button { ...rest }>{text}</Button>)
      }
    </ButtonContainer>
  );
}

GroupButtons.propTypes = {

};

export default GroupButtons;