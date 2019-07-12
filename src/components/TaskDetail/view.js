import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Button } from 'antd';
import { Container, ContentContainer, TaskText, ProcessText } from './styles';

const TaskDetail = ({
  history,
  selectedTask: { id, processDefinitionId, name, processDefinitionName },
}) => (
  <Container>
    <Row>
      <Col>
        <TaskText>{name}</TaskText>
      </Col>
    </Row>
    <Row>
      <Col>
        <ProcessText>{processDefinitionName}</ProcessText>
      </Col>
    </Row>
    <ContentContainer type="flex" justify="center" align="middle">
      <Col>Contenido por definir</Col>
    </ContentContainer>
    <Row type="flex" justify="center">
      <Col>
        <Button
          type="primary"
          onClick={() =>
            history.push(`/task/${id}/process/${processDefinitionId.split(':')[2]}`)
          }
        >
          Completar
        </Button>
      </Col>
    </Row>
  </Container>
);

TaskDetail.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processDefinitionName: PropTypes.string,
  }).isRequired,
};

export default TaskDetail;
