import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row,
    Form,
    Input,
    InputNumber,
    Button,
    Icon
} from 'antd';
import './styles.css'
import { Formik } from 'formik';
import basicDataSchema from './validator';
import { handleInput } from '../../../../lib/forms'
import { continueProcessFailed } from '../../../../modules/forms/actions';

class CommercialDealLines extends React.Component {
    
    addRow = (values) => {
        const {currentCommercialDeal} = this.props;
        if(values && values.descuento && values.udsmaximas && values.udsminimas){
            this.setState({lines: [...currentCommercialDeal.escalados, values] }); 
            return [...currentCommercialDeal.escalados, values];
        
        }  
      };
    
    getSelectedEscalados = (escalados, values ) => {
        const valuesNotEmpty = (values && values.descuento && values.udsmaximas && values.udsminimas);
           if(!escalados.length && valuesNotEmpty){
                return [values];
            }else if(valuesNotEmpty){
                return [...escalados, values];
            }else{
                return escalados;
            }    
    }

    
    deleteSelectedEscalados = (lines, values) => {
        const escaladosFiltered = lines.filter( line => line.idescalado !== values.idescalado )
        return escaladosFiltered;
    }

    deleteRow = (linea) => {
        const {currentCommercialDeal} = this.props;
        const lines = currentCommercialDeal.escalados
        let indexOfLineTodalete = lines.indexOf(linea)
        lines.splice(indexOfLineTodalete, 1);
        this.setState({lines: lines});  

    }
    
    render(){
    
        const {
            currentStep, 
            editCommercialDeal, 
            currentCommercialDeal, 
            idCommercialDeal, 
            escalados , 
            productos, 
            clientes, 
            setEscaladosCommercialDeal, 
            formKey 
         } = this.props;
        const lines = this.props.currentCommercialDeal.escalados  ? this.props.currentCommercialDeal.escalados: [];
        const id = currentCommercialDeal && currentCommercialDeal.idcondcomercial
        return (
            <Formik
                key = {formKey}
                onSubmit={(values,  errors) => { 
                    editCommercialDeal({
                        id, 
                        values: {
                            //...values,
                            escalados: escalados, 
                            productos: productos, 
                            clientes: clientes
                        }
                    })           
                    
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
            <div>
                   <Row 
                    className="commercial-deal-form-lines-header"
                    gutter={18}>
                        <Col 
                        md={{span:5}}
                        sm={{span:22}}>Unidades M??nimas</Col>
                        <Col 
                        md={{span:5}}
                        sm={{span:22}}>Unidades M??ximas</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}>Descuento</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}>Texto Equivalente</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}></Col>
                    </Row>
                    { currentCommercialDeal.estado === "Borrador" &&(
                    <Row 
                    className="commercial-deal-form-lines-new"
                    style={{marginTop:10}}
                    gutter={18}>
                            <Col 
                            md={{span:5}}
                            sm={{span:22}}>
                                <Form.Item>
                                    <InputNumber 
                                        id= 'udsminimas' 
                                        name= 'udsminimas' 
                                        style={{width:'100%'}}
                                        onChange={handleInput(setFieldValue, 'udsminimas')}
                                        value = {values.udsminimas}
                                        placeholder="Introduce las unidades m??nimas"
                                        
                                    />
                                    {errors.udsminimas && (<div style={{ color: 'red' }}>{errors.udsminimas}</div>)}

                                </Form.Item>
                            </Col>
                            <Col 
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                <InputNumber 
                                    id = 'udsmaximas' 
                                    name = 'udsmaximas' 
                                    style={{width:'100%'}}
                                    onChange={handleInput(setFieldValue, 'udsmaximas')}
                                    value = {values.udsmaximas}
                                    placeholder="Introduce las unidades m??ximas"
                                    
                                />
                                {errors.udsmaximas && (<div style={{ color: 'red' }}>{errors.udsmaximas}</div>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                    <InputNumber 
                                        id = 'descuento' 
                                        name = 'descuento' 
                                        style={{width:'100%'}}
                                        onChange={handleInput(setFieldValue, 'descuento')}
                                        value = {values.descuento}
                                        placeholder="Introduce el valor del descuento"
                                        
                                    />
                                    {errors.descuento && (<div style={{ color: 'red' }}>{errors.descuento}</div>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                    <Input 
                                        id = 'txtdescuento' 
                                        name = 'txtdescuento'
                                        onChange={handleInput(setFieldValue, 'txtdescuento')}
                                        value = {values.txtdescuento}
                                        placeholder="Introduce texto de descuento"
                                    />
                                    {errors.txtdescuento && (<div style={{ color: 'red' }}>{errors.txtdescuento}</div>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:4}}
                            sm={{span:22}}>
                                <Form.Item>
                                    
                                        <Button type="primary" htmlType="submit" onClick={() =>{
                                            setEscaladosCommercialDeal({escalados: this.getSelectedEscalados(escalados, values)});
                                            this.addRow(values);
                                        }}>
                                       Agregar
                                    </Button>
                                </Form.Item>
                            </Col>
                    </Row>)}
                    <Row className="commercial-deal-form-lines-body">
                        {lines.map((line) =>
                           <Row 
                           style={{marginTop:10, paddingTop:'10px', borderWidth:'2px 0 0 0', borderStyle:'solid', borderColor:'rgba(0,0,0,0.2)'}}
                           gutter={18}>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.udsminimas}</Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.udsmaximas}
                                </Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.descuento}</Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.txtdescuento}</Col>
                                <Col 
                                md={{span:4}}
                                sm={{span:22}}>
                                    { currentCommercialDeal.estado === "Borrador" &&(
                                        <Button type="primary" htmlType="submit" onClick={()=>{
                                            setEscaladosCommercialDeal({escalados:this.deleteSelectedEscalados(lines, line)})
                                            editCommercialDeal({
                                                id, 
                                                values: {
                                                    //...values,
                                                    escalados: escalados,
                                                    productos: productos, 
                                                    clientes: clientes
                                                }
                                            }) 
                                            this.deleteRow(this.props.currentCommercialDeal.escalados)}}>
                                            <Icon type="delete" />
                                        </Button>
                                    )}
                                </Col>
                            </Row> 
                        )}
                    </Row> 
                    <Form.Item>
                    <Row gutter={8} type="flex">
                        {currentStep > 0 ?  
                            <Col>
                                <Button type="primary" htmlType="submit" onClick={this.props.onClickBack}>
                                    Atr??s
                                </Button>
                            </Col>
                        : ''}
                        
                            <Col> 
                                <Button type="primary" htmlType="submit" onClick={this.props.onClickNext}>
                                    Siguiente
                                </Button>
                            </Col>
                            <Col> 
                                { currentCommercialDeal.estado === "Borrador" &&(
                                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                        Guardar
                                    </Button>
                                )}
                            </Col>
                           
                        
                    </Row>
                </Form.Item>    
                        
                
            </div>
            )}}
         </Formik>   
        );
    };
};

CommercialDealLines.propTypes = {
    currentCommercialDeal: PropTypes.object
};
export default CommercialDealLines;