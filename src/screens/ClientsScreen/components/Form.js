import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import {InputsContainer} from "../../../lib/styled";
import { UpOutlined, DownOutlined, ExclamationCircleOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import _ from 'underscore';
import { get, keys } from 'lodash';
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


class ClientsForm extends React.Component {
    constructor(props) {
        super(props)
        console.log( 'client', props.client )
        this.state = {
            error: props.error,
            client: props.client,
            loading: props.loading,
            showDetails: false,
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
                    <a style={{ float: 'right' }} onClick={ () => this.setState( { showDetails: !showDetails })}>{ showDetails ? 'Mostrar menos' : 'Mostrar más' }</a>
                    <h2 style={{margin: '20px 0 10px 0'}}>
                        Datos generales
                    </h2>
                    <div className="table-filters-indas" style={{padding:'20px'}}>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={12} >
                                <label>Código Cliente</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.codcli_cbim }
                                    disabled={ true }
                                />
                            </Col>
                            <Col span={12} >
                                <label>Estado</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.estado }
                                    disabled={ true }
                                />
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
                                <label>Fecha Alta</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.fecha_alta }
                                    disabled={ true }
                                />
                            </Col>

                        </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                                <label>Email</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.email }
                                    disabled={ true }
                                />
                            </Col>

                            <Col span={12} >
                                <label>Fecha Último Acceso</label>
                                <Input
                                    style={inputStyle}
                                    value={ client.fecha_ultimo_acceso }
                                    disabled={ true }
                                />
                            </Col>

                        </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={12} >
                                <Switch
                                    checkedChildren="Si" unCheckedChildren="No"
                                    value={ client.ind_acepta_emailcomercial }
                                    defaultChecked={ client.ind_acepta_emailcomercial }
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
                                Datos del usuario transferidas asociado al cliente CBIM.
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
                            <label>Teléfono</label>
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
                            this.setState({ client: { ...client, telefono: e.target.value }},
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
                    </div>


                    { error && (<Typography type="danger" style={{ color: 'red', marginTop: '10px'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }
                    <Button size="large" type="primary" onClick={ this.save } style={{marginTop: '10px'}} disabled={ loading }>
                        { loading ? (<Spin></Spin>) : 'Guardar' }
                    </Button>


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
