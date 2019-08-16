import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Empty } from 'antd';

import utils from '../../lib/utils';

const HomeScreen = ({
  fetchTaskForm,
  process,
  procId,
  taskName,
  taskId,
  completed,
  history,
}) => {
  useEffect(() => {
    if (utils.getTaskId() || taskId) {
      const id = utils.getTaskId();
      fetchTaskForm({ taskId: id || taskId, history });
    }
  }, [taskId, fetchTaskForm]);

  const id = utils.getTaskId() ? utils.getTaskId() : taskId;

  if (id && procId && !completed) {
    return <Redirect to={`/task/${taskId}/process/${procId}`} />;
  }

  if (process && taskName) {
    return <Redirect to={`/process/${process}/${taskName}`} />;
  }

  return <Empty />;
};

HomeScreen.propTypes = {
  process: PropTypes.string.isRequired,
  procId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default HomeScreen;
