import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import StartForm from './components/StartForm';
import Start from './components/Start';

const Forms = ({ processStep, taskName }) => {
  useEffect(() => {
    const { startProcess } = this.props;
    startProcess({ key: 'signup' });
  }, []);

  return processStep === 'startForm' ? <StartForm /> : <Start />;
};

Forms.propTypes = {
  startProcess: PropTypes.func.isRequired,
  processStep: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired
};

export default Forms;
