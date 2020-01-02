
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {InfoContainer} from './styles'
import { Modal, Button } from 'antd';

class ModalDetailOrder extends React.Component {
 

  


  render() {
    return (
      <div>
        <Modal
          title="Detalles"
          visible={this.props.visibility}
          destroyOnClose={true}
          onOk={this.props.ok}
          onCancel={this.props.cancel}
          footer={this.props.customFooter}
          width= {900}
          bodyStyle = {{height: '600px'}} 
        >{this.props.content}
         
        </Modal>
      </div>
    );
  }
}
ModalDetailOrder.propTypes = {
 
};
export default ModalDetailOrder;

          