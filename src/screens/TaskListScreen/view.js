import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TasksList from '../../components/TasksList';
import TaskFilter from '../../components/TaskFilter';

const getTaskList = (fetchTaskList, pathname) => {
  if (pathname.includes('user')) {
    return fetchTaskList({ type: 'user' });
  }
  if (pathname.includes('group')) {
    return fetchTaskList({ type: 'group' });
  }
  return fetchTaskList({ type: 'all' });
};

const TasksListScreen = ({ fetchTaskList, tasks, location: { pathname } }) => {
  useEffect(() => {
    getTaskList(fetchTaskList, pathname, pathname);
  }, [fetchTaskList, pathname]);
  return (
    <Row>
      <Row>
        <Col span={12}>
          <TaskFilter />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <TasksList tasks={tasks} />
        </Col>
      </Row>
    </Row>
  );
};

TasksListScreen.propTypes = {
  fetchTaskList: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default TasksListScreen;
