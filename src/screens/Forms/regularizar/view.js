import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import StartForm from '../components/StartForm';
import Start from '../components/Start';

const View = ({ startProcess, history, processStep, taskId, taskName }) => {
  useEffect(() => {
    if (processStep === '') {
      startProcess({ key: 'regularizar', history });
    }
  }, []);

  if (taskId && taskName) {
    return <Redirect to={`/task/${taskId}/form`} />;
  }

  if (taskName && processStep) {
    return <Redirect to={`/process/${processStep}/${taskName}`} />;
  }
  return processStep === 'startForm' ? <StartForm /> : <Start />;
};

View.propTypes = {
  startProcess: PropTypes.func.isRequired,
  processStep: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

export default withRouter(View);
