import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';
import TasksList from '../../components/TasksList';
import TaskFilter from '../../components/TaskFilter';
import TaskDetail from '../../components/TaskDetail';
import TaskFilterGeneral from '../../components/TaskFilterGeneral';

const getTaskList = (fetchTaskList, fetchTaskListUser, history) => {
  fetchTaskList({ history });
  return fetchTaskListUser({ history });
  
};

const TasksListScreen = ({
  fetchTaskList,
  fetchTaskListUser,
  tasks,
  selectedTask,
  user,
  location: { pathname },
  history,
  fetchTask,
  fetchTaskMessage,
}) => {
  useEffect(() => {
    getTaskList(fetchTaskList, fetchTaskListUser, history);

    if(selectedTask){
      fetchTask(selectedTask.id);
      fetchTaskMessage({id: selectedTask.id});
    }

  }, [pathname]);
  useEffect(() => {
    if(selectedTask){
      fetchTask(selectedTask.id);
      fetchTaskMessage({id: selectedTask.id});
    }
    
  }, [selectedTask]);
  return (
    <Row>
      <Row>
        <Col span={11}>
          <TaskFilterGeneral />
        </Col>
      </Row>
      <Row>
        <Col span={11}>
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
  user: PropTypes.any.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // selectedTask: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default TasksListScreen;
