import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import { Container, TaskTitle, PriorityContainer } from './styles';

import { calculateTimeDistance } from '../../lib/date';

const TaskCard = ({
  task: {
    id,
    name,
    processDefinitionName,
    processDefinitionId,
    processInstanceId,
    assignee,
    due,
    created,
    priority
  },
  setSelectedTask,
  selected
}) => (
 
  <Container
    onClick={() =>
      setSelectedTask({
        id,
        name,
        processDefinitionName,
        processDefinitionId,
        processInstanceId,
        assignee,
        due,
        created,
        priority
      })
    }
    selected={selected && selected.id === id}
  >
    <Row>
      <Col span={24}>
        <TaskTitle>{name}</TaskTitle>
      </Col>
    </Row>
    <Row>
      <Col span={10}>
        {processDefinitionName
          ? processDefinitionName
          : 'No hay proceso relacionado'}
      </Col>
      <Col span={14}>
        {assignee ? assignee : 'No hay encargado actualmente'}
      </Col>
    </Row>
    <Row type="flex">
      <Col span={10}>
        Vencimiento:
        {due ? `Pendiente ${calculateTimeDistance(due)}` : ' no data'}
      </Col>
      <Col span={10}>
        {created ? `Creada ${calculateTimeDistance(created)}` : ''}
      </Col>
      <PriorityContainer span={4}>{priority}</PriorityContainer>
    </Row>
  </Container>
);

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processDefinitionName: PropTypes.string,
    processDefinitionId: PropTypes.string,
    processInstanceId: PropTypes.string,
    assignee: PropTypes.string,
    due: PropTypes.string,
    created: PropTypes.string
  }).isRequired,
  setSelectedTask: PropTypes.func.isRequired
};

export default TaskCard;
