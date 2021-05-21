import React, { useEffect, useState } from 'react'
import { InputBox } from "../../OrderListScreen/styled"
import { Button, Checkbox, Col, DatePicker, Input, InputNumber, List, Row, Select, Switch, Tabs, Tooltip, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import locale from "antd/es/locale/es_ES"
import "moment/locale/es"
import {
	editAcuerdosComerciales,
	eliminarItemsMarcados,
	getByIdAcuerdoComerciale,
	getCatalogoProductos,
	getSubmarcas,
	listItemMarcados,
	productosFiltrados,
	getMarcas,
	getFamilia
} from "../../../modules/acuerdosComer/actions"
import * as moment from "moment"
import { useHistory, useLocation, useParams } from "react-router-dom";
import PlanesCompraSaved from "../../CommercialDealsScreen/PlanesCompra/components/PlanesCompraSaved";
import SearchInputEntidad from "../../../components/SearchInputEntidad";
import ExtendedDualListBox from '../ExtendedDualListBox'
import DualListFilter from '../DualListFilter'
import { get, keys } from 'lodash'
import { UpOutlined, DownOutlined, ExclamationCircleOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined, BorderTopOutlined } from "@ant-design/icons"

const { TabPane } = Tabs
const { Option } = Select
const dateFormat = 'DD/MM/YYYY'
const dualListIcons = {
	moveLeft: <LeftOutlined />,
	moveAllLeft: <DoubleLeftOutlined />,
	moveRight: <RightOutlined />,
	moveAllRight: <DoubleRightOutlined />,
	moveDown: <DownOutlined />,
	moveUp: <UpOutlined />,
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


const FormEditAcuerdosComerciales = (props) => {

	let { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch()
	const history = useHistory()
	const [loading, setLoading] = useState(true);
	const idsBuscador = useSelector((state) => state.acuerdosComer.cod_Cliente)
	const productosArrayRedux = useSelector((state) => state.acuerdosComer.productoArray)
	const marcadosRedux = useSelector((state) => state.acuerdosComer.marcadosArray)
	const productsfilted = useSelector((state) => state.acuerdosComer.productsfilted)
	const [successEdit, setSuccessEdit] = useState(false);
	const [body, setBody] = useState({
		productos: [],
		clientes: [],
		escalados: [],
		ind_seleccion_conjunta: true,
		"margen": parseFloat(1.0),
		"idtipo": 1,
		'ind_renovar': false,
		"ind_surtido": false
	})
	const subMarcasArrayRedux = useSelector((state) => state.acuerdosComer.subMarcaArray)
	const [initialDate, setInitialDate] = useState(typeof body === 'undefined' ? '' : body.fechainicio)
	const [finalDate, setFinalDate] = useState(typeof body === 'undefined' ? '' : body.fechafin)
	const [idCliente, setIdCliente] = useState();
	const successCreate = useSelector((state) => state.acuerdosComer.createAcuerdoSucces)
	const [codcli_cbim, setCodcli_cbim] = useState("");
	const [nomcli_cbim, setNomcli_cbim] = useState("");
	const [ind_surtido, setInd_surtido] = useState(false);
	const [ind_seleccion_conjunta, setInd_seleccion_conjunta] = useState()
	const [bodyError, setBodyError] = useState([])
	const [filterProducts, setFilterProducts] = useState({
		seleccion_individual_filtro_submarca: "",
		seleccion_individual_filtro_categoria: "",
		seleccion_individual_filtro_marca: ""
	})
	const marcasArrayRedux = useSelector((state) => state.acuerdosComer.marcasArray)
	const familiaArrayRedux = useSelector((state) => state.acuerdosComer.familiaArray)

	const [inputList, setInputList] = useState([{
		"descuento": 10.00,
		"udsmaximas": 1,
		"udsminimas": 1,
		"txtdescuento": "",
	}]);

	const [isForEdit, setIsForEdit] = useState(location.search === "?editar" ? true : false);
	const [submarcasMarcadas, setSubMarcasMarcadas] = useState([])

	const callbackSave = (action) => {
		if (typeof action === 'undefined') {
			console.log('no hay action')
		} else {
			action()
		}
	}

	const changeBody = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		callApis()
		handleApi()
	}, [])

	useEffect(() => {
		catalogoProducts()
	}, [marcadosRedux])

	const callApis = () => {
		dispatch(getCatalogoProductos())
		dispatch(getSubmarcas())
		dispatch(getMarcas())
		dispatch(getFamilia())
	}

	const handleApi = async () => {
		let objAc = await dispatch(getByIdAcuerdoComerciale(id)).then(setLoading(false))
		setCodcli_cbim(objAc.codcli_cbim)
		setNomcli_cbim(objAc.nomcli_cbim)
		var newArray = []
		objAc.submarcas.forEach(item => {
			newArray.push(item.idsubmarca)
		})
		setSubMarcasMarcadas(newArray)

		const { clientes, ind_surtido, escalados, ind_seleccion_conjunta } = objAc
		let objResult = delete objAc.clientes
		let objResult2 = delete objAc.codcli_cbim
		let objResult3 = delete objAc.coddelegado
		let objResult4 = delete objAc.delegado
		let objResult5 = delete objAc.estado
		let objResult6 = delete objAc.estado2
		let objResult7 = delete objAc.idcliente
		let objResult8 = delete objAc.nomcli_cbim
		let objResult9 = delete objAc.tipo

		objAc.clientes = [{ "idcliente": parseInt(clientes[0].idcliente) }]

		setInd_surtido(ind_surtido)
		setInputList(escalados)
		setInd_seleccion_conjunta(ind_seleccion_conjunta)
		setBody(objAc)

	}

	const handleValues = async (e, item) => {

		let objArra = {
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

		dispatch(productosFiltrados(res))

		setBody({
			...body,
			productos: productosBody,
		})
	}

	const handleEscaladosBody = () => {

		setBody({ ...body, escalados: inputList })
	}

	const validate = (body, success, errorCallback) => {
		const validations = [
			{ field: 'clientes[0].idcliente', validator: (value) => (value != ''), message: 'No se puede dejar en blanco. Seleccione una entidad para rellenarlo.' },
			{ field: 'nombre', validator: (value) => (value != ''), message: 'No se puede dejar en blanco' },
			{
				field: 'fechainicio',
				validator: (value) => (body && moment(body.fechainicio).isSame(value, 'day') ? true : moment(value).startOf('day') >= moment().startOf('day')),
				message: 'No puede ser una fecha pasada.'
			},
			{
				field: 'fechafin',
				validator: (value) => (body && moment(body.fechafin).isSame(value, 'day') ? true : moment(value).startOf('day') >= moment().startOf('day')),
				message: 'No puede ser una fecha pasada.'
			},
			{ field: 'fechafin', validator: (value, record) => (moment(value).startOf('day') >= moment(record.fechainicio).startOf('day')), message: 'Debe ser posterior a la fecha de inicio.' },
			{ field: 'escalados[0].udsmaximas', validator: (value) => (parseInt(value) > 0), message: 'Debe ser mayor que 0.' },
			{ field: 'escalados[0].udsmaximas', validator: (value) => (parseInt(value).toString() == value), message: 'Debe ser un numero entero.' },
			{ field: 'escalados[0].descuento', validator: (value) => (parseFloat(value) > 0 && parseFloat(value) < 100), message: 'Debe ser un porcentaje.' },
			{ field: 'margen', validator: (value) => (parseFloat(value) > 0 && parseFloat(value) < 100), message: 'Debe ser un porcentaje.' },
			{ field: 'submarcas', validator: (value, record) => (record.ind_seleccion_conjunta == false || value.length > 0), message: 'Debe seleccionar por lo menos una submarca.' },
			{ field: 'productos', validator: (value, record) => (record.ind_seleccion_conjunta == true || value.length > 0), message: 'Debe seleccionar por lo menos un producto.' }
		]

		const validationErrors = []

		for (let i in validations) {
			const validation = validations[i]
			const value = get(body, validation.field, '')
			if (!validation.validator(value, body)) {
				validationErrors[validation.field] = validation.message
				setBodyError(validationErrors)
			}
		}
		callbackSave(keys(validationErrors).length > 0 ? errorCallback : success)
	}

	const hasError = (field) => {
		return get(bodyError, field, false) !== false
	}

	const getError = (field, spaced = false) => {
		if (hasError(field)) {
			const validationError = get(bodyError, field, false)
			return (
				<div style={spaced ? spacedErrorTooltipStyle : errorTooltipStyle} >
					<Tooltip title={validationError} >
						<span><ExclamationCircleOutlined style={{ color: 'red', fontSize: '18px' }} /></span>
					</Tooltip>
				</div>
			)
		}
		return ''
	}

	const onSubmitOk = async () => {
		if (isForEdit) {
			let res = await dispatch(editAcuerdosComerciales(body, id))
			return res
		}
	}


	const onSubmit = () => {
		validate(body, () => {
			onSubmitOk()
		}, () => {
			document.querySelector('.ant-layout-content').scrollTo(0, 0)
		})
	}

	const handleInputChange = (value, index, key) => {

		if (key === "udsminimas" || key === "udsmaximas") {
			const list = [...inputList];
			list[index][key] = typeof value === 'string' || typeof value === 'object' ? 0 : parseInt(value)
			setInputList(list);
		} else {
			const list = [...inputList];
			list[index][key] = typeof value === 'string' || typeof value === 'object' ? 0 : parseFloat(value).toFixed(2)
			setInputList(list);
		}
	};

	const handleRemoveClick = index => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	const handleAddClick = () => {
		setInputList([...inputList, {
			"descuento": 1.0,
			"udsmaximas": 1,
			"udsminimas": 1,
			"txtdescuento": "",
		}]);
	}

	const filterSeleccionIndividual = (item) => {
		const filtro_categoria = filterProducts.seleccion_individual_filtro_categoria
		const filtro_marca = filterProducts.seleccion_individual_filtro_marca
		const filtro_submarca = filterProducts.seleccion_individual_filtro_submarca

		return (filtro_categoria === '' || parseInt(item.idgrupo) == parseInt(filtro_categoria))
			&& (filtro_marca === '' || parseInt(item.idmarca) == parseInt(filtro_marca))
			&& (filtro_submarca === '' || parseInt(item.idsubmarca) == parseInt(filtro_submarca))
	}

	if (successCreate) {
		return <PlanesCompraSaved mensaje={"Su Acuerdo Comercial Fue editado Exitosamente"} ac={true} />
	}


	const { confirm } = Modal

	const confirmChangePanel = (tipo, value) => {
		if (body.productos.length === 0 && body.submarcas.length === 0) {
			setBody({ ...body, ind_seleccion_conjunta: value === "1" ? true : false })
		} else {
			const messageContent = `¿Desea cambiar a ${tipo}? Se perderán los productos agregados`
			confirm({
				title: `Confirmar acción`,
				icon: <ExclamationCircleOutlined />,
				content: messageContent,
				onOk: () => {
					setBody({ ...body, ind_seleccion_conjunta: value === "1" ? true : false, productos: [], submarcas: [] })
				},
				onCancel() {
					setBody({ ...body, ind_seleccion_conjunta: body.ind_seleccion_conjunta })
				},
			})
		}
	}

	return (
		<>
			<h3 style={{ margin: '20px 0 10px 0' }}>
				Datos generales
			</h3>

			<div className="table-filters-indas" style={{ padding: 20 }}>

				<Row style={{ width: '100%' }}>
					<Col span={17} style={{ padding: '0px' }}>
						<span>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
						<div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
							<SearchInputEntidad
								desactivado={true}
								valorDefecto={typeof body === 'undefined' ? '' : nomcli_cbim}
							/>
						</div>
					</Col>

					<Col span={6}>
						<span>Código Cliente</span>
						<InputBox
							placeholder="Código Cliente"
							value={typeof body === 'undefined' ? "" : codcli_cbim || idsBuscador[0].codcli_cbim}
							disabled
							style={hasError('clientes[0].idcliente') ? inputErrorStyle : inputStyle}
						/>
						{getError('clientes[0].idcliente')}
					</Col>
				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Nombre del Acuerdo Comercial</label>
						<Input
							name='nombre'
							value={typeof body === 'undefined' ? '' : body.nombre}
							onChange={changeBody}
							style={hasError('nombre') ? inputErrorStyle : inputStyle}
						/>
						{getError('nombre')}
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
							value={typeof body === 'undefined' ? '' : moment(body.fechainicio)}
							onChange={(date, dateString) => {
								let d = new Date(date)
								let dateIso = d.toISOString()
								setInitialDate(date)
								setBody({ ...body, fechainicio: dateIso })
							}}
							locale={locale}
							format={dateFormat}
							placeholder={'Seleccionar fecha'}
							style={hasError('fechainicio') ? inputErrorStyle : inputStyle}
						/>
						{getError('fechainicio')}
					</Col>
					<Col span={8}>
						<label>Fecha de fin</label>
						<DatePicker
							format={dateFormat}
							value={typeof body === 'undefined' ? '' : moment(body.fechafin)}
							onChange={(date, dateString) => {
								let d = new Date(date)
								let dateIso = d.toISOString()
								setFinalDate(date)
								setBody({ ...body, fechafin: dateIso })
							}}
							placeholder={'Seleccionar fecha'}
							style={hasError('fechafin') ? inputErrorStyle : inputStyle}
						/>

					</Col>
					{getError('fechafin')}
				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Estado</label>

						<Select
							onChange={(value) => {
								setBody({ ...body, idestado: value })
							}}
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
							checked={typeof body === 'undefined' ? false : body.ind_surtido}
							//defaultChecked={ind_surtido}
							onChange={(value) => {
								console.log("value check", value)
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
							checked={typeof body === 'undefined' ? false : body.ind_renovar}
							defaultChecked={typeof body === 'undefined' ? false : body.ind_renovar}
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
							checked={typeof body === 'undefined' ? false : body.ind_seleccion_conjunta}
							defaultChecked={typeof body === 'undefined' ? false : body.ind_seleccion_conjunta}
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

				{inputList.map((x, i) => {
					return (

						<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0, marginTop: 10 }}>

							<Col span={6}>
								<label>Unidades Minimas</label>
								<InputNumber
									name="udsminimas"
									placeholder="1"
									min={1}
									//defaultValue={1}
									onChange={e => handleInputChange(e, i, "udsminimas")}
									style={hasError('udsminimas') ? inputErrorStyle : inputStyle}
									onBlur={() => handleEscaladosBody()}
									value={x.udsminimas}
								/>

							</Col>
							<Col span={6}>
								<label>Unidades Maximas</label>
								<InputNumber
									name="udsmaximas"
									placeholder="Ingresar la cantidad minima para la linea de descuento"
									min={0}
									defaultValue={6}
									onChange={e => handleInputChange(e, i, "udsmaximas")}
									style={hasError('udsmaximas') ? inputErrorStyle : inputStyle}
									onBlur={() => handleEscaladosBody()}
									stringMode
									value={x.udsmaximas}
								/>
							</Col>
							<Col span={6}>
								<label>Descuento</label>

								<InputNumber
									name="descuento"
									placeholder="Ingresar % de descuento"
									min={0}
									value={x.descuento}
									defaultValue={10}
									step="0.1"
									onChange={e => handleInputChange(e, i, "descuento")}
									style={hasError('descuento') ? inputErrorStyle : inputStyle}
									onBlur={() => handleEscaladosBody()}
									stringMode
								/>
							</Col>
							<Col span={3}>
								<div className="btn-box">
									{inputList.length !== 1 &&
										<Button size="small" type="primary" style={{ marginTop: '30px' }}
											onClick={() => handleRemoveClick(i)}>Eliminar</Button>}
								</div>
							</Col>
							<Col span={3}>
								{inputList.length - 1 === i &&
									<Button size="small" type="primary" style={{ marginTop: '30px' }}
										onClick={handleAddClick}>Agregar</Button>}
							</Col>

						</Row>
					);
				})}
			</div>

			<h3 style={{ margin: '20px 0 10px 0' }}>
				Asociación de productos
			</h3>
			<Row style={{ width: '100%' }}>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Tabs
						defaultActiveKey={ind_seleccion_conjunta === true ? "1" : "2"}
						onChange={(value) => confirmChangePanel(value === "1" ? "Selección conjunta" : "Selección individual", value)}
					>
						<TabPane tab="Selección por submarca" key="1">

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
													checked={submarcasMarcadas.indexOf(item.idsubmarca) > -1}
													onChange={async (e) => {
														await onSelectChange(e, item)
													}}
													//onChange={()=> onChangeArray( item.idsubmarca ) }
													defaultValue={marcadosRedux.indexOf(item.idsubmarca) > -1}
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
						</TabPane>
						<TabPane tab="Selección individual" key="2">
							<Row style={{ marginBottom: '10px' }}>
								<Col span={8}>
									<DualListFilter
										options={familiaArrayRedux.map((family) => {
											return {
												label: family.nombre,
												value: family.idfamilia
											}
										})}
										value={filterProducts.seleccion_individual_filtro_categoria}
										onChange={(seleccion_individual_filtro_categoria) => {
											setFilterProducts({ ...filterProducts, seleccion_individual_filtro_categoria: seleccion_individual_filtro_categoria })
										}}
									/>
								</Col>
								<Col span={8}>
									<DualListFilter
										options={marcasArrayRedux.map((brand) => {
											return {
												label: brand.nombre,
												value: brand.idmarca
											}
										})}
										value={filterProducts.seleccion_individual_filtro_marca}
										onChange={(seleccion_individual_filtro_marca) => {
											setFilterProducts({ ...filterProducts, seleccion_individual_filtro_marca: seleccion_individual_filtro_marca })
										}}
									/>
								</Col>
								<Col span={8}>
									<DualListFilter
										options={subMarcasArrayRedux.map((subBrand) => {
											return {
												label: subBrand.nombre,
												value: subBrand.idsubmarca
											}
										})}
										value={filterProducts.seleccion_individual_filtro_submarca}
										onChange={(seleccion_individual_filtro_submarca) => {
											setFilterProducts({ ...filterProducts, seleccion_individual_filtro_submarca: seleccion_individual_filtro_submarca })
										}}
									/>
								</Col>
							</Row>
							<ExtendedDualListBox
								icons={dualListIcons}
								options={productosArrayRedux.map((product) => ({ ...product, value: product.idproducto, label: product.nombre }))}
								selectedKeys={body.productos.map((producto) => producto.idproducto)}
								filter={filterSeleccionIndividual}
								onChange={
									(productos) => {
										setBody({ ...body, productos: productos.map((idproducto) => ({ idproducto })) })
									}
								}
							/>
						</TabPane>
					</Tabs>
				</Row>
			</Row>
			<Button size="large" type="primary" onClick={() => onSubmit()} style={{ marginTop: '10px' }}>
				Guardar
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


export default FormEditAcuerdosComerciales

