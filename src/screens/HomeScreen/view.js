import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Empty } from 'antd';

import utils from '../../lib/utils';

const HomeScreen = ({ process, taskName }) => {
  const taskId = utils.getTaskId();
  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }

  if (taskId) {
    return <Redirect to={`/task/${taskId}`} />;
  }

  return <Empty />;
};

HomeScreen.propTypes = {
  taskName: PropTypes.string.isRequired
};

export default HomeScreen;
