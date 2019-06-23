import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import StartForm from '../components/StartForm';
import Start from '../components/Start';

class View extends Component {
  componentDidMount() {
    const { startProcess } = this.props;
    startProcess({ key: 'signup' });
  }

  render() {
    const { processStep, taskId, taskName } = this.props;

    if (taskName) {
      return <Redirect to={`/task/${taskId}/form`} />;
    }
    return processStep === 'startForm' ? <StartForm /> : <Start />;
  }
}

View.propTypes = {
  startProcess: PropTypes.func.isRequired,
  processStep: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired
};

export default View;
