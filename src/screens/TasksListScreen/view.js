import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const { Column } = Table;

const TasksListScreen = ({ fetchTasks, tasks }) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Table dataSource={tasks}>
      <Column
        title="Id de ejecución"
        dataIndex="executionId"
        key="executionId"
      />
      <Column title="Nombre de la tarea" dataIndex="name" key="name" />
      <Column title="Asignado a" dataIndex="assignee" key="assignee" />
      <Column title="Creado por" dataIndex="owner" key="owner" />
    </Table>
  );
};

TasksListScreen.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default TasksListScreen;
