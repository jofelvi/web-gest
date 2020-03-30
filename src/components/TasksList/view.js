import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import { TasksListRow, TaskListCol } from './styles'
import TaskCard from '../TaskCard';

const TasksList = ({ tasks }) => (
  <TasksListRow>
    {tasks.map(task => (
      <TaskListCol span={24} key={task.id}>
        <TaskCard task={task} />
      </TaskListCol>
    ))}
  </TasksListRow>
);

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({}))
};

TasksList.defaultProps = {
  tasks: []
};

export default TasksList;
