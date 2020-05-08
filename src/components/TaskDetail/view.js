import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import TabsTaskDetail from '../TabsTaskDetail';
import ModalTaskDetail from '../ModalTaskDetail';
import { returnTheLabelForData } from './utils';
import Loadable from 'react-loadable';

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
// import { processData } from '../../screens/Forms/registrar_cliente/validarRegistro/data';

const { TextArea } = Input;

const TaskDetail = ({
  getTaskVariables,
  history,
  selectedTask,
  taskVariables,
  setTableKey,
  tableK,
  taskName,
  fetchTaskForm
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [ processD, setProcessD ] = useState([])
	useEffect(() => {
      getTaskVariables({ history, taskId: selectedTask.id });
      setTableKey()
      fetchTaskForm({ taskId: selectedTask.id });
    }, [selectedTask.id]);

  const processId = selectedTask ? selectedTask.processDefinitionId.split(':')[0] : null;
  const taskNameAndProcessCreatedInForms = (taskName && taskName !== 'validarActualizacionEntidad') && (taskName && taskName !== 'validarActualizacionCliente') &&(processId === 'registrar_cliente' || processId === 'registrar_nueva_entidad'  || processId === 'tramitar_pedido')

  const getProcessData = (taskName, processId)=>{
    if(taskNameAndProcessCreatedInForms){ 
      return require(`../../screens/Forms/${processId}/${taskName}/data`);
    }else{
      // console.log('no task name, no folder created for process in Forms')
      // console.log('no folder created for process in Forms')
      // console.log('no folder created in Form for task')
    }
  }

  useEffect(() =>{
      const processDa = getProcessData(taskName, processId)
      setProcessD({processD: processDa ? processDa.processData : ''})
    },[ selectedTask.id, taskName, processId ])
  
  const dataForTableTab =  taskNameAndProcessCreatedInForms && taskVariables &&  processD  ?  transformData(taskVariables, processD.processD) : '';
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
        <div>
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
          <TabsTaskDetail tableKey = {tableK} dataForTable = {dataForTableTab}>
          </TabsTaskDetail>
        </ContainerTabs>
        <ButtonContainer>
        <Button
          type="primary"
          onClick={() =>
            history.push(`/task/${id}/process/${processInstanceId}`)
          }
          style= {{backgroundColor: '001529'}}
        >
          Completar
        </Button>
        </ButtonContainer>
        </div>
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
