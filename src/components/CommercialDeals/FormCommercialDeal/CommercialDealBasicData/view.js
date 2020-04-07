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

const initialValues = 
    { 
      nombre: '',
      descripcion: '',
      tipo: '',
      codcupon: '',
      fechainicio: '',
      fechafin: '',
      margen: 0,
      ind_surtido: true 
    };
class CommercialDealBasicData extends React.Component {
    state = {
        lines:this.props.currentCommercialDeal.escalados?  this.props.currentCommercialDeal.escalados : [],
        isVisible: false,
    }
    addRow = e => {
        e.preventDefault();
      
        
      };
    goToNextIfNoErrors = (errors)=>{
    
        if(errors && (!errors.nombre && !errors.tipo && !errors.fechainicio && !errors.fechafin && !errors.margen && !errors.ind_surtido ))
        {
            this.setState({isVisible: true})
        }else{
            this.setState({isVisible: false})
        }
    }
    render(){
        const { createCommercialDeal, currentStep} = this.props;

        //const { getFieldDecorator } = this.props.form;
        const lines = this.props.currentCommercialDeal.escalados;
        //this.setState({lines: lines});
        return (
            <Formik
      initialValues={initialValues}
        onSubmit={(values, errors) => {
            console.log("soy el onsubmit")
            console.log(values)
        // const {
        //   nombre,
        //   descripcion,
        //   tipo,
        //   codcupon,
        //   fechainicio,
        //   fechafin,
        //   margen,
        //   ind_surtido
        // } = values;
        createCommercialDeal({ values});
        this.goToNextIfNoErrors(errors)
      }}
      validationSchema={basicDataSchema}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          handleSubmit,
          handleBlur,
          errors,
        } = props;
        return(
            <div style={{display: this.props.currentStep !== 0 ? 'none': 'block'}}>
            <Row style={{marginTop:30}} gutter={18}>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Nombre de Condición">
                        <Input 
                            id = 'nombre'  
                            name = 'nombre'
                            onChange={handleInput(setFieldValue, 'nombre')}
                            value = {values.nombre}
                            placeholder="Introduce el nombre de la "
                            type="text"
                            />
                             {errors.nombre && (<div style={{ color: 'red' }}>{errors.nombre}</div>)}
                            
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Descripción">
                        <Input 
                        id = 'descripcion'
                        name = 'descripcion'
                        onChange={handleInput(setFieldValue, 'descripcion')}
                        value = {values.descripcion}
                        placeholder="Introduce una descripción "
                        type="text"
                        />
                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Tipo de Condición">
                        
                        <Select 
                        id = 'tipo' 
                        name = 'tipo'
                        value = {values.tipo}
                        onChange={handleInput(setFieldValue, 'tipo')}
                        onBlur={handleBlur}
                        >
                            {this.props.dealTypes && (this.props.dealTypes.map((dealType)=>{
                                return <Select.Option 
                                            key={dealType.idtipo} 
                                            value={dealType.idtipo}>
                                            {dealType.nombre}
                                        </Select.Option>
                            }))}
                        </Select>
                        {errors.tipo && (<div style={{ color: 'red' }}>{errors.tipo}</div>)}

                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Codigo de Campaña">
                       <Input 
                       id= 'codcupon'
                       name = 'codcupon'
                       value = {values.codcupon}
                       placeholder="Introduce un código de descuento"
                       onChange={handleInput(setFieldValue, 'codcupon')}
                       />
                    {errors.codcupon && (<div style={{ color: 'red' }}>{errors.codcupon}</div>)}

                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Fecha de Inicio">
                      <DatePicker 
                      id= 'fechainicio' 
                      format="DD/MM/YYYY" 
                      locale={this.props.locale} 
                      style={{width:'100%'}}
                      id= 'fechainicio'
                      name = 'fechainicio'
                      value = {values.fechainicio}
                      placeholder="Introduce una fecha de inicio"
                      onChange={handleInput(setFieldValue, 'fechainicio')}
                      />
                    {errors.fechainicio && (<div style={{ color: 'red' }}>{errors.fechainicio}</div>)}

                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Fecha Final">
                      <DatePicker 
                      id = 'fechafin' 
                      format="DD/MM/YYYY" 
                      locale={this.props.locale} 
                      name = 'fechafin'
                      value = {values.fechafin}
                      placeholder="Introduce una fecha de finalización"
                      onChange={handleInput(setFieldValue, 'fechafin')}
                      style={{width:'100%'}}/>
                      {errors.fechafin && (<div style={{ color: 'red' }}>{errors.fechafin}</div>)}

                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                    <Form.Item label="Margen">
                       <InputNumber 
                       id = 'margen' 
                       name = 'margen'
                       value = {values.margen}
                       placeholder="Introduce un margen"
                       onChange={handleInput(setFieldValue, 'margen')}
                       style={{width:'100%'}}/>
                    {errors.margen && (<div style={{ color: 'red' }}>{errors.margen}</div>)}

                    </Form.Item>
                </Col>
                <Col md={{span:12}} sm={{span:22}}>
                <Form.Item label="Surtido">
                    {this.props.currentCommercialDeal.ind_surtido ? 
                       <Switch 
                            id = 'ind_surtido' 
                            defaultChecked
                            name = 'ind_surtido'
                            value = {values.ind_surtido}
                            onChange={handleInput(setFieldValue, 'ind_surtido')}
                        /> : 
                        <Switch 
                            id = 'ind_surtido'
                            name = 'ind_surtido'
                            value = {values.ind_surtido}
                            onChange={handleInput(setFieldValue, 'ind_surtido')}
                        />}
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
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                    Guardar
                                </Button>
                            </Col>

                            <Col>  {console.log(this.state.isVisible)}
                                {this.state.isVisible && (
                                <Button type="primary" htmlType="submit" onClick={this.props.onClickNext}>
                                    Siguiente
                                </Button> 
                                )}
                               
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