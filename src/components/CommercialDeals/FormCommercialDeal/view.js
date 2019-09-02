import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, Divider, Col, Row } from 'antd';
import FormDefinition from './FormDefinition';
import './styles.css'
import { showNewCommercialDeal } from '../../../modules/commercialDeals/actions';
import CommercialDealProducts from './CommercialDealProducts';

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
    showEditCommercialDeal,
    showNewCommercialDeal
}) => {
    useEffect(()=>{
        defineFormComponent(currentCommercialDeal);
    },[currentCommercialDeal,newCommercialDealVisible,editCommercialDealVisible])
    return ( 
            <Modal 
                className="commercial-deals-modal-form"
                centered
                footer={<div></div>}
                visible={editCommercialDealVisible || newCommercialDealVisible}
                onCancel={()=> {
                    showEditCommercialDeal(false);
                    showNewCommercialDeal(false);
                }}
                onOk={()=> {
                    showEditCommercialDeal(false);
                    showNewCommercialDeal(false);
                }}>
                <FormComponent></FormComponent>
                <Divider />
                <CommercialDealProducts></CommercialDealProducts>
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