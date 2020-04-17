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
    
    
    backStep = e => {
        e.preventDefault();
        const { currentStep} = this.props;
        this.props.setCommercialDealFormStep({ currentStep: currentStep - 1});
    };
    goToNextStep = e => {
        e.preventDefault();
        const { currentStep } = this.props;
        this.props.setCommercialDealFormStep({ currentStep: currentStep + 1})         
      };
    onStepChange = currentStep => {
        this.props.setCommercialDealFormStep({ currentStep: currentStep});
    };

    render(){
        const {dealTypes, commercialDealType, currentStep} = this.props
        return  (
        <div>
            <Steps 
                direction="horizontal" 
                current={currentStep}
                className='commercial-deal-steps'
                >
                <Step title="Datos Básicos" description=""/>                   
                <Step title="Lineas de Escalado" description=""/>
                <Step title="Productos" description=""/> 
                <Step title="Usuarios" description=""/>
                
                {/* {this.props.currentCommercialDeal.tipo !== "Campaña"? <Step title="Productos" description=""/> :''} */}
                {/* {this.props.currentCommercialDeal.tipo !== "Promoción" ? <Step title="Usuarios" description=""/>: ''} */}
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
                <div style={{display: currentStep !== 1 ? 'none': 'block'}}>
                    <CommercialDealLines 
                    currentStep = {currentStep}
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealLines>
                </div>
                <div style={{display: currentStep === 2 ? 'block': 'none'}}>
                    <CommercialDealProducts
                    currentStep = {currentStep}  
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealProducts>
                </div>
                
                <div style={{display: currentStep === 3 ? 'block': 'none'}}>
               
                    <CommercialDealUsers
                    commercialDealType = { commercialDealType }
                    currentStep = {currentStep}  
                    onClickNext = {(e)=>{ this.goToNextStep(e)}}
                    onClickBack = {this.backStep}
                    ></CommercialDealUsers>
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