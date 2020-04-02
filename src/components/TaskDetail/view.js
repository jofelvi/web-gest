import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import TabsTaskDetail from '../TabsTaskDetail';
import ModalTaskDetail from '../ModalTaskDetail';
import { returnTheLabelForData } from './utils';
import {
  Container,
  CardCustom,
  ContainerTextArea,
  ContainerTabs,
  Label,
  ContainerInputData,
  ContainerModal,
  ContentContainer
} from './styles';
import { mapperInputData, validationSchema } from './constants';
import { Formik } from 'formik';
import EditButtons from './components/EditButtons'
const { TextArea } = Input;

const TaskDetail = ({
  history,
  selectedTask: {
    id,
    processInstanceId,
    name,
    processDefinitionName,
    assignee,
    due,
    created,
    priority }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputKey, setInputKey] = useState('');

  const showModal = () => {
    setIsVisible(true)
  };

  const handleOk = e => {
    setIsVisible(false)
  };

  const handleCancel = e => {
    setIsVisible(false)
  };

  return (
    <CardCustom title={name} bordered={false} >
      <Container>
        <ContainerInputData>
          <EditButtons
            setInputKey={setInputKey}
            showModal={showModal}
            due={due ? due : '09/08/2020'}
            assignee={assignee ? assignee : 'ADMIN'}
            priority={priority ? priority : 'no-data'}
            created={created}>
          </EditButtons>
        </ContainerInputData>
        <ContainerTextArea>
          <Label>Comentario</Label>
          <TextArea placeholder={'Solicitud de nueva entidad'} rows={4} />
        </ContainerTextArea>
        <ContainerTabs>
          <TabsTaskDetail>
          </TabsTaskDetail>
        </ContainerTabs>
        <ContainerModal>
          <Formik
            initialValues={{
              due: '',
              assignee: '',
              priority: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {

            }}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
                <ModalTaskDetail
                  visible={isVisible}
                  handleCancel={handleCancel}
                  titleModal={returnTheLabelForData(mapperInputData, inputKey)}
                  footer={[
                    <Button
                      key="back"
                      onClick={handleCancel}>
                      Atrás
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      onClick={(e) => {
                        handleSubmit(e);
                        handleOk(e);
                      }}>
                      Guardar
                    </Button>,
                  ]}
                  content={
                    <ContentContainer>
                      <Label>{returnTheLabelForData(mapperInputData, inputKey)}
                      </Label>
                      <Input
                        id={inputKey}
                        value={values[inputKey]}
                        placeholder={returnTheLabelForData(mapperInputData, inputKey)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </ContentContainer>
                  }>
                </ModalTaskDetail>
              )
            }
          </Formik>
        </ContainerModal>
      </Container>
    </CardCustom>
  )
};

TaskDetail.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processDefinitionName: PropTypes.string,
    processInstanceId: PropTypes.string
  }).isRequired
};

export default TaskDetail;
