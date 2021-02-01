import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select} from 'antd';
import {InputsContainer} from "../../../../lib/styled";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import _ from 'underscore';
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

const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const inputStyle = {
    width: 'calc(100% - 40px)',
    margin: '10px'
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
    }

    componentWillMount() {
        const { loadProducts, loadBrands, loadSubBrands } = this.props;
        loadProducts();
        loadBrands();
        loadSubBrands();
    }

    save() {
        const { createPlan } = this.props;
        const { plan } = this.state;
        createPlan( { plan } )
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
        const { products, brands, subBrands, loading, error } = this.props;
        const { plan } = this.state;
        const { rawFields } = this.state;
        const createdPlan = this.props.plan

        console.log(' ___PLAN ', plan)

        if ( createdPlan != null) {
            return (<PlanesCompraCreated plan={ createdPlan } />);
        }

        return (
            <React.Fragment>
                { error && ( <Typography type="danger" style={{ color: 'red'}}> Se ha producido un error al guardar el plan, por favor, revisa los datos.</Typography>) }
                <h3 style={{margin: '20px 0 10px 0'}}>
                    Datos generales
                </h3>
                <div className="table-filters-indas" style={{padding:'20px', backgroundColor: '#EAEAEA;'}}>

                    <Row style={{width: '100%', marginBottom: 0}}>
                        <Col span={18} style={{padding: '0px'}}>
                            <span>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                            <div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
                            <OrderFilterEntity
                                style={inputStyle }
                                value={ rawFields.entidad }
                                column={ "idcliente" }
                                onChange={ (entity) => { this.setState({ rawFields: { ...rawFields, entidad: entity} })} }
                                onChangeClient={ (client) => { this.setState({ plan: { ...plan, clientes: [{ idcliente: client }] }})} }
                            />
                            </div>
                        </Col>

                        <Col span={6} style={{padding: '0px'}}>
                            <span>Código Cliente</span>
                            <InputBox
                                placeholder="Código Cliente"
                                value={ plan.clientes[0].idcliente }
                                onChange={ (e) => { this.setState({ rawFields: {...rawFields, entidad: ''}, plan: { ...plan, clientes: [ { idcliente: e.target.value }] }})} }
                                style={inputStyle}
                            />
                        </Col>
                    </Row>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                            <Col span={6} >
                                <label>Nombre del plan</label>
                                <Input
                                    style={inputStyle}
                                    value={ plan.nombre }
                                    onChange={ (e) => { this.setState({ plan: { ...plan, nombre: e.target.value }})} }
                                />
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
                                onChange={( date, dateString ) => { this.setState({ rawFields: {...rawFields, fechainicio: date }, plan: { ...plan, fechainicio: date.toISOString() } }) } }
                                style={inputStyle}
                                placeholder={'Seleccionar fecha'}
                            />
                        </Col>
                        <Col span={8}>
                            <label>Fecha de fin</label>
                            <DatePicker
                                value={ rawFields.fechafin }
                                onChange={( date, dateString ) => { this.setState( { rawFields: {...rawFields, fechafin: date }, plan: { ...plan, fechafin: date.toISOString() } }) } }
                                style={inputStyle}
                                placeholder={'Seleccionar fecha'}
                            />
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
                                onChange={ ( e ) => { this.setState( { plan: { ...plan, escalados: [{...plan.escalados[0], udsmaximas: e.target.value }] } })} }
                                style={inputStyle} />
                        </Col>
                        <Col span={6}>
                            <label>Descuento</label>
                            <Input
                                value={ plan.escalados[0].descuento }
                                onChange={ ( e ) => { this.setState( { plan: { ...plan, escalados: [{...plan.escalados[0], descuento: e.target.value } ] } })} }
                                suffix={"%"}
                                style={inputStyle}
                            />
                        </Col>
                        <Col span={6}>
                            <label>Margen</label>
                            <Input
                                value={ plan.margen }
                                suffix={"%"}
                                onChange={ ( e ) => { this.setState( { plan: { ...plan,  margen: e.target.value } })} }
                                style={inputStyle} />
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
                                            products.map( ( product) => ({
                                                label: product.nombre,
                                                value: product.idproducto,
                                                discriminator: parseInt(product.idsubmarca)
                                            } ) )
                                        }
                                        discriminator_options={
                                            subBrands.map( ( subBrand ) => ({
                                                label: subBrand.nombre,
                                                value: parseInt( subBrand.idsubmarca ),
                                            }))
                                        }
                                        onChange={ ( values ) => {
                                            const mappedValues = values.map( ( value ) => ({ idsubmarca: value }) )
                                            this.setState({plan: {...plan, submarcas: mappedValues } } )
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
    { loadProducts, loadSubBrands, loadBrands, createPlan }
)( PlanesCompraForm );
