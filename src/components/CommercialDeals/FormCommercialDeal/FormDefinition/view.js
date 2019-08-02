import React from 'react';
import PropTypes from 'prop-types';
import {  Form, Input, Button, Select, DatePicker  } from 'antd';
import locale from 'antd/lib/date-picker/locale/es_ES';
import * as moment from 'moment';

class FormDefinition extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return  (
        <Form onSubmit={this.handleSubmit} labelCol={{span:6}} wrapperCol={{span:12}} layout="vertical">
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
            <Form.Item label="Tipo de Condición">
            {getFieldDecorator('tipocondicion', {
                initialValue: this.props.currentCommercialDeal.tipocondicion,
                rules: [
                {
                    required: true,
                    message: 'Rellene la información',
                },
                ],
            })(
            <Select>
                <Select.Option key="p">Promoción</Select.Option>
                <Select.Option key="ac">Acuerdo Comercial</Select.Option>
                <Select.Option key="pc">Plan de Compra</Select.Option>
                <Select.Option key="c">Campaña</Select.Option>
            </Select>)}
            </Form.Item>
            <Form.Item label="Fecha de Inicio">
            {getFieldDecorator('fechainicio', {
                initialValue: moment(this.props.currentCommercialDeal.fechainicio,'DD/MM/YYYY'),
                rules: [
                {
                    required: true,
                    message: 'Rellene la información',
                },
                ],
            })(<DatePicker format="DD/MM/YYYY" locale={locale}/>)}
            </Form.Item>
            <Form.Item label="Fecha Final">
            {getFieldDecorator('fechafin', {
                initialValue: moment(this.props.currentCommercialDeal.fechafin,'DD/MM/YYYY'),
                rules: [
                {
                    required: true,
                    message: 'Rellene la información',
                },
                ],
            })(<DatePicker format="DD/MM/YYYY" locale={locale}/>)}
            </Form.Item>
            <Form.Item label="Codigo de Campaña">
            {getFieldDecorator('codigocampania', {
                initialValue: this.props.currentCommercialDeal.codigocampania,
                rules: [
                {
                    required: true,
                    message: 'Rellene la información',
                },
                ],
            })(<Input/>)}
            </Form.Item>
            <Form.Item label="Estado">
            {getFieldDecorator('estado', {
                initialValue: this.props.currentCommercialDeal.estado,
                rules: [
                {
                    required: true,
                    message: 'Rellene la información',
                },
                ],
            })( 
            <Select>
                <Select.Option key="borrador">Borrador</Select.Option>
                <Select.Option key="activo">Activo</Select.Option>
                <Select.Option key="inactivo">Inactivo</Select.Option>
            </Select>)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {this.props.currentCommercialDeal.id ? 'Guardar': 'Crear'}
                </Button>
            </Form.Item>
        </Form>
        );
    }
}
FormDefinition.propTypes = {
    currentCommercialDeal: PropTypes.object,
};

export default FormDefinition;