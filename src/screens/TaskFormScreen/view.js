import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

const TaskFormScreen = ({
  match: {
    params: { taskId }
  },
  process,
  taskName,
  fetchTaskForm,
  fetchTask,
  history
}) => {
  useEffect(() => {
    fetchTaskForm({ taskId, history });
    fetchTask(taskId);
  }, []);
  console.log(process);
  const processId = process ? process.processDefinitionId.split(':')[0] : null;
  console.log(processId);
  const DynamicTask = Loadable({
    loader: taskName
      ? () => import(`../../screens/Forms/${processId}/${taskName}`)
      : () => import(`../../screens/Forms/${processId}`),
    loading() {
      return <div>Loading...</div>;
    }
  });

  return processId && taskName ? <DynamicTask /> : <h1>Loading task!</h1>;
};

TaskFormScreen.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  fetchTaskForm: PropTypes.func.isRequired,
  fetchTask: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default TaskFormScreen;