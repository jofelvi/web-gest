import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip} from 'antd';
import {InputsContainer} from "../../../../lib/styled";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import { UpOutlined, DownOutlined, ExclamationCircleOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import _ from 'underscore';
import { get, keys } from 'lodash';
import { loadProducts, loadBrands, loadSubBrands } from '../../../../modules/commercialDeals/actions';
import {createPlan, createPlanSetLoading} from '../../../../modules/planes-compra/actions';
import * as moment from "moment";
import { Spin, Typography, Space } from 'antd';
import ExtendedDualListBox from "./ExtendedDualListBox";
import DiscriminatorListBox from "./DiscriminatorListBox";
import PlanesCompraCreated from "./PlanesCompraCreated";
import View from "../../../Forms/crear_pedido/view";
import OrderFilterEntity from "../../../OrderListScreen/components/OrderFilterEntity";
import {InputBox} from "../../../OrderListScreen/styled";
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

const dualListIcons = {
    moveLeft: <LeftOutlined />,
    moveAllLeft: <DoubleLeftOutlined />,
    moveRight: <RightOutlined />,
    moveAllRight: <DoubleRightOutlined />,
    moveDown: <DownOutlined />,
    moveUp: <UpOutlined />,
}
const options = [
    { value: 'one', label: 'Option One', idgrupo: 1 },
    { value: 'two', label: 'Option Two', idgrupo: 2 },
];
class PlanesCompraForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            entidad_helper: '',
            error: props.error,
            plan: {
                descripcion: '',
                nombre: '',
                fechainicio: '',
                fechafin: '',
                margen: '',
                ind_surtido: true,
                ind_renovar: false,
                ind_seleccion_conjunta: true,
                ind_regularizar: false,
                idestado: 2,
                submarcas: [],
                clientes: [
                    { idcliente: '' }
                ],
                escalados: [
                    { udsminimas: 1, descuento: '', udsmaximas: '', txtdescuento: null }
                ],
            },
            validationErrors: {
            },
            rawFields: {
                fechainicio: null,
                fechafin: null,
                entity: '',
            },
            seleccion_individual_filtro_categoria: '',
            seleccion_individual_filtro_marca: '',
            seleccion_individual_filtro_submarca: '',
            seleccion_individual_valores: [],
            seleccion_individual_opciones: options,
            seleccion_submarcas_preset: '',
            seleccion_submarcas_valores: [],
        }
        this.onChangeProductsList = this.onChangeProductsList.bind(this)
        this.onChangeProductsList = this.onChangeProductsList.bind(this)
        this.setPresetProductos = this.setPresetProductos.bind(this)
        this.setPresetProductosSubmarca = this.setPresetProductosSubmarca.bind(this)
        this.filterSeleccionIndividual = this.filterSeleccionIndividual.bind(this)
        this.setPresetProductosCategoria = this.setPresetProductosCategoria.bind(this)
        this.setPresetProductosSubmarca = this.setPresetProductosSubmarca.bind(this)
        this.save = this.save.bind(this)
        this.validate = this.validate.bind(this)
        this.clearError = this.clearError.bind(this)
        this.hasError = this.hasError.bind(this)
    }

    componentWillMount() {
        const { loadProducts, loadBrands, loadSubBrands } = this.props;
        loadProducts();
        loadBrands();
        loadSubBrands();
    }

    save() {
        const { createPlan, createPlanSetLoading } = this.props;
        const { plan } = this.state;
        this.validate( plan, () => {
            createPlanSetLoading( { loading: true } )
            createPlan( { plan } )
        }, () => {
            document.querySelector('.ant-layout-content').scrollTo(0, 0)
        })
    }

    validate( plan, successCallback, errorCallback ) {
        const validations = [
            { field: 'clientes[0].idcliente', validator: ( value ) => ( value != '' ), message: 'No se puede dejar en blanco' },
            { field: 'nombre', validator: ( value ) => ( value != '' ), message: 'No se puede dejar en blanco' },
            { field: 'fechainicio', validator: ( value ) => ( moment( value ) > moment() ), message: 'No puede ser una fecha pasada.' },
            { field: 'fechafin', validator: ( value, record ) => ( moment( value ) > moment( record.fechainicio ) ), message: 'Debe ser posterior a la fecha de inicio.' },
            { field: 'escalados[0].udsmaximas', validator: ( value ) => ( parseInt ( value ) > 0 ), message: 'Debe ser mayor que 0.' },
            { field: 'escalados[0].descuento', validator: ( value ) => ( parseFloat( value ) > 0 &&  parseFloat( value ) < 100 ), message: 'Debe ser un porcentaje.' },
            { field: 'margen', validator: ( value ) => ( parseFloat( value ) > 0 &&  parseFloat( value ) < 100 ), message: 'Debe ser un porcentaje.' },
            { field: 'submarcas', validator: ( value ) => ( value.length > 0 ), message: 'Debe seleccionar por lo menos una submarca.' },
        ];

        const validationErrors = [];

        for ( let i in validations ) {
            const validation = validations[i]
            const value = get( plan, validation.field, '')
            if ( ! validation.validator( value, plan ) ) {
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


    setPresetProductos( preset ) {

    }
    setPresetProductosCategoria ( categoria ) {
        this.setState({ seleccion_individual_filtro_categoria: categoria } );

    }
    setPresetProductosMarca ( marca ) {
        this.setState({ seleccion_individual_filtro_marca: marca } );

    }
    setPresetProductosSubmarca ( marca ) {
        this.setState({ seleccion_individual_filtro_submarca: marca } );
    }

    filterSeleccionIndividual( item ) {
        const filtro_categoria =  this.state.seleccion_individual_filtro_categoria
        const filtro_marca = this.state.seleccion_individual_filtro_marca
        const filtro_submarca =  this.state.seleccion_individual_filtro_submarca

        return ( filtro_categoria == '' || parseInt( item.idgrupo ) == parseInt( filtro_categoria ) )
            && ( filtro_marca == '' || parseInt( item.idmarca ) == parseInt( filtro_marca ) )
            && ( filtro_submarca == '' || parseInt( item.idsubmarca ) == parseInt( filtro_submarca ) );
    }

    setPresetSubmarcas( preset ) {

    }

    onChangeProductsList = (selectedProducts) => {
        this.setState({ selectedProducts });
    };

    render() {
        const { products, brands, subBrands, loading } = this.props;
        const { plan, validationErrors, error } = this.state;
        const { rawFields } = this.state;
        const createdPlan = this.props.plan

        if ( createdPlan != null) {
            return (<PlanesCompraCreated plan={ createdPlan } />);
        }

    {  }
        return (
            <React.Fragment>
                { error && ( <Typography type="danger" style={{ color: 'red'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }
                <h3 style={{margin: '20px 0 10px 0'}}>
                    Datos generales
                </h3>
                <div className="table-filters-indas" style={{padding:'20px'}}>

                    <Row style={{width: '100%', marginBottom: 0}}>
                        <Col span={18} style={{padding: '0px'}}>
                            <span>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                            <div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
                            <OrderFilterEntity
                                style={inputStyle }
                                value={ rawFields.entidad }
                                column={ "idcliente" }
                                onChange={ (entity) => {
                                    this.setState({ rawFields: { ...rawFields, entidad: entity} })
                                } }
                                onChangeClient={ (client) => { this.setState({ plan: { ...plan, clientes: [{ idcliente: client }] }})} }
                            />
                            </div>
                        </Col>

                        <Col span={6} style={{padding: '0px'}}>
                            <span>Código Cliente</span>
                            <InputBox
                                placeholder="Código Cliente"
                                value={ plan.clientes[0].idcliente }
                                onChange={ (e) => {
                                    this.setState(
                                        { rawFields: {...rawFields, entidad: ''}, plan: { ...plan, clientes: [ { idcliente: e.target.value }] }},
                                        () => {
                                            this.clearError( 'clientes[0].idcliente' )
                                        }
                                    )

                                } }
                                style={ this.hasError( 'clientes[0].idcliente' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'clientes[0].idcliente' ) }
                        </Col>
                    </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={6} >
                                <label>Nombre del plan</label>
                                <Input
                                    style={inputStyle}
                                    value={ plan.nombre }
                                    onChange={ (e) => {
                                        this.setState({ plan: { ...plan, nombre: e.target.value }},
                                            () => {
                                                this.clearError( 'nombre' )
                                            }
                                        )

                                    } }
                                    style={ this.hasError( 'nombre' ) ? inputErrorStyle : inputStyle}
                                />
                                { this.getError( 'nombre' ) }
                            </Col>
                            <Col span={18}>
                                <label>Descripción del plan</label>
                                <Input
                                    style={inputStyle}
                                    value={ plan.descripcion }
                                    onChange={ (e) => { this.setState({ plan: { ...plan, descripcion: e.target.value }})} }
                                />
                            </Col>
                        </Row>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Col span={8} >
                            <label>Fecha de inicio</label>
                            <DatePicker
                                value={ rawFields.fechainicio }
                                onChange={( date, dateString ) => {
                                    this.setState({ rawFields: {...rawFields, fechainicio: date }, plan: { ...plan, fechainicio: date.format( 'YYYY-MM-DD' ) } },
                                        () => {
                                            this.clearError( 'fechainicio' )
                                        }
                                    )
                                } }
                                format={ dateFormat }
                                placeholder={'Seleccionar fecha'}
                                style={ this.hasError( 'fechainicio' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'fechainicio', true ) }
                        </Col>
                        <Col span={8}>
                            <label>Fecha de fin</label>
                            <DatePicker
                                format={ dateFormat }
                                value={ rawFields.fechafin }
                                onChange={( date, dateString ) => {
                                    this.setState( { rawFields: {...rawFields, fechafin: date }, plan: { ...plan, fechafin: date.format( 'YYYY-MM-DD' ) } },
                                        () => {
                                            this.clearError( 'fechafin' )
                                        }
                                    )
                                } }
                                placeholder={'Seleccionar fecha'}
                                style={ this.hasError( 'fechafin' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'fechafin', true ) }
                        </Col>

                    </Row>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Col span={6} >
                            <label>Estado</label>

                            <Select
                                onChange={(value) => { this.setState( { plan: { ...plan, idestado: value } })} }
                                value={plan.idestado}
                                style={inputStyle}
                            >
                                <Option value={2}  style={{ color: '#CCC' }}>Borrador</Option>
                                <Option value={1}>Activo</Option>
                                <Option value={0}>Inactivo</Option>
                            </Select>
                        </Col>
                        <Col span={8}  >
                            <Switch
                                checkedChildren="Si" unCheckedChildren="No"
                                value={ plan.ind_renovar }
                                onChange={ ( value) => { this.setState( { plan: { ...plan, ind_renovar: value } } ) } }
                            />
                            <label style={{display: 'inline-block', marginTop:'35px', marginLeft: '10px'}}>Renovación Automática</label>
                        </Col>
                        <Col span={8} >
                            <Switch
                                checkedChildren="Si" unCheckedChildren="No"
                                value={ plan.ind_regularizar }
                                onChange={ ( value) => { this.setState( { plan: { ...plan, ind_regularizar: value } } ) } }
                            />
                            <label style={{display: 'inline-block', marginTop:'35px', marginLeft: '10px'}}>Forzar Regularización</label>
                        </Col>
                    </Row>
                </div>

                <h3 style={{margin: '20px 0 10px 0'}}>
                    Lineas de descuento
                </h3>
                <div className="table-filters-indas" style={{padding:'20px', backgroundColor: '#EAEAEA;'}}>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Col span={6}>
                            <label>Unidades comprometidas</label>
                            <Input
                                value={ plan.escalados[0].udsmaximas }
                                onChange={ ( e ) => {
                                    this.setState( { plan: { ...plan, escalados: [{...plan.escalados[0], udsmaximas: e.target.value }] } },
                                        () => {
                                            this.clearError( 'escalados[0].udsmaximas' )
                                        }
                                    )
                                } }
                                style={ this.hasError( 'escalados[0].udsmaximas' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'escalados[0].udsmaximas' ) }
                        </Col>
                        <Col span={6}>
                            <label>Descuento</label>
                            <Input
                                value={ plan.escalados[0].descuento }
                                onChange={ ( e ) => {
                                    this.setState( { plan: { ...plan, escalados: [{...plan.escalados[0], descuento: e.target.value } ] } },
                                        () => {
                                            this.clearError( 'escalados[0].descuento' )
                                        }
                                    )
                                } }
                                suffix={"%"}
                                style={ this.hasError( 'escalados[0].descuento' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'escalados[0].descuento', true ) }
                        </Col>
                        <Col span={6}>
                            <label>Margen</label>
                            <Input
                                value={ plan.margen }
                                suffix={"%"}
                                onChange={ ( e ) => {
                                    this.setState( { plan: { ...plan,  margen: e.target.value } },
                                        () => {
                                            this.clearError( 'margen' )
                                        }
                                    )
                                } }
                                style={ this.hasError( 'margen' ) ? inputErrorStyle : inputStyle}
                            />
                            { this.getError( 'margen', true ) }
                        </Col>
                    </Row>
                </div>

                <h3 style={{margin: '20px 0 10px 0'}}>
                    Asociación de productos
                </h3>
                <div className="table-filters-indas" style={{padding:'20px', backgroundColor: '#EAEAEA;'}}>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Tabs
                            defaultActiveKey={ plan.ind_seleccion_conjunta ? "1" : "2" }
                            onChange={(value) => this.setState( { plan:{ ...plan, ind_seleccion_conjunta: value=="1" } } ) }
                        >
                            <TabPane tab="Selección por submarca" key="1">
                                <div style={{ top: '-80px', position: 'relative'}}>
                                    { this.getError( 'submarcas' ) }
                                </div>
                                { false && (
                                <Row style={{width: '100%', marginBottom: 0, paddingBottom: 10}}>
                                    <Col span={12}>
                                        <Select
                                            onChange={ this.setPresetSubmarcas }
                                            style={{width:'200px'}}
                                            value={ this.state.seleccion_submarcas_preset }
                                        >
                                            <Option value=""  style={{ color: '#CCC' }}>- Personalizado -</Option>
                                            <Option value="activo">Preset 1</Option>
                                            <Option value="inactivo">Preset 2</Option>
                                        </Select>
                                        <Button disabled={this.state.seleccion_submarcas_valores.length==0}>
                                            Guardar Selección
                                        </Button>
                                    </Col>
                                </Row>
                                )}

                                { products && subBrands && (
                                    <DiscriminatorListBox
                                        options={
                                            _.sortBy( products, (product) => (product.nombre) ).map( ( product) => ({
                                                label: product.nombre,
                                                value: product.idproducto,
                                                discriminator: parseInt(product.idsubmarca)
                                            } ) )
                                        }
                                        discriminator_options={
                                            _.sortBy( subBrands, (subBrand) => (subBrand.nombre) ).map( ( subBrand ) => ({
                                                label: subBrand.nombre,
                                                value: parseInt( subBrand.idsubmarca ),
                                            }))
                                        }
                                        onChange={ ( values ) => {
                                            const mappedValues = values.map( ( value ) => ({ idsubmarca: value }) )
                                            this.setState({plan: {...plan, submarcas: mappedValues } } ,
                                                () => {
                                                    this.clearError( 'submarcas' )
                                                }
                                            )
                                        } }
                                    />
                                )}

                            </TabPane>
                            {/* <TabPane tab="Selección Individual" key="2">
                                <Row style={{width: '100%', marginBottom: 0, paddingBottom: 10}}>
                                    <Col span={8} >
                                        <Select
                                            onChange={ this.setPresetProductosCategoria }
                                            style={{width:'200px'}}
                                            value={ this.state.seleccion_individual_filtro_categoria }
                                        >
                                            <Option value=""  style={{ color: '#CCC' }}>- Categoría -</Option>
                                            <Option value="1">Categoria 1</Option>
                                            <Option value="2">Categoria 2</Option>
                                        </Select>
                                    </Col>
                                    <Col span={8} style={{textAlign: 'center '}}>
                                        <Select
                                            onChange={ this.setPresetProductosMarca }
                                            style={{width:'200px'}}
                                            value={ this.state.seleccion_individual_filtro_marca }
                                        >
                                            <Option value=""  style={{ color: '#CCC' }}>- Marca -</Option>
                                            <Option value="cat1">Categoria 1</Option>
                                            <Option value="cat2">Categoria 2</Option>
                                        </Select>
                                    </Col>
                                    <Col span={8} style={{textAlign: 'right '}}>
                                        <Select
                                            onChange={ this.setPresetProductosSubmarca }
                                            style={{width:'200px'}}
                                            value={ this.state.seleccion_individual_filtro_submarca }
                                        >
                                            <Option value=""  style={{ color: '#CCC' }}>- Submarca -</Option>
                                            <Option value="cat1">Categoria 1</Option>
                                            <Option value="one">Categoria 2</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <ExtendedDualListBox
                                    icons={dualListIcons}
                                    options={this.state.seleccion_individual_opciones}
                                    filter={ this.filterSeleccionIndividual }
                                    selected={this.state.seleccion_productos_valores}
                                    onChange={
                                        ( seleccion_productos_valores ) => {
                                            this.setState({ seleccion_productos_valores });
                                        }
                                    }
                                />
                            </TabPane> */}
                        </Tabs>
                    </Row>
                </div>

                { error && (<Typography type="danger" style={{ color: 'red', marginTop: '10px'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }
                <Button size="large" type="primary" onClick={ this.save } style={{marginTop: '10px'}} disabled={ loading }>
                    { loading ? (<Spin></Spin>) : 'Crear' }
                </Button>


            </React.Fragment>
        );
    };

}
PlanesCompraForm.propTypes = {
};

export default  connect(
    state => ({
        plan: state.planesCompra.plan,
        loading: state.planesCompra.createLoading,
        error: state.planesCompra.createError,
        products: state.commercialDeals.products,
        brands: state.commercialDeals.brands,
        subBrands: state.commercialDeals.subBrands,
    }),
    { loadProducts, loadSubBrands, loadBrands, createPlan, createPlanSetLoading }
)( PlanesCompraForm );
