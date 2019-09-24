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
import CommercialDealUsers from '../CommercialDealUsers';
import locale from 'antd/lib/date-picker/locale/es_ES';
import * as moment from 'moment';
import CommercialDealLines from '../CommercialDealLines';

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
        if(currentStep === 0){
            const columnsToValidate = [
                'nombre',
                'descripcion',
                'tipo',
                'fechainicio',
                'fechafin',
                'margen',
                'ind_surtido'
            ];
            this.props.form.validateFieldsAndScroll(columnsToValidate,(err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    this.setState({ currentStep: currentStep + 1});
                    //this.props.showEditCommercialDeal(false);
                    //this.props.showNewCommercialDeal(false);
                }
            });  
        } else {
            this.setState({ currentStep: currentStep + 1});
        }
        
      };
    onStepChange = currentStep => {
        console.log(currentStep);
        
        this.setState({ currentStep: currentStep});
    };

    render(){
        CommercialDealLinesForm = Form.create(this.props.currentCommercialDeal)(CommercialDealLines);
        const { getFieldDecorator } = this.props.form;
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
                
                {this.props.currentCommercialDeal.tipo != "Campaña"? <Step title="Productos" description=""/> :''}
                {this.props.currentCommercialDeal.tipo != "Promoción" ? <Step title="Usuarios" description=""/>: ''}
            </Steps>
            <Divider></Divider>
            <Form 
                labelCol={{span:10}} 
                wrapperCol={{span:14}}  
                layout="vertical"
                >
                <div style={{display: currentStep != 0 ? 'none': 'block'}}>
                    <Row style={{marginTop:30}} gutter={18}>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Nombre de Condición">
                                {getFieldDecorator('nombre', {
                                    initialValue: this.props.currentCommercialDeal.nombre,
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Rellene la información',
                                    },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Descripción">
                                {getFieldDecorator('descripcion', {
                                    initialValue: this.props.currentCommercialDeal.descripcion,
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Rellene la información',
                                    },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Tipo de Condición">
                                {getFieldDecorator('tipo', {
                                    initialValue: this.props.currentCommercialDeal.tipo,
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Rellene la información',
                                        },
                                    ],
                                })(
                                <Select>
                                    <Select.Option key="0" value="0">Promoción</Select.Option>
                                    <Select.Option key="1" value="1">Acuerdo Comercial</Select.Option>
                                    <Select.Option key="2" value="2">Plan de Compra</Select.Option>
                                    <Select.Option key="3" value="3">Campaña</Select.Option>
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Codigo de Campaña">
                                {getFieldDecorator('codcupon', {
                                    initialValue: this.props.currentCommercialDeal.codcupon,
                                    rules: [
                                    {
                                        required: false,
                                        message: 'Rellene la información',
                                    },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Fecha de Inicio">
                                {getFieldDecorator('fechainicio', {
                                    initialValue: moment(this.props.currentCommercialDeal.fechainicio),
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Rellene la información',
                                    },
                                    ],
                                })(<DatePicker format="DD/MM/YYYY" locale={locale} style={{width:'100%'}}/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Fecha Final">
                                {getFieldDecorator('fechafin', {
                                    initialValue: moment(this.props.currentCommercialDeal.fechafin),
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Rellene la información',
                                    },
                                    ],
                                })(<DatePicker format="DD/MM/YYYY" locale={locale} style={{width:'100%'}}/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                            <Form.Item label="Margen">
                                {getFieldDecorator('margen', {
                                    initialValue: this.props.currentCommercialDeal.margen,
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Rellene la información',
                                    }
                                    ],
                                })(<InputNumber style={{width:'100%'}}/>)}
                            </Form.Item>
                        </Col>
                        <Col md={{span:12}} sm={{span:22}}>
                        <Form.Item label="Surtido">
                            {this.props.currentCommercialDeal.ind_surtido ? 
                                getFieldDecorator('ind_surtido', {})(<Switch defaultChecked/>) : 
                                getFieldDecorator('ind_surtido', {})(<Switch/>)}
                        </Form.Item>
                    </Col>
                </Row>
                </div>
                <div style={{display:currentStep != 1 ? 'none': 'block'}}>
                    <CommercialDealLinesForm></CommercialDealLinesForm>
                </div>
                <div style={{display: this.props.currentCommercialDeal.tipo != "Campaña" && currentStep === 2 ? 'block': 'none'}}>
                    <CommercialDealProducts></CommercialDealProducts>
                </div>
                <div style={{display: this.props.currentCommercialDeal.tipo != "Promoción" && currentStep === 3 ? 'block': 'none'}}>
                    <div>Usuarios</div>
                </div>
                <Divider></Divider>
                <Form.Item>
                    <Row gutter={18}>
                        {currentStep > 0 ?  
                            <Col md={{span:4}} sm={{span:12}}>
                                <Button type="primary" htmlType="submit" onClick={this.backStep}>
                                    Atrás
                                </Button>
                            </Col>
                        : ''}
                        {currentStep >= 0 ? 
                            <Col md={{span:4}} sm={{span:12}}> 
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                    Siguiente
                                </Button>
                            </Col>
                        : ''}
                    </Row>
                </Form.Item>    
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