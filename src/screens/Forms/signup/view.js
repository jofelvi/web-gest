import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import StartForm from '../components/StartForm';
import Start from '../components/Start';

class View extends Component {
  componentDidMount() {
    const { startProcess, history } = this.props;
    startProcess({ key: 'signup', history });
  }

  render() {
    const { processStep, taskId, taskName } = this.props;

    if (taskId && taskName) {
      return <Redirect to={`/task/${taskId}/form`} />;
    }

    if (taskName && processStep) {
      return <Redirect to={`/process/${processStep}/${taskName}`} />;
    }
    return processStep === 'startForm' ? <StartForm /> : <Start />;
  }
}

View.propTypes = {
  startProcess: PropTypes.func.isRequired,
  processStep: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
};

export default withRouter(View);
