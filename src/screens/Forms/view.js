import React from 'react';
import PropTypes from 'prop-types';

import StartForm from './components/StartForm';
import Start from './components/Start';

const Forms = ({ processStep }) => {
  return processStep === 'startForm' ? <StartForm /> : <Start />;
};

Forms.propTypes = {
  processStep: PropTypes.string.isRequired,
};

export default Forms;
