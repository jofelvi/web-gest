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
import './styles.css';
import { Formik } from 'formik';
import basicDataSchema from './validator';
import { handleInput } from '../../../../lib/forms';

const initialValues = { email: '', password: '' };
class CommercialDealBasicData extends React.Component {
    state = {
        lines:this.props.currentCommercialDeal.escalados?  this.props.currentCommercialDeal.escalados : []
    }
    addRow = e => {
        e.preventDefault();
      
        
      };
    render(){
        const { createCommercialDeal, currentStep} = this.props;

        //const { getFieldDecorator } = this.props.form;
        const lines = this.props.currentCommercialDeal.escalados;
        //this.setState({lines: lines});
        return (
            <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const {
          email,
          password,
        } = values;
        createCommercialDeal({ values});
      }}
      validationSchema={basicDataSchema}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          handleSubmit,
          errors,
        } = props;
        return(
            <div style={{display: this.props.currentStep !== 0 ? 'none': 'block'}}>
            <Row style={{marginTop:30}} gutter={18}>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Nombre de Condición">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Descripción">
                        <Input/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Tipo de Condición">
                        
                        <Select>
                            {this.props.dealTypes && (this.props.dealTypes.map((dealType)=>{
                                return <Select.Option key={dealType.idtipo} value={dealType.idtipo}>{dealType.nombre}</Select.Option>
                            }))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Codigo de Campaña">
                       <Input/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Fecha de Inicio">
                      <DatePicker format="DD/MM/YYYY" locale={this.props.locale} style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Fecha Final">
                      <DatePicker format="DD/MM/YYYY" locale={this.props.locale} style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Margen">
                       <InputNumber style={{width:'100%'}}/>
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                <Form.Item label="Surtido">
                    {this.props.currentCommercialDeal.ind_surtido ? 
                       <Switch defaultChecked/> : 
                        <Switch/>}
                </Form.Item>
            </Col>
        </Row>
        <Form.Item>
                    <Row gutter={8} type="flex">
                        {currentStep > 0 ?  
                            <Col>
                                <Button type="primary" htmlType="submit" onClick={this.props.onClickBack}>
                                    Atrás
                                </Button>
                            </Col>
                        : ''}
                        
                            <Col> 
                                <Button type="primary" htmlType="submit" onClick={this.props.onClickNext}>
                                    Siguiente
                                </Button>
                            </Col>
                            <Col> 
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                    Guardar
                                </Button>
                            </Col>
                        
                    </Row>
                </Form.Item>    
        </div>
        )}}
        </Formik> 
        )
    };
};

CommercialDealBasicData.propTypes = {
    currentCommercialDeal: PropTypes.object
};
export default CommercialDealBasicData;