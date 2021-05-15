import React from "react";

import { Container, } from './styles';
import { Modal } from 'antd';

const ModalTaskDetail = ({
    visible,
    handleOk,
    handleCancel,
    content,
    data,
    titleModal,
    footer,
    ...rest}) => {        
    return(
      <Container> 
        <Modal
          title={titleModal}
          visible={visible}
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