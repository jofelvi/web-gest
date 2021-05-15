import React, { useEffect, useState } from 'react';
import * as axios from "../lib/restClient";
import utils from "../lib/utils";
import OrderFilterEntity from "../screens/OrderListScreen/components/OrderFilterEntity";
import { InputBox } from "../screens/OrderListScreen/styled";
import { Checkbox, Col, DatePicker, Input, List, Row, Select, Switch, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import locale from "antd/es/locale/es_ES";
import "moment/locale/es";
import {
	createAcuerdosComerciales,
	eliminarDuplicados, eliminarItemsMarcados,
	getCatalogoProductos,
	getSubmarcas,
	listItemMarcados,
	productosFiltrados
} from "../modules/acuerdosComer/actions";
import { get, set } from 'lodash';
import * as moment from "moment";

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';
 const body = {
	 "nombre": "ACUERDO 1",
	 "descripcion": "Acuerdo con seleccion por producto",
	 "fechainicio": "2020-01-01T12:00:00",
	 "fechafin": "2020-12-31T12:00:00",
	 "idestado": 1,
	 "margen": 10.0,
	 "ind_surtido": true,
	 "ind_renovar": false,
	 "ind_seleccion_conjunta": false,
	 "escalados": [
		 {
			 "descuento": 16.67,
			 "txtdescuento": "(5+1)",
			 "udsmaximas": 40,
			 "udsminimas": 1
		 }
	 ],
	 "productos": [
		 {
			 "idproducto": 71
		 },
		 {
			 "idproducto": 72
		 },
		 {
			 "idproducto": 73
		 },
		 {
			 "idproducto": 74
		 }
	 ],
	 "clientes": [
		 {
			 "idcliente": 5032
		 }
	 ]
 }

const BrandsSubList = (props) => {

	const dispatch = useDispatch()
	const productosArrayRedux = useSelector((state) => state.acuerdosComer.productoArray);
	const subMarcasArrayRedux = useSelector((state) => state.acuerdosComer.subMarcaArray);
	const marcadosRedux = useSelector((state) => state.acuerdosComer.marcadosArray);
	const productsfilted = useSelector((state) => state.acuerdosComer.productsfilted);
	const [initialDate, setInitialDate] = useState('')
	const [finalDate, setFinalDate] = useState('')
	const [state, setState] = useState({
		idcliente: '',
		codcli_cbim: '',
		fechasValue: [],
		searchByEntity: get(props, 'filters.searchByEntity', ''),
		page: 0,
		coddelegado: '',
		idestado: '',
		fechas: [],
		expandedKeys: [],
		isFilterChanged: false,
		contareaspendientes: false
	})
	const [body, setBody] = useState({
		renovar: false,
		regularizar: false,
		productsfilted: useSelector((state) => state.acuerdosComer.productsfilted)
	})

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
       dispatch(createAcuerdosComerciales(body))
	}, [marcadosRedux])


	/*    const uniq = (arr)=> {
			let arrayUnic = []
			arrayUnic = arr.filter((v,i) => arr.indexOf(v) == i)
			return   arrayUnic
    
		}*/

	const handleValues = async (e) => {

		let objArra = {}

		if (e.target.checked) {
			console.log("entro if", marcadosRedux)

			objArra = {
				'id': e.target.value,
				'active': e.target.checked
			}
			marcadosRedux.indexOf(e.target.value) >= 0 ? console.log("esta ya en el array") : await dispatch(listItemMarcados(objArra))
		} else {

			console.log("entro else id a borrar :", e.target.value)

			let elementosFilted = marcadosRedux.filter(function (item) {
				return item.id !== e.target.value
			})

			await dispatch(eliminarItemsMarcados(elementosFilted))
		}
	}


	const onSelectChange = async e => {
		await handleValues(e)
	};

	const catalogoProducts = async () => {

		const res = productosArrayRedux.filter(f => marcadosRedux.find(item => item.id === f.idsubmarca));

		dispatch(productosFiltrados(res))
		setBody({ ...body, productsfilted: res })
	}

	const searchedValue = (key, value) => {
		if (typeof (value) == 'undefined') {
			setState({ ...state, [key]: '', isFilterChanged: true })
		} else {
			setBody({ ...body, codigoCliente: value })
			setState({ ...state, [key]: value, isFilterChanged: true })
		}

	}

	const onSubmit = () => {
		console.log(body)
	}

	return (
		<>
			<h3 style={{ margin: '20px 0 10px 0' }}>
				Datos generales
            </h3>

			<div className="table-filters-indas" style={{ padding: '20px' }}>

				<Row style={{ width: '100%', marginBottom: 0 }}>
					<Col span={18} style={{ padding: '0px' }}>
						<span>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
						<div style={{ padding: '0px', paddingTop: '0', paddingRight: '20px' }}>
							<OrderFilterEntity
								column={"object"}
								key={'filters_entity_search'}
								value={state.searchByEntity}
								defaultClient={state.idcliente}
								onChange={(entity) => searchedValue('searchByEntity', entity)}
								onChangeClient={(client) => {
									const idCliente = client ? client.idcliente : '';
									const codcliCbim = client ? client.codcli_cbim : '';
									searchedValue('idcliente', idCliente)
									searchedValue('codcli_cbim', codcliCbim)
								}}
							/>
						</div>
					</Col>

					<Col span={6} style={{ padding: '0px' }}>
						<span>Código Cliente</span>

						<InputBox
							placeholder="Código Cliente"
							value={body.codigoCliente || ''}
							disabled
						/>

					</Col>
				</Row>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Nombre del plan</label>
						<Input
							name='planNombre'
							value={body.planNombre || ''}
							onChange={changeBody}
							style={inputStyle}
						/>
					</Col>
					<Col span={18}>
						<label>Descripción del plan</label>
						<Input
							name='planDesc'
							value={body.planDesc || ''}
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
								setInitialDate(date)
								setBody({ ...body, fechaInicio: date.format('YYYY-MM-DD') })
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
								setFinalDate(date)
								setBody({ ...body, fechaFinal: date.format('YYYY-MM-DD') })
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
							onChange={(value) => { setBody({ ...body, estado: value === 1 ? 'activo' : 'inactivo' }) }}
							value={body.estado || ''}
							style={inputStyle}
						>
							<Option value={0} style={{ color: '#CCC' }}>Borrador</Option>
							<Option value={1}>Activo</Option>
							<Option value={2}>Inactivo</Option>
						</Select>
					</Col>
					<Col span={8}>
						<Switch
							checkedChildren="Si" unCheckedChildren="No"
							value={body.renovar}
							defaultChecked={body.renovar}
							onChange={(value) => {
								setBody({ ...body, renovar: value })
							}}
						/>
						<label style={{ display: 'inline-block', marginTop: '35px', marginLeft: '10px' }}>
							Renovación Automática
                        </label>
					</Col>
					<Col span={8}>
						<Switch
							checkedChildren="Si" unCheckedChildren="No"
							value={body.regularizar}
							defaultChecked={body.regularizar}
							onChange={(value) => {
								setBody({ ...body, regularizar: value })
							}}
						/>
						<label style={{ display: 'inline-block', marginTop: '35px', marginLeft: '10px' }}>Forzar Mercancía
                            pendiente</label>
					</Col>
				</Row>
			</div>

			<h3 style={{ margin: '20px 0 10px 0' }}>
				Lineas de descuento
            </h3>
			<div className="table-filters-indas" style={{ padding: '20px' }}>
				<Row style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}>
					<Col span={6}>
						<label>Unidades comprometidas</label>
						<Input
							name='unidadesC'
							value={body.unidadesC || ''}
							onChange={changeBody}
							style={inputStyle}
						/>

					</Col>
					<Col span={6}>
						<label>Descuento</label>
						<Input
							name='descuento'
							value={body.descuento || ''}
							onChange={changeBody}
							suffix={"%"}
							style={inputStyle}
						/>

					</Col>
					<Col span={6}>
						<label>Margen</label>
						<Input
							name='margen'
							value={body.margen || ''}
							onChange={changeBody}
							suffix={"%"}
							style={inputStyle}
						/>

					</Col>
				</Row>
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
											await onSelectChange(e)
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
			<Button size="large" type="primary" onClick={onSubmit} style={{ marginTop: '10px' }}>
				Crear
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

