import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import { Container, TaskTitle, PriorityContainer, ColContainer } from './styles';

import { calculateTimeDistance } from '../../lib/date';

import {
  UserOutlined,
  HourglassOutlined,
  CalendarOutlined,
  BellOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

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
  selected,
  setDetailTaskKey
}) => (
 
  <Container
    onClick={() =>{
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
      });
      setDetailTaskKey();
    }}
    selected={selected && selected.id === id}
  >
    <Row>
      <Col span={24}>
        <TaskTitle>{name}</TaskTitle>
      </Col>
    </Row>
    <Row>
      <ColContainer span={14}>
        <ContactsOutlined /> {processDefinitionName ? processDefinitionName : 'No hay proceso relacionado'}
      </ColContainer>
      <ColContainer span={8}>
        <UserOutlined /> {assignee ? assignee : 'Sin asignar'}
      </ColContainer>
    </Row>
    <Row type="flex">
      <ColContainer span={14}>
        <HourglassOutlined /> Vencimiento: {due ? `${calculateTimeDistance(due)}` : '-'}
      </ColContainer>
      <ColContainer span={8}>
        <CalendarOutlined /> {created ? `Creada ${calculateTimeDistance(created)}` : ''}
      </ColContainer>
      <PriorityContainer span={2}><BellOutlined /> {priority}</PriorityContainer>
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
