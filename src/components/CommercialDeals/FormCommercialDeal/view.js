import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form} from 'antd';
import FormDefinition from './FormDefinition';
import './styles.css';

var FormComponent = () =>{
    return <div><FormDefinition/></div>;
};

const FormCommercialDeal = ({
    currentCommercialDeal,
    editCommercialDealVisible,
    newCommercialDealVisible,
    showEditCommercialDeal,
    showNewCommercialDeal,
    setProductsCommercialDeal,
    setUsersCommercialDeal,
    setNewCommercialDeal,
   
}) => {
    useEffect(()=>{
    },[newCommercialDealVisible,editCommercialDealVisible])
    return ( 
            <Modal 
                maskClosable={false}
                destroyOnClose={false}
                className="commercial-deals-modal-form"
                centered
                footer={<div></div>}
                visible={editCommercialDealVisible || newCommercialDealVisible}
                onCancel={()=> {
                    showEditCommercialDeal(false);
                    showNewCommercialDeal(false);
                    setNewCommercialDeal(false)
                    setProductsCommercialDeal({productos: []})
                    setUsersCommercialDeal({clientes: []})
                }}
                onOk={()=> {
                    showEditCommercialDeal(false);
                    showNewCommercialDeal(false);
                }}>
                <FormComponent></FormComponent>
            </Modal>);
};

FormCommercialDeal.propTypes = {
    currentCommercialDeal: PropTypes.object,
    editCommercialDealVisible: PropTypes.bool,
    newCommercialDealVisible:PropTypes.bool,
    showEditCommercialDeal: PropTypes.func,
    showNewCommercialDeal: PropTypes.func
};
export default FormCommercialDeal;