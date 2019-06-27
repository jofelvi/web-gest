import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import TasksList from '../../components/TasksList';
import TaskDetail from '../../components/TaskDetail/view';

const getTaskList = (fetchTaskList, pathname) => {
  if (pathname.includes('user')) {
    return fetchTaskList({ type: 'user' });
  }
  if (pathname.includes('group')) {
    return fetchTaskList({ type: 'group' });
  }
  return fetchTaskList({ type: 'all' });
};

const TasksListScreen = ({
  fetchTaskList,
  tasks,
  selectedTask,
  location: { pathname },
  history
}) => {
  useEffect(() => {
    getTaskList(fetchTaskList, pathname, pathname);
  }, [fetchTaskList, pathname]);
  return (
    <Row>
      <Row>
        <Col span={24}>
          <h1>Filter tasks</h1>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <TasksList tasks={tasks} />
        </Col>
        {selectedTask ? (
          <Col span={13}>
            <TaskDetail history={history} selectedTask={selectedTask} />
          </Col>
        ) : null}
      </Row>
    </Row>
  );
};

TasksListScreen.propTypes = {
  fetchTaskList: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedTask: PropTypes.string.isRequired
};

export default TasksListScreen;
