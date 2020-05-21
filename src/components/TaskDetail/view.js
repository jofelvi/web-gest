import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Select, DatePicker } from 'antd';
import TabsTaskDetail from '../TabsTaskDetail';
import ModalTaskDetail from '../ModalTaskDetail';
import { returnTheLabelForData } from './utils';
import Loadable from 'react-loadable';
import * as moment from 'moment';
import Utils from '../../lib/utils';



import {
  Container,
  CardCustom,
  ContainerTextArea,
  ContainerTabs,
  Label,
  ContainerInputData,
  ContainerModal,
  ContentContainer,
  ButtonContainer
} from './styles';
import { mapperInputData, validationSchema } from './constants';
import { Formik } from 'formik';
import EditButtons from './components/EditButtons';
import { transformData } from './utils_data';
import { handleInput } from '../../lib/forms';
import locale from 'antd/lib/date-picker/locale/es_ES';


// import { processData } from '../../screens/Forms/registrar_cliente/validarRegistro/data';

const { TextArea } = Input;
const { Option } = Select;

const TaskDetail = ({
  getTaskVariables,
  history,
  selectedTask,
  taskVariables,
  setTableKey,
  tableK,
  taskName,
  fetchTaskForm,
  editTask,
  taskMessage,
  editTaskMessage,
  fetchTaskAssigneeUser,
  usersAsignee,
  taskDetailKey,
  setDetailTaskKey
}) => {
  const [isEditMessage, setIsEditMessage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [inputKey, setInputKey] = useState('');
  const [processD, setProcessD] = useState([])
  useEffect(() => {
    getTaskVariables({ history, taskId: selectedTask.id });
    setTableKey()
    fetchTaskForm({ taskId: selectedTask.id });
    fetchTaskAssigneeUser()
  }, [selectedTask.id]);
  const processId = selectedTask ? selectedTask.processDefinitionId.split(':')[0] : null;
  const taskNameAndProcessCreatedInForms = (taskName && taskName !== 'validarActualizacionEntidad') && (taskName && taskName !== 'validarRegistro')&& (taskName && taskName !== 'validarActualizacionCliente') && (processId === 'registrar_cliente' || processId === 'registrar_nueva_entidad' || processId === 'tramitar_pedido')

  const getProcessData = (taskName, processId) => {
    if (taskNameAndProcessCreatedInForms) {
      return require(`../../screens/Forms/${processId}/${taskName}/data`);
    } else {
      // console.log('no task name, no folder created for process in Forms')
      // console.log('no folder created for process in Forms')
      // console.log('no folder created in Form for task')
    }
  }

  useEffect(() => {
    const processDa = getProcessData(taskName, processId)
    setProcessD({ processD: processDa ? processDa.processData : '' })
  }, [selectedTask.id, taskName, processId]);
  
  const dataForTableTab = taskNameAndProcessCreatedInForms && taskVariables && processD ? transformData(taskVariables, processD.processD) : '';
  const {
    id,
    processInstanceId,
    name,
    processDefinitionName,
    processDefinitionId,
    assignee,
    due,
    created,
    priority, } = selectedTask;
    const formikInitialValue = id ? {
      assignee,
      due: moment(Utils.renderDate(due), 'DD/MM/YYYY'),
      priority,
  } : {
    assignee,
    due: moment(Utils.renderDate(due), 'DD/MM/YYYY'),
    priority,
  };
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
      <Formik
        key = {taskDetailKey}
        initialValues={formikInitialValue}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log({ values })
          if (isEditMessage) {
            editTaskMessage({ id, values: values.taskMessage })
            setIsEditMessage({ isEditMessage: false })
          }else{
            editTask({
               id, 
               values:{ 
                ...values, 
                assignee: values && Array.isArray(values.assignee) ? values.assignee.toString(): '',
                due: values.due ? moment(values.due).format('YYYY-MM-DDTHH:mm:ssZ') : due
               } 
            })
          }
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
        }) => (
            <Container>
              <div>
                <ContainerInputData>
                  <EditButtons
                    setInputKey={setInputKey}
                    showModal={showModal}
                    setDetailTaskKey = {setDetailTaskKey}
                    due={due ? Utils.renderDate(due) : '09/08/2020'}
                    assignee={assignee ? assignee : 'ADMIN'}
                    priority={priority ? priority : 'no-data'}
                    created={created}>
                  </EditButtons>
                </ContainerInputData>
                <ContainerTextArea>
                  <Label>Comentario</Label>
                  <TextArea
                    id={'taskMessage'}
                    placeholder={'introduce task'}
                    rows={4}
                    value={values && values.taskMessage ? values.taskMessage :  taskMessage.taskMessage}
                    onChange={handleInput(setFieldValue, 'taskMessage')}
                  />
                  <Button
                    key="submit"
                    type="primary"
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsEditMessage({ isEditMessage: true })
                    }}>
                    Guardar
                  </Button>
                </ContainerTextArea>
                <ContainerTabs>
                  <TabsTaskDetail tableKey={tableK} dataForTable={dataForTableTab}>
                  </TabsTaskDetail>
                </ContainerTabs>
                <ButtonContainer>
                  <Button
                    type="primary"
                    onClick={() =>
                      history.push(`/task/${id}/process/${processInstanceId}`)
                    }
                    style={{ backgroundColor: '001529' }}
                  >
                    Completar
                  </Button>
                </ButtonContainer>
              </div>
              <ContainerModal>

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
                      {inputKey === 'priority' && (
                        <Input
                          id={inputKey}
                          value={values[inputKey]}
                          placeholder={returnTheLabelForData(mapperInputData, inputKey)}
                          onChange={handleInput(setFieldValue, inputKey)}
                          onBlur={handleBlur}
                        />)}
                      {inputKey === 'assignee' && (
                        <Select
                          id={inputKey}
                          mode="multiple"
                          value={values.assignee}
                          style={{ width: '100%' }}
                          defaultValue={assignee}
                          placeholder="Please select"
                          onChange={handleInput(setFieldValue, inputKey)}
                        >
                          {usersAsignee.map(user => {
                            return(
                            <Option
                              key={user.id}
                              value={user.id}
                            >
                              {user.firstName}
                            </Option>
                            )
                          })
                          }
                        </Select>
                      )}
                      
                      {inputKey === 'due' && (
                        <DatePicker
                          id={inputKey}
                          style={{ width: '100%' }}
                          name='due'
                          defaultPickerValue={moment(Utils.renderDate(due), 'DD/MM/YYYY')}
                          defaultValue={moment(Utils.renderDate(due), 'DD/MM/YYYY')}
                          value={values.due}
                          placeholder="Introduce una fecha de inicio"
                          onChange={handleInput(setFieldValue, inputKey)}
                        />
                      )}
                    </ContentContainer>
                  }>
                </ModalTaskDetail>
              </ContainerModal>
            </Container>
          )}
      </Formik>
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
