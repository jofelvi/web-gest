import React from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import StartForm from './components/StartForm';
import Start from './components/Start';

const Forms = ({ location: { pathname }, processStep }) => {
  if (pathname.includes('startForm')) {
    return <Redirect to="/process/signup" />;
  }
  return processStep === 'startForm' ? <StartForm /> : <Start />;
};

Forms.propTypes = {
  processStep: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Forms;
