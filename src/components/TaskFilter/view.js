import React from 'react';

import { Row, Col } from 'antd';
import TaskFilterItem from './components/TaskFilterItem/view';

const filters = [
  {
    name: 'name',
    text: 'Task name',
  },
  {
    name: 'created',
    text: 'Created',
  },
  {
    name: 'priority',
    text: 'Priority',
  },
  {
    name: 'assignee',
    text: 'Assignee',
  },
];

const TaskFilter = ({
  sortBy,
  setTaskListFilter,
  fetchTaskList,
  pathname,
}) => (
  <Row>
    {filters.map(filter => (
      <Col span={6}>
        <TaskFilterItem
          name={filter.name}
          text={filter.text}
          sortBy={sortBy}
          setTaskListFilter={setTaskListFilter}
          fetchTaskList={fetchTaskList}
          pathname={pathname}
        />
      </Col>
    ))}
  </Row>
);

export default TaskFilter;
