import React, { useEffect, useState } from 'react'
import * as axios from "../lib/restClient"
import utils from "../lib/utils"
import OrderFilterEntity from "../screens/OrderListScreen/components/OrderFilterEntity"
import { InputBox } from "../screens/OrderListScreen/styled"
import { Checkbox, Col, DatePicker, Input, List, Row, Select, Switch, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import locale from "antd/es/locale/es_ES"
import "moment/locale/es"
import {
	createAcuerdosComerciales, editAcuerdosComerciales,
	eliminarDuplicados, eliminarItemsMarcados,
	getCatalogoProductos,
	getSubmarcas,
	listItemMarcados,
	productosFiltrados
} from "../modules/acuerdosComer/actions"
import { get, set } from 'lodash'
import * as moment from "moment"
import {BoldOutlined, FolderAddOutlined, LeftOutlined} from '@ant-design/icons'
import {useHistory, useLocation, useParams} from "react-router-dom";
import PlanesCompraSaved from "../screens/CommercialDealsScreen/PlanesCompra/components/PlanesCompraSaved";
import SearchInputEntidad from "./SearchInputEntidad";

const { Option } = Select
const dateFormat = 'DD/MM/YYYY'


const BrandsSubList = (props) => {

	const { acuerdoComercial } = props
	let { id } = useParams();

	const dispatch = useDispatch()
	const idsBuscador = useSelector((state) => state.acuerdosComer.cod_Cliente)
	const productosArrayRedux = useSelector((state) => state.acuerdosComer.productoArray)
	const marcadosRedux = useSelector((state) => state.acuerdosComer.marcadosArray)
	const productsfilted = useSelector((state) => state.acuerdosComer.productsfilted)
	const [state, setState] = useState({
		idcliente: '',
		codcli_cbim: '',
		fechasValue: [],
		searchByEntity: get(props, 'filters.searchByEntity', ''),
		page: 0,
		coddelegado: '',
		idestado: '',
		fechas: [],
		//expandedKeys: [],
		isFilterChanged: false,
		contareaspendientes: false
	})

	const [body, setBody] = useState(acuerdoComercial ? acuerdoComercial :
		{
			productos: [],
			clientes: [

			],
			escalados: [],
			"margen": 1.0,
			"idtipo": 1,
			'ind_renovar': false,
			"ind_seleccion_conjunta": false,
			"ind_surtido": false,
		})
	const subMarcasArrayRedux = useSelector((state) => state.acuerdosComer.subMarcaArray)
	const [initialDate, setInitialDate] = useState(typeof body === 'undefined' ? '' : body.fechainicio)
	const [finalDate, setFinalDate] = useState(typeof body === 'undefined' ? '' : body.fechafin)
	const [txtdescuentoState, setTxtdescuento] = useState("")
	const [udsmaximasState, setUdsmaximas] = useState()
	const [descuentoState, setDescuento] = useState()
	const [udsminimasState, setUdsminimas] = useState()
	const [codcli_cbim, setCodcli_cbim] = useState()
	const [lineaDescuento, setLineaDescuento] = useState(["row"])
	const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces)
	const location = useLocation();



	const changeBody = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {

		dispatch(getCatalogoProductos())
		dispatch(getSubmarcas())
		catalogoProducts()
		console.log("current route ", location)
		console.log("current route ", location.search === "?editar")

	}, [marcadosRedux])

	useEffect(() => {
		handleSeletClient(idsBuscador)
		console.log("idsBuscador ", idsBuscador)

	}, [idsBuscador])

	const handleValues = async (e, item) => {

		let objArra =  {
			'id': e.target.value,
			'active': e.target.checked
		}

		if (e.target.checked) {
			console.log("entro if", e.target.value)

			if (!marcadosRedux.indexOf(e.target.value) >= 0) {
				await dispatch(listItemMarcados(objArra))
			}
		} else {
			let elementosFilted = marcadosRedux.filter(function (item) {
				return item.id !== e.target.value
			})
			await dispatch(eliminarItemsMarcados(elementosFilted))
		}
	}


	const onSelectChange = async (e, item) => {
		await handleValues(e, item)
	}

	const catalogoProducts = async () => {

		const res = await productosArrayRedux.filter(f => marcadosRedux.find(item => item.id === f.idsubmarca))
		let productosBody = []
		await productosArrayRedux.filter(f => marcadosRedux.find(item =>
			item.id === f.idsubmarca && productosBody.push({ "idproducto": f.idproducto })
		))

		console.log("filtrado nuevo formato", productosBody)
		dispatch(productosFiltrados(res))

		setBody({
			...body,
			productos: productosBody,
		})
	}


	const handleSeletClient =(idsBuscadorObj)=>{
		console.log("onblur select")
		setBody({ ...body, clientes: [{ "idcliente": parseInt(idsBuscadorObj[0].idcliente) }] })
	}

	const handleEscaladosBody = () => {

		let escaladoB = [
			{
				"descuento": parseFloat(descuentoState),
				"txtdescuento": txtdescuentoState,
				"udsmaximas": parseInt(udsmaximasState),
				"udsminimas": parseInt(udsminimasState)
			}
		]
		setBody({ ...body, escalados: escaladoB })
	}

	const onSubmit = async () => {

		if(location.search === "?editar") {
			await dispatch(editAcuerdosComerciales(body, id))
			return true
		}

		dispatch(createAcuerdosComerciales(body))
	}

	if(successCreate) {
		return <PlanesCompraSaved mensaje={"Su Acuerdo Comercial Fue creado Exitosamente"} ac={true}/>
	}

	return (
		<>

			<h3 style={{ margin: '20px 0 10px 0' }}>
				Datos generales
			</h3>

			<div className="table-filters-indas" style={{ padding: 20 }}>

				<Row style={{ width: '100%'}}>
					<Col span={17} style={{ padding: '0px' }}>
						<span>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
						<div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
							<SearchInputEntidad

							/>
						</div>
					</Col>

					<Col span={6} >
						<span>Código Cliente</span>
						<InputBox
							placeholder="Código Cliente"
							value={codcli_cbim || idsBuscador[0].codcli_cbim }
							disabled
							style={{ width: '100%' }}
						/>
					</Col>
				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Nombre del Acuerdo Comercial</label>
						<Input
							name='nombre'
							value={typeof body === 'undefined' ? '' : body.nombre}
							onChange={changeBody}
							style={inputStyle}
						/>
					</Col>
					<Col span={18}>
						<label>Descripción del Acuerdo Comercial</label>
						<Input
							name='descripcion'
							value={typeof body === 'undefined' ? '' : body.descripcion}
							onChange={changeBody}
							style={inputStyle}
						/>
					</Col>
				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={8}>
						<label>Fecha de inicio</label>
						<DatePicker
							value={initialDate === '' ? '' : moment(initialDate)}
							onChange={(date, dateString) => {
								let d = new Date(date)
								let dateIso = d.toISOString()
								setInitialDate(date)
								setBody({ ...body, fechainicio: dateIso })
							}}
							locale={locale}
							format={dateFormat}
							placeholder={'Seleccionar fecha'}
							style={inputStyle}
						/>
					</Col>
					<Col span={8}>
						<label>Fecha de fin</label>
						<DatePicker
							format={dateFormat}
							value={finalDate === '' ? '' : moment(finalDate)}
							onChange={(date, dateString) => {
								let d = new Date(date)
								let dateIso = d.toISOString()
								setFinalDate(date)
								setBody({ ...body, fechafin: dateIso })
							}}
							placeholder={'Seleccionar fecha'}
							style={inputStyle}
						/>

					</Col>

				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Estado</label>

						<Select
							onChange={(value) => { setBody({ ...body, idestado: value }) }}
							value={typeof body === 'undefined' ? '' : body.idestado}
							style={inputStyle}
						>
							<Option value={0} style={{ color: '#CCC' }}>Borrador</Option>
							<Option value={1}>Activo</Option>
							<Option value={2}>Inactivo</Option>
						</Select>
					</Col>
					<Col span={6}>
						<Switch
							checkedChildren="Si" unCheckedChildren="No"
							value={body.ind_surtido}
							defaultChecked={typeof body === 'undefined' ? '' : body.ind_surtido}
							onChange={(value) => {
								setBody({ ...body, ind_surtido: value })
							}}
						/>
						<label style={{ display: 'inline-block', marginTop: '35px', marginLeft: '10px' }}>
							Surtido
						</label>
					</Col>
					<Col span={6} style={{ display: 'none' }}>
						<Switch
							checkedChildren="Si" unCheckedChildren="No"
							value={typeof body === 'undefined' ? '' : body.ind_renovar}
							defaultChecked={body.ind_renovar}
							onChange={(value) => {
								setBody({ ...body, ind_renovar: value })
							}}
						/>
						<label style={{ display: 'inline-block', marginTop: '35px', marginLeft: '10px' }}>
							Renovar
						</label>
					</Col>
					<Col span={6} style={{ display: 'none' }}>
						<Switch
							checkedChildren="Si" unCheckedChildren="No"
							value={typeof body === 'undefined' ? '' : body.ind_seleccion_conjunta}
							defaultChecked={body.ind_seleccion_conjunta}
							onChange={(value) => {
								setBody({ ...body, ind_seleccion_conjunta: value })
							}}
						/>
						<label style={{ display: 'inline-block', marginTop: '35px', marginLeft: '10px' }}>
							Seleccion conjunta
						</label>
					</Col>
				</Row>
			</div>

			<h3 style={{ margin: '20px 0 10px 0' }}>
				Lineas de descuento
			</h3>
			<div className="table-filters-indas" style={{ padding: '5px 20px 20px 20px' }}>
				<Row style={{ width: '100%' }}>
					<Col span={4}>
						<label>{' '}</label>
						<Button size="small" type="primary" style={{ marginTop: '30px' }} onClick={() => setLineaDescuento(prevArray => [...prevArray, "new row"])}>Agregar</Button>
					</Col>
					<Col span={20} />
				</Row>
				{lineaDescuento.map((ele, index) => (
					<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0, marginTop: 10 }}>
						<Col span={6}>
							<label>Unidades Maximas</label>
							<Input
								name='udsmaximas'
								//value={typeof body === 'undefined' ? '' : body.udsmaximas}
								onChange={(item) => {
									setUdsmaximas(item.target.value)
								}}
								onBlur={() => handleEscaladosBody()}
								style={inputStyle}
							/>

						</Col>
						<Col span={6}>
							<label>Unidades Minimas</label>
							<Input
								name='udsminimas'
								//value={typeof body === 'undefined' ? '' : body.udsminimas}
								onChange={(item) => {
									setUdsminimas(item.target.value)
								}}
								style={inputStyle}
								onBlur={() => handleEscaladosBody()}
							/>

						</Col>
						<Col span={6}>
							<label>Descuento</label>
							<Input
								name='descuento'
								//value={typeof body === 'undefined' ? '' : body.descuento}
								onChange={(item) => {
									setDescuento(item.target.value)
								}}
								suffix={"%"}
								style={inputStyle}
								onBlur={() => handleEscaladosBody()}
							/>
						</Col>

						<Col span={6}>
							<label> TXT Descuento</label>
							<Input
								name='txtdescuento'
								//value={typeof body === 'undefined' ? '' : body.txtdescuento}
								onChange={(item) => {
									setTxtdescuento(item.target.value)
								}}
								suffix={"%"}
								style={inputStyle}
								onBlur={() => handleEscaladosBody()}
							/>
						</Col>
					</Row>
				))}
			</div>

			<h3 style={{ margin: '20px 0 10px 0' }}>
				Asociación de productos
			</h3>
			<Row style={{ width: '100%' }}>
				<Col span={12} style={{ height: '1150px', overflow: 'auto', paddingRight: '10px' }}>
					<List
						size="small"
						header={<div>Submarcas</div>}
						bordered
						dataSource={subMarcasArrayRedux.sort((a, b) => a.nombre.localeCompare(b.nombre))}
						//onChange={catalogoProducts}
						renderItem={
							item => (
								<List.Item
									style={{ cursor: 'pointer' }}
								>
									<Checkbox
										value={item.idsubmarca}
										onChange={async (e) => {
											await onSelectChange(e, item)
										}}
										//onChange={()=> onChangeArray( item.idsubmarca ) }
										defaultValue={() => marcadosRedux.indexOf(item.idsubmarca) > -1}
									>
										{item.nombre}
									</Checkbox>
								</List.Item>
							)
						}

					/>

				</Col>
				<Col span={12} style={{ height: '1150px', overflow: 'auto', paddingLeft: '10px' }}>
					<List
						//onChange={catalogoProducts}
						size="small"
						header={<div>Seleccionados</div>}
						bordered
						dataSource={productsfilted}
						renderItem={
							item => (
								<List.Item>
									{item.nombre}
								</List.Item>)
						}
					/>
				</Col>
			</Row>
			<Button size="large" type="primary" onClick={() => onSubmit()} style={{ marginTop: '10px' }}>
				{typeof window.location.pathname.split('/')[3] === 'undefined' ? window.location.pathname.split('/')[2] : window.location.pathname.split('/')[3]}
			</Button>
		</>
	)

}

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


export default BrandsSubList

