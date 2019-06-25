import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import StartForm from './components/StartForm';
import Start from './components/Start';

const Forms = ({ processStep, startProcess }) => {
  useEffect(() => {
    startProcess({ key: 'signup' });
  }, [startProcess]);

  return processStep === 'startForm' ? <StartForm /> : <Start />;
};

Forms.propTypes = {
  startProcess: PropTypes.func.isRequired,
  processStep: PropTypes.string.isRequired
};

export default Forms;
