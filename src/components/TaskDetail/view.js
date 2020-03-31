import React from 'react';
import PropTypes from 'prop-types';
import InputData from '../InputData'
import { Row, Col, Button, Card, Input } from 'antd';
import { Container, ContentContainer, TaskText, ProcessText , ContainerTextArea, Label, ContainerInputData} from './styles';
const { TextArea } = Input;
const TaskDetail = ({
  history,
  selectedTask: { id, processInstanceId, name, processDefinitionName, due }
}) => (
  <Container>
    <Card title={name} bordered={false} >

      <ContainerInputData>
      <InputData></InputData> 
      </ContainerInputData>
      <ContainerTextArea>
        <Label>Comentario</Label>
      <TextArea rows={4} />
      </ContainerTextArea>
     
    </Card>
    {/* <Row>
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
            history.push(`/task/${id}/process/${processInstanceId}`)
          }
        >
          Completar
        </Button>
      </Col>
    </Row> */}
  </Container>
);

TaskDetail.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processDefinitionName: PropTypes.string,
    processInstanceId: PropTypes.string
  }).isRequired
};

export default TaskDetail;
