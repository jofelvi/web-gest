import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import {InputsContainer} from "../../../../lib/styled";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import { UpOutlined, DownOutlined, ExclamationCircleOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import _ from 'underscore';
import { get, keys } from 'lodash';
import { loadFamilies, loadBrands, loadSubBrands, loadProducts  } from '../../../../modules/commercialDeals/actions';
import {createPlan, createPlanSetLoading, fetchSubmarcaCollections, createSubmarcaCollection, createSubmarcaCollectionSetLoading } from '../../../../modules/planes-compra/actions';
import * as moment from "moment";
import { Spin, Typography, Space } from 'antd';
import ExtendedDualListBox from "./ExtendedDualListBox";
import DualListFilter from "./DualListFilter";
import DiscriminatorListBox from "./DiscriminatorListBox";
import PlanesCompraSaved from "./PlanesCompraSaved";
import View from "../../../Forms/crear_pedido/view";
import OrderFilterEntity from "../../../OrderListScreen/components/OrderFilterEntity";
import {InputBox} from "../../../OrderListScreen/styled";
//import locale from 'antd/es/date-picker/locale/es_ES';
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";
import Utils from '../../../../lib/utils';

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

const dualListIcons = {
    moveLeft: <LeftOutlined />,
    moveAllLeft: <DoubleLeftOutlined />,
    moveRight: <RightOutlined />,
    moveAllRight: <DoubleRightOutlined />,
    moveDown: <DownOutlined />,
    moveUp: <UpOutlined />,
}
const defaultPlan = {
    descripcion: '',
    nombre: '',
    fechainicio: '',
    fechafin: '',
    margen: '',
    ind_surtido: true,
    ind_renovar: false,
    ind_seleccion_conjunta: true,
    ind_regularizar: false,
    idestado: "2",
    submarcas: [],
    productos: [],
    clientes: [
        { idcliente: '' }
    ],
    escalados: [
        { udsminimas: 1, descuento: '', udsmaximas: '', txtdescuento: null }
    ],
};

class PlanesCompraForm extends React.Component {
    constructor(props) {
        super(props)

        const plan = props.editPlan ? props.editPlan : defaultPlan
        const rawFechaInicio = props.editPlan ? moment(props.editPlan.fechainicio) : null;
        const rawFechaFin = props.editPlan ? moment(props.editPlan.fechafin) : null;

        this.state = {
            entidad_helper: '',
            error: props.error,
            plan: _.clone( plan ),
            validationErrors: {},
            rawFields: {
                fechainicio: rawFechaInicio,
                fechafin: rawFechaFin,
                entity: '',
            },
            rawPlan: {
                codcli_cbim: props.editPlan ? plan.codcli_cbim : '',
            },
            seleccion_individual_filtro_categoria: '',
            seleccion_individual_filtro_marca: '',
            seleccion_individual_filtro_submarca: '',
            seleccion_individual_valores: [],
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
        this.savePreset = this.savePreset.bind(this)
    }

    componentWillMount() {
        const { loadProducts, loadBrands, loadFamilies, loadSubBrands, fetchSubmarcaCollections } = this.props;
        loadProducts();
        loadBrands();
        loadSubBrands();
        loadFamilies();
        fetchSubmarcaCollections();
    }

    save() {
        const { createPlan, createPlanSetLoading, onSave } = this.props;
        const { plan } = this.state;
        this.validate( plan, () => {
            onSave(plan)
            console.log('THISIS THE PLAN', plan)
        }, () => {
            document.querySelector('.ant-layout-content').scrollTo(0, 0)
        })
    }

    validate( plan, successCallback, errorCallback ) {
        const { editPlan } = this.props;
        const validations = [
            { field: 'clientes[0].idcliente', validator: ( value ) => ( value != '' ), message: 'No se puede dejar en blanco. Seleccione una entidad para rellenarlo.' },
            { field: 'nombre', validator: ( value ) => ( value != '' ), message: 'No se puede dejar en blanco' },
            {   field: 'fechainicio',
                validator: ( value ) => (editPlan && moment(editPlan.fechainicio).isSame(value, 'day') ? true : moment( value ).startOf('day') >= moment().startOf('day') ),
                message: 'No puede ser una fecha pasada.' },
            {   field: 'fechafin',
                validator: ( value ) => (editPlan && moment(editPlan.fechafin).isSame(value, 'day') ? true : moment( value ).startOf('day') >= moment().startOf('day') ),
                message: 'No puede ser una fecha pasada.' },
            { field: 'fechafin', validator: ( value, record ) => ( moment( value ).startOf('day') >= moment( record.fechainicio ).startOf('day') ), message: 'Debe ser posterior a la fecha de inicio.' },
            { field: 'escalados[0].udsmaximas', validator: ( value ) => ( parseInt ( value ) > 0 ), message: 'Debe ser mayor que 0.' },
            { field: 'escalados[0].descuento', validator: ( value ) => ( parseFloat( value ) > 0 &&  parseFloat( value ) < 100 ), message: 'Debe ser un porcentaje.' },
            { field: 'margen', validator: ( value ) => ( parseFloat( value ) > 0 &&  parseFloat( value ) < 100 ), message: 'Debe ser un porcentaje.' },
            { field: 'submarcas', validator: ( value, record ) => ( record.ind_seleccion_conjunta == false || value.length > 0 ), message: 'Debe seleccionar por lo menos una submarca.' },
            { field: 'productos', validator: ( value, record ) => ( record.ind_seleccion_conjunta == true || value.length > 0 ), message: 'Debe seleccionar por lo menos un producto.' },
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

    savePreset( name, options, callback ) {
        const { createSubmarcaCollectionSetLoading, createSubmarcaCollection } = this.props;
        createSubmarcaCollection( { collection: { nombre: name, submarcas: options },  callback })
    }

    setPresetProductos( preset ) {

    }
    setPresetProductosCategoria ( categoria ) {
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
        const { editPlan, products, brands, error, subBrands, loading, loadingSubmarcaCollectionList, submarcaCollections, submarcaCollection, fetchSubmarcaCollections, families } = this.props;
        const { plan, validationErrors, rawFields, rawPlan } = this.state;
        const createdPlan = this.props.plan
        const isCopy = this.props.isCopy ? this.props.isCopy : false;
        const isEdit = !! editPlan && ! isCopy;
        const isEditAndExpired = isEdit && plan.estado2 == "Expirado";

        if ( createdPlan != null) {
            return (<PlanesCompraSaved message={this.props.savedMessage} plan={ createdPlan } isEdit={ isEdit } />);
        }

        return (
            <ConfigProvider locale={ locale }>
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
                                disabled={ isEdit }
                                column={ "object" }
                                onChange={ (entity) => {
                                    this.setState({ rawFields: { ...rawFields, entidad: entity} })
                                } }
                                onChangeClient={ (client) => { this.setState({ rawPlan: { ...rawPlan, codcli_cbim: client.codcli_cbim}, plan: { ...plan, clientes: [{ idcliente: client.idcliente }] }})} }
                            />
                            </div>
                        </Col>

                        <Col span={6} style={{padding: '0px'}}>
                            <span>Código Cliente</span>
                            <InputBox
                                placeholder="Código Cliente"
                                value={ rawPlan.codcli_cbim }
                                disabled
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
                                    disabled={isEditAndExpired}
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
                                locale={ locale }
                                disabled={ isEdit }
                                onChange={( date, dateString ) => {
                                    const formatDate = date ? date.format('YYYY-MM-DD') : '';
                                    this.setState({ rawFields: {...rawFields, fechainicio: date }, plan: { ...plan, fechainicio: formatDate } },
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
                                disabled={isEditAndExpired}
                                onChange={( date, dateString ) => {
                                    const formatDate = date ? date.format('YYYY-MM-DD') : '';
                                    this.setState( { rawFields: {...rawFields, fechafin: date }, plan: { ...plan, fechafin: formatDate } },
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
                                disabled={isEditAndExpired}
                            >
                                <Option value={"2"}  style={{ color: '#CCC' }}>Borrador</Option>
                                <Option value={"1"}>Activo</Option>
                                <Option value={"0"}>Inactivo</Option>
                            </Select>
                        </Col>
                        <Col span={8}  >
                            <Switch
                                checkedChildren="Si" unCheckedChildren="No"
                                value={ plan.ind_renovar }
                                disabled={isEditAndExpired}
                                onChange={ ( value) => { this.setState( { plan: { ...plan, ind_renovar: value } } ) } }
                            />
                            <label style={{display: 'inline-block', marginTop:'35px', marginLeft: '10px'}}>Renovación Automática</label>
                        </Col>
                        <Col span={8} >
                            <Switch
                                checkedChildren="Si" unCheckedChildren="No"
                                value={ plan.ind_regularizar }
                                disabled={isEditAndExpired}
                                onChange={ ( value) => { this.setState( { plan: { ...plan, ind_regularizar: value } } ) } }
                            />
                            <label style={{display: 'inline-block', marginTop:'35px', marginLeft: '10px'}}>Forzar Regularización</label>
                        </Col>
                    </Row>
                </div>

                <h3 style={{margin: '20px 0 10px 0'}}>
                    Lineas de descuento
                </h3>
                <div className="table-filters-indas" style={{padding:'20px' }}>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Col span={6}>
                            <label>Unidades comprometidas</label>
                            <Input
                                disabled={isEditAndExpired}
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
                                disabled={isEditAndExpired}
                                value={ Utils.renderFloat( plan.escalados[0].descuento ) }
                                onChange={ ( e ) => {
                                    const value = Utils.parseFloat( e.target.value );
                                    this.setState( { plan: { ...plan, escalados: [{...plan.escalados[0], descuento: value } ] } },
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
                                disabled={isEditAndExpired}
                                value={ Utils.renderFloat( plan.margen ) }
                                suffix={"%"}
                                onChange={ ( e ) => {
                                    const value = Utils.parseFloat( e.target.value );
                                    this.setState( { plan: { ...plan,  margen: value } },
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
                <div className="table-filters-indas" style={{padding:'20px' }}>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Tabs
                            defaultActiveKey={ plan.ind_seleccion_conjunta ? "1" : "2" }
                            onChange={(value) => this.setState( { plan:{ ...plan, ind_seleccion_conjunta: value=="1" } } ) }
                        >
                            <TabPane tab="Selección por submarca" key="1">
                                <div style={{ top: '-80px', position: 'relative'}}>
                                    { this.getError( 'submarcas' ) }
                                </div>

                                { products && subBrands && (
                                    <DiscriminatorListBox
                                        disabled={isEditAndExpired}
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
                                        value={ this.state.plan.submarcas.map( (submarca) => submarca.idsubmarca ) }
                                        onChange={ ( values ) => {
                                            const mappedValues = values.map( ( value ) => ({ idsubmarca: value }) )
                                            this.setState({ plan: {...plan, submarcas: mappedValues } } ,
                                                () => {
                                                    this.clearError( 'submarcas' )
                                                }
                                            )
                                        } }
                                        preset={{
                                            values: this.state.plan.submarcas.map( (submarca) => submarca.idsubmarca ),
                                            options: submarcaCollections.map( (submarcaCollection) => ({ label: submarcaCollection.nombre, value: submarcaCollection.nombre, options: submarcaCollection.submarcas })),
                                            loading: loadingSubmarcaCollectionList,
                                            savePreset: this.savePreset,
                                            reload: fetchSubmarcaCollections
                                        }}
                                    />
                                )}

                            </TabPane>
                            <TabPane tab="Selección Individual" key="2">
                                <div style={{ top: '-80px', position: 'relative'}}>
                                    { this.getError( 'productos' ) }
                                </div>

                                <Row style={{ marginBottom: '10px'}}>
                                    <Col span={8}>
                                        <DualListFilter
                                            disabled={isEditAndExpired}
                                            options={ families.map( (family) => {
                                                return {
                                                    label: family.nombre,
                                                    value: family.idfamilia
                                                }
                                            }) }
                                            value={ this.state.seleccion_individual_filtro_categoria }
                                            onChange={( seleccion_individual_filtro_categoria ) => {
                                                this.setState({ seleccion_individual_filtro_categoria })
                                            } }
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <DualListFilter
                                            options={ brands.map( ( brand ) => {
                                                return {
                                                    label: brand.nombre,
                                                    value: brand.idmarca
                                                }
                                            }) }
                                            value={ this.state.seleccion_individual_filtro_marca }
                                            onChange={( seleccion_individual_filtro_marca ) => {
                                                this.setState({ seleccion_individual_filtro_marca })
                                            } }
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <DualListFilter
                                            options={ subBrands.map( (subBrand) => {
                                                return {
                                                    label: subBrand.nombre,
                                                    value: subBrand.idsubmarca
                                                }
                                            }) }
                                            value={ this.state.seleccion_individual_filtro_submarca }
                                            onChange={( seleccion_individual_filtro_submarca ) => {
                                                this.setState({ seleccion_individual_filtro_submarca })
                                            } }
                                        />
                                    </Col>
                                </Row>



                                <ExtendedDualListBox
                                    icons={ dualListIcons }
                                    options={ products.map( (product) => ({ ...product, value: product.idproducto, label: product.nombre } )) }
                                    filter={ this.filterSeleccionIndividual }
                                    selectedKeys={this.state.plan.productos.map( (producto) => producto.idproducto ) }
                                    onChange={
                                        ( productos ) => {
                                            this.setState({ plan: { ...plan, productos: productos.map((idproducto) => ({ idproducto }) ) } });
                                        }
                                    }
                                />
                            </TabPane>
                        </Tabs>
                    </Row>
                </div>

                { error && (<Typography type="danger" style={{ color: 'red', marginTop: '10px'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }
                { isEditAndExpired && (<Typography type="danger" style={{ marginTop: '10px'}}> El plan no se puede modificar porque ha expirado.</Typography>) }
                <Button size="large" type="primary" onClick={ this.save } style={{marginTop: '10px'}} disabled={ loading || isEditAndExpired }>
                    { loading ? (<Spin></Spin>) : (isEdit ? 'Guardar' : 'Crear') }
                </Button>


            </React.Fragment>
            </ConfigProvider>
        );
    };

}
PlanesCompraForm.propTypes = {
};

export default  connect(
    state => ({
        products: state.commercialDeals.products,
        brands: state.commercialDeals.brands,
        subBrands: state.commercialDeals.subBrands,
        families: state.commercialDeals.families,
        submarcaCollections: state.planesCompra.submarcaCollections,
        loadingSubmarcaCollectionList: state.planesCompra.loadingSubmarcaCollectionList,
        submarcaCollection: state.planesCompra.submarcaCollection,
    }),
    { createPlan, createPlanSetLoading, fetchSubmarcaCollections, createSubmarcaCollection,
        loadFamilies, loadBrands, loadSubBrands, loadProducts }
)( PlanesCompraForm );
