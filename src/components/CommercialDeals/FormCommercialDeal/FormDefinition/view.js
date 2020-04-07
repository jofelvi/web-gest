import React from 'react';
import PropTypes from 'prop-types';
import {  
    Form, 
    Input, 
    InputNumber,
    Button,
    Select, 
    DatePicker, 
    Row, 
    Col,
    Divider,
    Switch,
    Steps} from 'antd';
import CommercialDealProducts from '../CommercialDealProducts';
import locale from 'antd/lib/date-picker/locale/es_ES';
import * as moment from 'moment';
import CommercialDealLines from '../CommercialDealLines';
import CommercialDealUsers from '../CommercialDealUsers';
import CommercialDealBasicData from '../CommercialDealBasicData';

import Formik from 'formik';

const {Step} = Steps;

var CommercialDealLinesForm =() =>{
    return <div></div>;
};

class FormDefinition extends React.Component {
    state={
        currentStep: 0
    }
    backStep = e => {
        e.preventDefault();
        const { currentStep} = this.state;
        this.setState({ currentStep: currentStep - 1});
    };
    handleSubmit = e => {
        e.preventDefault();
        const { currentStep} = this.state;
     console.log("soy el current step", currentStep)
           
                    //this.props.createCommercialDeal({values})
                    this.setState({ currentStep: currentStep + 1});
                    //this.props.showEditCommercialDeal(false);
                    //this.props.showNewCommercialDeal(false);
              
        
        
      };
    onStepChange = currentStep => {
        this.setState({ currentStep: currentStep});
    };

    render(){
        //CommercialDealLinesForm = Form.create(this.props.currentCommercialDeal)(CommercialDealLines);
        //const { getFieldDecorator } = this.props.form;
        const {createCommercialDeal} = this.props
        const { currentStep} = this.state;
        return  (
        <div>
            <Steps 
                direction="horizontal" 
                current={currentStep}
                className='commercial-deal-steps'
                >
                <Step title="Datos Básicos" description=""/>                   
                <Step title="Lineas de Escalado" description=""/>
                
                {this.props.currentCommercialDeal.tipo !== "Campaña"? <Step title="Productos" description=""/> :''}
                {this.props.currentCommercialDeal.tipo !== "Promoción" ? <Step title="Usuarios" description=""/>: ''}
            </Steps>
            <Divider></Divider>
            <Form 
                labelCol={{span:10}} 
                wrapperCol={{span:14}}  
                layout="vertical"
                >
                <div>
                <CommercialDealBasicData
                currentStep = {currentStep}
                locale = {locale}
                dealTypes = {this.props.dealTypes}
                ></CommercialDealBasicData>
                </div>
                <div style={{display:currentStep !== 1 ? 'none': 'block'}}>
                    <CommercialDealLines></CommercialDealLines>
                </div>
                <div style={{display: this.props.currentCommercialDeal.tipo !== "Campaña" && currentStep === 2 ? 'block': 'none'}}>
                    <CommercialDealProducts></CommercialDealProducts>
                </div>
                <div style={{display: this.props.currentCommercialDeal.tipo !== "Promoción" && currentStep === 3 ? 'block': 'none'}}>
                    <CommercialDealUsers></CommercialDealUsers>
                </div>
                {/* <Divider></Divider> */}
                
            </Form>
        </div>
        );
    }
}
FormDefinition.propTypes = {
    currentCommercialDeal: PropTypes.object,
    createCommercialDeal: PropTypes.func,
    showEditCommercialDeal: PropTypes.func,
    showNewCommercialDeal: PropTypes.func
};

export default FormDefinition;