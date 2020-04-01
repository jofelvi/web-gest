import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputData from '../InputData'
import { Input, Button } from 'antd';
import Utils from '../../lib/utils';
import TabsTaskDetail from '../TabsTaskDetail'
import ModalTaskDetail from '../ModalTaskDetail'
import { 
  Container, 
  CardCustom, 
  ContainerSide, 
  ContainerTextArea, 
  ContainerTabs, 
  Label, 
  ContainerInputData,
  ContainerModal,
  ContentContainer
} from './styles';
import { mapperInputData, validationSchema } from './constants';
import { Formik } from 'formik';
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
const [inputKey, setInputKey] = useState('')
 const showModal = () => {
   setIsVisible(true)   
  };

 const handleOk = e => {
    setIsVisible(false)
    console.log("evento", e)
  };
  
 const handleCancel = e => {
    setIsVisible(false)
  };
 
  return(
<CardCustom title={name} bordered={false} >
  <Container>
      <ContainerInputData>
         <ContainerSide> 
            <InputData 
            title = {'Fecha de creación'} 
            data= {Utils.renderDate(created)} 
            noButton = {true}>
            </InputData> 
            <InputData 
            title = {'Fecha de vencimiento'} 
            data= {due? due:'no-data'}
            onClick = {() =>{
            showModal();
            setInputKey('due')}}>
            </InputData> 
        </ContainerSide>
        <ContainerSide> 
            <InputData 
            title = {'Asignado a'} 
            data= {assignee? assignee:'no-data'}
            onClick = {() =>{
            showModal();
            setInputKey('assignee')}}>
            </InputData> 
            <InputData  
            title = {'Prioridad'} 
            data= {priority? priority:'no-data'}
            onClick = {() =>{
            showModal();
            setInputKey('priority')}}>
            </InputData> 
        </ContainerSide>
      </ContainerInputData>
      <ContainerTextArea>
        <Label>Comentario</Label>
        <TextArea rows={4} />
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
        priority: 0
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Values");
        console.log(values);
      }}>
       { ({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <ModalTaskDetail
        visible = { isVisible }
        handleCancel = { handleCancel }
        titleModal = { mapperInputData.map(input =>(input[inputKey])) }
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary"  onClick={(e) => {
            handleSubmit(e);
            handleOk(e)
          }}>
            Submit
          </Button>,
        ]}
        content= {
       
          <ContentContainer>
          <Label>{ mapperInputData.map(input =>(input[inputKey])) }</Label>
         <Input
         id= {inputKey}
         value={values[inputKey]}
         placeholder= {inputKey}
         onChange={handleChange}
         onBlur={handleBlur}
         />
        {/* <Button onClick =  {}> Guardar</Button> */}
         </ContentContainer>
         
        }>
        </ModalTaskDetail>
      )}
        </Formik>
      </ContainerModal>
  </Container>
</CardCustom>
  
     ) };

TaskDetail.propTypes = {
  selectedTask: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    processDefinitionName: PropTypes.string,
    processInstanceId: PropTypes.string
  }).isRequired
};

export default TaskDetail;
