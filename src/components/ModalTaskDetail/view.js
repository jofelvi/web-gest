import React from "react";

import { Container, ButtonCustom, Label, ContainerData, ContainerDataLabel } from './styles';
import { Modal } from 'antd';


  const ModalTaskDetail = ({
    visible,
    handleOk,
    handleCancel,
    content,
    data,
    titleModal,
    footer,
  ...rest}) => {        return(
         
  <Container> 
    <Modal
          title={titleModal}
          visible={visible}
          //onOk={handleOk}
          footer={footer}
          onCancel={handleCancel}
        >
          {content}
        </Modal>
  </Container>
  )}

    ModalTaskDetail.propTypes = {
 
    };
    export default ModalTaskDetail;