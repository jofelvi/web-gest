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
    goToNextStep = e => {
        e.preventDefault();
        const { currentStep } = this.state;
        this.setState({ currentStep: currentStep + 1})         
      };
    onStepChange = currentStep => {
        this.setState({ currentStep: currentStep});
    };

    render(){
        //CommercialDealLinesForm = Form.create(this.props.currentCommercialDeal)(CommercialDealLines);
        //const { getFieldDecorator } = this.props.form;
        const {dealTypes, commercialDealType} = this.props
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
                    dealTypes = {dealTypes}
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    
                ></CommercialDealBasicData>
                </div>
                <div style={{display:currentStep !== 1 ? 'none': 'block'}}>
                    <CommercialDealLines 
                    currentStep = {currentStep}
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealLines>
                </div>
                <div style={{display: this.props.currentCommercialDeal.tipo !== "Campaña" && currentStep === 2 ? 'block': 'none'}}>
                    <CommercialDealProducts
                    currentStep = {currentStep}  
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealProducts>
                </div>
                
                <div>
                {commercialDealType && (commercialDealType === 1 || commercialDealType === 2 || commercialDealType === 3)&& currentStep === 3 && (
                    <CommercialDealUsers
                    commercialDealType = { commercialDealType }
                    currentStep = {currentStep}  
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealUsers>) }
                    {currentStep === 3 && commercialDealType === 0 && (
                    <span>Este paso no aplica</span>)}
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