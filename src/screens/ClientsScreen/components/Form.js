import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import {InputsContainer} from "../../../lib/styled";
import { UpOutlined, DownOutlined, ExclamationCircleOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import {estados} from './../../../modules/clients-indas/api';
import _ from 'underscore';
import { get, keys, map } from 'lodash';
import * as moment from "moment";
import { Spin, Typography, Space } from 'antd';
import {InputBox} from "../../OrderListScreen/styled";
//import locale from 'antd/es/date-picker/locale/es_ES';
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";
import Utils from '../../../lib/utils';

moment.locale("es", {
    week: {
        dow: 1
    }
});

const { Text, Link } = Typography;

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;
const inputStyle = {
    width: 'calc(100% - 40px)',
    margin: '10px'
}
const inputErrorStyle = {
    width: 'calc(100% - 40px)',
    margin: '10px',
    border: '1px solid red',
    borderRadius: '4px'
}

const errorTooltipStyle = {
    position: 'absolute',
    top: '35px',
    right: '40px',
    fontSize: '17px',
}

const spacedErrorTooltipStyle = {
    position: 'absolute',
    top: '35px',
    right: '65px',
    fontSize: '17px',
}

const { TabPane } = Tabs;

const renderDate = (dateStr, record, index) => {
    if ( ! dateStr ) {
        return ( '-' );
    }
    return (
        <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
            <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
        </Tooltip>);
}
class ClientsForm extends React.Component {
    constructor(props) {
        super(props)
        console.log( 'client', props.client )
        this.state = {
            error: props.error,
            client: props.client,
            loading: props.loading,
            showDetails: props.show,
        }
        this.save = this.save.bind( this )
        this.validate = this.validate.bind( this )
        this.hasError = this.hasError.bind( this )
        this.clearError = this.clearError.bind( this )
    }

    validate( client, successCallback, errorCallback ) {
        const validations = [
            { field: 'nombre', validator: ( value ) => ( value != '' ), message: 'No se puede dejar en blanco' },
        ];

        const validationErrors = [];

        for ( let i in validations ) {
            const validation = validations[i]
            const value = get( client, validation.field, '')
            if ( ! validation.validator( value, client ) ) {
                validationErrors[ validation.field ] = validation.message
            }
        }
        const callback = keys( validationErrors ).length > 0 ? errorCallback : successCallback;
        this.setState( { validationErrors, error: keys( validationErrors ).length > 0 }, callback );
    }

    hasError ( field ) {
        return get( this.state.validationErrors, field, false) !== false;
    }

    clearError ( field ) {
        const currentValidationErrors = this.state.validationErrors
        const validationErrors = { ...currentValidationErrors, [field]: false }
        this.setState( { validationErrors: {  ...validationErrors, [field]: false } })
    }

    getError( field, spaced = false ) {
        if ( this.hasError( field ) ) {
            const validationError = get( this.state.validationErrors, field, false);
            return (
                <div style={ spaced ? spacedErrorTooltipStyle : errorTooltipStyle } >
                    <Tooltip title={ validationError } >
                        <span><ExclamationCircleOutlined style={{ color: 'red', fontSize: '18px' }} /></span>
                    </Tooltip>
                </div>
            )
            return (<Typography type="danger" style={{ color: 'red'}}>{ validationError }</Typography>)
        }
        return '';
    }
    save() {
        const { onSave } = this.props;
        const { client } = this.state;
        this.validate( client, () => {
            onSave(client)
        }, () => {
            this.setState({ error: true })
            document.querySelector('.ant-layout-content').scrollTo(0, 0)
        })
    }



    render() {
        const { error, client, loading, showDetails } = this.state;

        return (
            <ConfigProvider locale={ locale }>
                <React.Fragment>
                    { error && ( <Typography type="danger" style={{ color: 'red'}}> Se ha producido un error al guardar el cliente, por favor, revisa los datos.</Typography>) }
                    <a style={{ float: 'right' }} onClick={ () => this.setState( { showDetails: !showDetails })}>{ showDetails ? 'Mostrar menos' : 'Mostrar m??s' }</a>
                    <h2 style={{margin: '20px 0 10px 0'}}>
                        Datos generales
                    </h2>
                    <div className="table-filters-indas" style={{padding:'20px'}}>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={12} >
                                <label>C??digo Cliente</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.codcli_cbim }
                                    disabled={ true }
                                />
                            </Col>
                            <Col span={12} >
                                <label>Estado</label>
                                <Select
                                    style={inputStyle}
                                    value={estados[ client.idestado ]}
                                    onChange={ ( { target }) => { this.setState( { client: { ...client, idestado: target.value } } ) } }
                                    style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                                    disable={ loading }
                                >
                                    <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                                    { map(estados, ( estado, value ) => {
                                        return (
                                            <Option value={value}>{estado}</Option>
                                        )
                                    } ) }
                                </Select>
                            </Col>

                        </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                                <label>Nombre Cliente</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.nomcli_cbim }
                                    disabled={ true }

                                />
                            </Col>

                            <Col span={12} >
                                <label style={{ display: 'block'}}>Fecha Alta</label>
                                <p style={{ margin: '15px', display: 'inline-block' }}>
                                { renderDate( client.fecha_alta ) }
                                </p>
                            </Col>

                        </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                                <label style={{ display: 'block'}}>Email</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.email }
                                    disabled={ true }
                                    onChange={ ( { target }) => { this.setState( { client: { ...client, email: target.value } } ) } }
                                />
                            </Col>

                            <Col span={12} >
                                <label style={{ display: 'block'}}>Fecha ??ltimo Acceso</label>
                                <p style={{ margin: '15px', display: 'inline-block' }}>
                                    { renderDate( client.fecha_ultimo_acceso ) }
                                </p>
                            </Col>

                        </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                                <Switch
                                    checkedChildren="Si" unCheckedChildren="No"
                                    value={ client.ind_acepta_emailcomercial }
                                    defaultChecked={ client.ind_acepta_emailcomercial }
                                    disabled={ true }
                                    onChange={ ( value) => { this.setState( { client: { ...client, ind_acepta_emailcomercial: value } } ) } }
                                />
                                <label style={{display: 'inline-block', marginTop:'35px', marginLeft: '10px'}}>Acepta email comercial.</label>
                            </Col>

                            <Col span={12} >
                                <label>Fecha Baja</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.fecha_baja }
                                    disabled={ true }
                                />
                            </Col>

                        </Row>

                        { showDetails && (
                            <div>
                            <h3 style={{margin: '20px 0 10px 0'}}>
                                Datos de Registro en la Web
                            </h3>
                            <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={12} >
                            <label>Nombre</label>
                            <Input  style={inputStyle}
                            value={ client.nombre }
                            disabled={ loading }
                            onChange={ (e) => {
                            this.setState({ client: { ...client, nombre: e.target.value }},
                                () => {
                                    this.clearError( 'nombre' )
                                }
                            )

                        } }
                            style={ this.hasError( 'nombre' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'nombre' ) }
                            </Col>
                            <Col span={12} >
                            <label>NIF</label>
                            <Input
                            style={inputStyle}
                            value={ client.nif }
                            disabled={ loading }
                            onChange={ (e) => {
                            this.setState({ client: { ...client, nif: e.target.value }},
                                () => {
                                    this.clearError( 'nif' )
                                }
                            )
                        } }
                            />
                            { this.getError( 'nif' ) }
                            </Col>

                            </Row>
                            <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={12} >
                            <label>Apellido 1</label>
                            <Input
                            style={inputStyle}
                            value={ client.apellido1 }
                            disabled={ loading }
                            onChange={ (e) => {
                            this.setState({ client: { ...client, apellido1: e.target.value }},
                                () => {
                                    this.clearError( 'apellido1' )
                                }
                            )
                        } }
                            style={ this.hasError( 'apellido1' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'apellido1' ) }
                            </Col>
                            <Col span={12} >
                            <label>Tel??fono</label>
                            <Input
                            style={inputStyle}
                            value={ client.telefono }
                            disabled={ loading }
                            onChange={ (e) => {
                            this.setState({ client: { ...client, telefono: e.target.value }},
                                () => {
                                    this.clearError( 'telefono' )
                                }
                            )

                        } }
                            style={ this.hasError( 'telefono' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'telefono' ) }
                            </Col>

                            </Row>
                            <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                            <label>Apellido 2</label>
                            <Input
                            style={inputStyle}
                            value={ client.apellido2 }
                            disabled={ loading }
                            onChange={ (e) => {
                            this.setState({ client: { ...client, apellido2: e.target.value }},
                                () => {
                                    this.clearError( 'apellido2' )
                                }
                            )

                        } }
                            style={ this.hasError( 'apellido2' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'apellido2' ) }
                            </Col>

                            </Row>
                            </div>
                            )
                        }
                        { error && (<Typography type="danger" style={{ color: 'red', marginTop: '10px'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }

                        { true && (
                            <Button size="large" type="primary" onClick={ this.save } style={{marginTop: '10px'}} disabled={ loading }>
                                { loading ? (<Spin></Spin>) : 'Guardar' }
                            </Button>
                        )}

                    </div>




                </React.Fragment>
            </ConfigProvider>
        );
    };

}
ClientsForm.propTypes = {
};

export default  connect(
    state => ({
    }),
    { }
)( ClientsForm );
