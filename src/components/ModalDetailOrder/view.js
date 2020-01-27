
import React from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

const ModalDetailOrder =({ visibility, ok, cancel, customFooter, content }) =>
  (
      <div>
        <Modal
          title="Detalles"
          visible={visibility}
          destroyOnClose={true}
          onOk={ok}
          onCancel={cancel}
          footer={customFooter}
          width= {900}
          bodyStyle = {{height: '600px'}} 
        >{content}
         
        </Modal>
      </div>
    )
  

ModalDetailOrder.propTypes = {
 
};
export default ModalDetailOrder;

          