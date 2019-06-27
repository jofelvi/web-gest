import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TaskCard from '../TaskCard';

const TasksList = ({ tasks }) => (
  <Row>
    {tasks.map(task => (
      <Col span={24} key={task.id}>
        <TaskCard task={task} />
      </Col>
    ))}
  </Row>
);

TasksList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({}))
};

TasksList.defaultProps = {
  tasks: []
};

export default TasksList;
