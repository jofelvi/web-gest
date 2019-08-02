import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';
import FormDefinition from './FormDefinition';
import './styles.css'

var FormComponent = () =>{
    return <div></div>;
};

const defineFormComponent = (currentCommercialDeal) =>{
    FormComponent = Form.create(currentCommercialDeal)(FormDefinition);
};
const FormCommercialDeal = ({
    currentCommercialDeal,
    editCommercialDealVisible,
    newCommercialDealVisible,
    showEditCommercialDeal
}) => {
    useEffect(()=>{
        defineFormComponent(currentCommercialDeal);
    },[currentCommercialDeal])
    return  <Modal className="commercial-deals-modal-form"
                centered
                footer={<div></div>}
                visible={editCommercialDealVisible || newCommercialDealVisible}
                onCancel={()=> showEditCommercialDeal(false)}
                onOk={()=> showEditCommercialDeal(false)}>
                <FormComponent></FormComponent>
            </Modal>
};

FormCommercialDeal.propTypes = {
    currentCommercialDeal: PropTypes.object,
    editCommercialDealVisible: PropTypes.bool,
    newCommercialDealVisible:PropTypes.bool,
    showEditCommercialDeal: PropTypes.func
};
export default FormCommercialDeal;