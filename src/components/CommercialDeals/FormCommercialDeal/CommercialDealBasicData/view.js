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
import moment from 'moment';
import { mapTipoToIntegerIdTipo } from './utils';
import { ColBasicData } from './styles';

const initialValues = 
    { 
      nombre: '',
      descripcion: '',
      idtipo: '',
      codcupon: '',
      fechainicio: '',
      fechafin: '',
      margen: 0,
      ind_surtido: false 
    };
   


class CommercialDealBasicData extends React.Component {
    state = {
        isVisible: false,
    }
   
      goToNextIfValidationOk = (errors)=>{
    
        if(errors && (!errors.nombre && !errors.tipo && !errors.fechainicio && !errors.fechafin && !errors.margen && !errors.ind_surtido ))
        {
            this.setState({isVisible: true})
        }else{
            this.setState({isVisible: false})
        }
    }
    render(){
        const { 
            createCommercialDeal, 
            currentStep, setCommercialDealType, 
            commercialDealType, 
            currentCommercialDeal,
            editCommercialDeal,
            escalados,
            clientes,
            productos,
            formKey,
            isNewCommercialDeal,
            isNotEditable,
        } = this.props;
        const lines = currentCommercialDeal.escalados;
        //this.setState({lines: lines});
        const id = currentCommercialDeal && currentCommercialDeal.idcondcomercial
        const formikInitialValue = id ? {
            ...initialValues, 
            ...currentCommercialDeal,
            fechainicio: currentCommercialDeal.fechainicio ? moment(currentCommercialDeal.fechainicio): '',
            fechafin: currentCommercialDeal.fechafin ? moment(currentCommercialDeal.fechafin): '',
            ind_surtido: currentCommercialDeal.ind_surtido ? currentCommercialDeal.ind_surtido : '',

        } : initialValues
        return (
            <Formik
                key = {formKey}
                enableReinitialize
                initialValues={formikInitialValue}
                //initialValues = {initialValues}
                onSubmit={(values, errors) => { 
                    const {
                        nombre,
                        descripcion,
                        tipo,
                        codcupon,
                        fechainicio,
                        fechafin, 
                        margen,
                        ind_surtido,
                
                    } = values;

                    if(id){
                        
                        editCommercialDeal({
                            id, 
                            values: {
                                nombre: nombre,
                                descripcion: descripcion,
                                fechainicio: fechainicio,
                                margen: margen,
                                ind_surtido: ind_surtido,
                                idtipo: mapTipoToIntegerIdTipo(tipo),
                                fechafin: fechafin,
                                codcupon: codcupon,
                                escalados: escalados, 
                                productos: productos, 
                                clientes: clientes,
                                
                            }
                        })
                    }else{
                        if(tipo === 3){
                            createCommercialDeal({ 
                                nombre: nombre,
                                descripcion: descripcion,
                                codcupon: codcupon,
                                fechainicio: moment(fechainicio).format(),
                                fechafin: moment(fechafin).format(),
                                idtipo: tipo,
                                margen: margen,
                                ind_surtido: ind_surtido,
                                escalados: [],
                                productos: [],
                                clientes: [],
                                idestado: 0
                            });
                            this.goToNextIfValidationOk(errors)

                        }else{
                            createCommercialDeal({ 
                                nombre: nombre,
                                descripcion: descripcion,
                                codcupon: '',
                                fechainicio: moment(fechainicio).format(),
                                fechafin: moment(fechafin).format(),
                                idtipo: tipo,
                                margen: margen,
                                ind_surtido: ind_surtido,
                                escalados: [],
                                productos: [],
                                clientes: [],
                                idestado: 0
                            });
                            this.goToNextIfValidationOk(errors)

                        }
                    }
                   
                    setCommercialDealType({idtipo: tipo})
                   
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
                                <Form.Item label="Tipo de Condici??n">
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
                                                    value={dealType.idtipo}
                                                    
                                                >
                                                    {dealType.nombre}
                                               </Select.Option>
                                    }))}
                                    </Select>
                                    {errors.tipo && (<div style={{ color: 'red' }}>{errors.tipo}</div>)}

                                </Form.Item>
                            </Col>
                        
                       
                            <Col md={{span:12}} sm={{span:22}}>
                                <Form.Item label="Nombre">
                                    <Input 
                                        id = 'nombre'  
                                        name = 'nombre'
                                        onChange={handleInput(setFieldValue, 'nombre')}
                                        value = {values.nombre}
                                        placeholder= 'introducir nombre'
                                        type="text"
                                    />
                                    {errors.nombre && (<div style={{ color: 'red' }}>{errors.nombre}</div>)}
                                 </Form.Item>
                            </Col>

                            <Col md={{span:12}} sm={{span:22}}>
                                <Form.Item label="Descripci??n">
                                    <Input 
                                        id = 'descripcion'
                                        name = 'descripcion'
                                        onChange={handleInput(setFieldValue, 'descripcion')}
                                        value = {values.descripcion}
                                        placeholder="Introduce una descripci??n "
                                        type="text"
                                    />
                                </Form.Item>
                            </Col>

                            <Col md={{span:12}} sm={{span:22}}>
                                {(values.tipo === 3 || values.tipo === "Campa??a") && (
                                <Form.Item label="Codigo de Campa??a">
                                    <Input 
                                        id= 'codcupon'
                                        name = 'codcupon'
                                        value = {values.codcupon}
                                        placeholder="Introduce un c??digo de descuento"
                                        onChange={handleInput(setFieldValue, 'codcupon')}
                                    />
                                    {errors.codcupon && (<div style={{ color: 'red' }}>{errors.codcupon}</div>)}

                                </Form.Item>
                                )}
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
                                        placeholder="Introduce una fecha de finalizaci??n"
                                        onChange={handleInput(setFieldValue, 'fechafin')}
                                        style={{width:'100%'}}/>
                                    {errors.fechafin && (<div style={{ color: 'red' }}>{errors.fechafin}</div>)}

                                </Form.Item>
                            </Col>

                            <Col md={{span:12}} sm={{span:22}}>
                            {(values.tipo === 2 || values.tipo === "Plan de Compra") && (
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
                                )}
                            </Col>

                            <Col md={{span:12}} sm={{span:22}}>
                                <Form.Item label="Surtido">
                                    {this.props.currentCommercialDeal.ind_surtido ? 
                                        <Switch 
                                            disabled= {isNotEditable ? true : false}
                                            id = 'ind_surtido' 
                                            defaultChecked
                                            name = 'ind_surtido'
                                            checked={values.ind_surtido ? true : false}
                                            value = {values.ind_surtido}
                                            onChange={handleInput(setFieldValue, 'ind_surtido')}
                                        /> : 
                                        <Switch 
                                            disabled= {isNotEditable ? true : false}
                                            id = 'ind_surtido'
                                            name = 'ind_surtido'
                                            checked={values.ind_surtido ? true : false}
                                            value = {values.ind_surtido}
                                            onChange={handleInput(setFieldValue, 'ind_surtido')}
                                        />}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Row gutter={8} type="flex">
                                {currentStep > 0 && (
                                    <Col>
                                        <Button type="primary" htmlType="submit" onClick={this.props.onClickBack}>
                                            Atr??s
                                        </Button>
                                    </Col>
                                )}
                                
                                <Col> 
                                    { (isNewCommercialDeal || currentCommercialDeal.estado === "Borrador") &&(
                                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                            Guardar
                                        </Button>
                                    )}
                                </Col>

                                <Col>  
                                    {!!id && (
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