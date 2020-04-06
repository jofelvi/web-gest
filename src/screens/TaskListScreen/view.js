import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import TasksList from '../../components/TasksList';
import TaskFilter from '../../components/TaskFilter';
import TaskDetail from '../../components/TaskDetail/view';

const getTaskList = (fetchTaskList, pathname, history) => {
  if (pathname.includes('user')) {
    return fetchTaskList({ type: 'user', history });
  }
  if (pathname.includes('group')) {
    return fetchTaskList({ type: 'group', history });
  }
  return fetchTaskList({ type: 'all', history });
};

const TasksListScreen = ({
  fetchTaskList,
  tasks,
  selectedTask,
  location: { pathname },
  history,
}) => {
  useEffect(() => {
    getTaskList(fetchTaskList, pathname, history);
  }, [pathname]);
  console.log("tasks", tasks);
  return (
    <Row>
      <Row>
        <Col span={12}>
          <TaskFilter pathname={pathname} />
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
  selectedTask: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default TasksListScreen;
