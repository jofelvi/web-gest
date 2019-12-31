
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {InfoContainer} from './styles'
import { Modal, Button } from 'antd';

class ModalDetailOrder extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
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

          