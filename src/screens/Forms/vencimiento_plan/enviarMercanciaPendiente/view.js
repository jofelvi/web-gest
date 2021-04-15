import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
	Form,
	Row,
	Col,
	Button,
	Input,
	Select,
	Divider,
	Icon,
	Tooltip,
	Switch,
	Badge
} from 'antd'
import { selectTaskVariable } from '../../lib'
import { tableCols } from './data'
import {
	obtenerValoresIniciales,
	obtenerValidacionSchema,
	fechaView,
	establecerValoresEnvio,
	esModificado,
} from './lib'
import { EditableTable } from './editableTable'
const { Option } = Select
const { TextArea } = Input
const validationSchema = Yup.object().shape(obtenerValidacionSchema())

const Regularizar = ({
	getTaskVariables,
	taskVariables,
	completeTask,
	fetchTask,
	history,
	match: {
		params: { taskId, procId },
	},
	task,
	token,
	loadEntitiesIndas,
	entitiesIndas,
	loadWholesalersIndas,
	wholesalersIndas
}) => {
	useEffect(() => {
		getTaskVariables({ history, taskId })
		if (!task) {
			fetchTask(taskId)
		}
	}, [token, task])
	useEffect(() => {
		if (taskVariables) {
			const idcliente = selectTaskVariable(taskVariables, 'idcliente')
			if (idcliente) {
				loadEntitiesIndas({ filters: { idcliente: idcliente.value } })
			}
		}
	}, [token, taskVariables])
	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables)}
			validationSchema={validationSchema}
			enableReinitialize>
			{({ values, errors, handleChange, setFieldValue }) => (
				<Form className="form-indas">
					<h2>Vencimiento Plan de Compra</h2>

					<h3 style={{margin: '20px 0 10px 0'}}>Datos generales</h3>

          <div className="table-filters-indas" style={{padding:'20px'}}>
						<Row style={{width: '100%', marginBottom: 10, marginTop: 10}} key="cliente">
							<Col span={18}>
                <span>Entidad <small>(Código, Nombre, Código Postal, Población,
									Provincia, Dirección)</small></span>
                <div style={{ padding: '0px', paddingTop: '0',
									paddingRight: '20px' }}>
									<Input disabled
										value={values.nomcli_cbim}/>
                </div>
							</Col>
							<Col span={6}>
              	<span>Código Cliente</span>
                <div style={{ padding: '0px', paddingTop: '0', paddingRight:
									'20px' }}>
									<Input disabled
										value={values.codcli_cbim}/>
                </div>
							</Col>
						</Row>
						<Row style={{width: '100%', marginBottom: 10, marginTop: 10}} key="plan">
							<Col span={12}>
								<span>Nombre del plan</span>
                <div style={{ padding: '0px', paddingTop: '0', paddingRight:
									'20px' }}>
									<Input disabled value={values.plan_nombre}/>
                </div>
							</Col>
							<Col span={12}>
								<span>Descripción del plan</span>
                <div style={{ padding: '0px', paddingTop: '0', paddingRight:
									'20px' }}>
									<Input disabled value={values.plan_descripcion}/>
                </div>
							</Col>
						</Row>
						<Row style={{width: '100%', marginBottom: 10, marginTop: 10}} key="fechas">
							<Col span={12}>
								<span>Fecha de inicio</span>
                <div style={{ padding: '0px', paddingTop: '0', paddingRight:
									'20px' }}>
									<Input disabled value={fechaView(values.fecha_inicio)}/>
                </div>
							</Col>
							<Col span={12}>
								<span>Fecha de fin</span>
                <div style={{ padding: '0px', paddingTop: '0', paddingRight:
									'20px' }}>
									<Input disabled value={fechaView(values.fecha_fin)}/>
                </div>
							</Col>
						</Row>
						<Row style={{width: '100%', marginBottom: 0, marginTop: 10}} key="estado">
							<Col span={24}>
								<span>Estado</span>
							</Col>
						</Row>
						<Row style={{width: '100%', marginBottom: 10, marginTop: 0}} key="switches">
							<Col span={4}>
								<Select disabled value={values.estado}/>
							</Col>
							<Col span={10} style={{ marginTop: 5 }}>
								<span style={{ paddingRight: '50px' }}/>
								<Switch checkedChildren="Sí" checked={values.ind_renovar}/>
								<span style={{ paddingRight: '20px' }}/>
								<span>Renovación Automática</span>
							</Col>
							<Col span={10} style={{ marginTop: 5 }}>
								<span style={{ paddingRight: '50px' }}/>
								<Switch checkedChildren="Sí" checked={values.ind_regularizar}/>
								<span style={{ paddingRight: '20px' }}/>
								<span>Forzar Mercancía pendiente</span>
							</Col>
						</Row>
					</div>

					<h3 style={{margin: '20px 0 10px 0'}}>Líneas de descuento</h3>

          <div className="table-filters-indas" style={{padding:'20px'}}>
						<Row style={{width: '100%', marginBottom: 10, marginTop: 0}} key="lineas-descuento">
							<Col span={8}>
								<span>Unidades Comprometidas</span>
								<Input style={{ marginBottom: 5}} disabled
									value={values.e1_udsmaximas}/>
								{values.d2_udsmaximas && <Input style={{ marginBottom: 5}}
									disabled suffix='%' value={values.e2_udsmaximas}/>}
							</Col>
							<Col span={1}/>
							<Col span={8}>
								<span>Descuento</span>
								<Input style={{ marginBottom: 5}} disabled
									suffix='%' value={values.e1_descuento}/>
								{values.d2_udsmaximas && <Input style={{ marginBottom: 5}}
									disabled suffix='%' value={values.e2_descuento}/>}
							</Col>
							<Col span={1}/>
							<Col span={6}>
								<span>Margen</span>
								<Input style={{ marginBottom: 5}} disabled
									suffix='%' value={values.margen}/>
								{values.d2_udsmaximas && <Input style={{ marginBottom: 5}}
									disabled suffix='%' value={values.margen}/>}
							</Col>
						</Row>
					</div>

					<Row key="productos">
						<EditableTable
							dataSource={values.items}
							rowKey={row => row.idproducto}
							getColumns={() => {
								return tableCols(values.tipo)
							}}
							handleSave={row => {
								console.log(row)
								if (row.udsregularizar < 0)
									return
								const newData = values.items
								const index = newData.findIndex(
									item => row.idproducto === item.idproducto,
								)
								const item = newData[index]
								newData.splice(index, 1, {
									...item,
									...row,
								})
								values.items = newData
							}}
						/>
					</Row>
					<Row key="combos">
						<Col xs={{ span: 24 }} md={{ span: 11 }}>
							<Form.Item name="codentidad_cbim" label="Entidad">
								<Select
									value={values.codentidad_cbim}
									onChange={v => {
										setFieldValue('codentidad_cbim', v)
										loadWholesalersIndas(v)
									}}>
									{entitiesIndas.map(item => (
										<Option value={item.codentidad_cbim}>
											{item.nomentidad_cbim}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col xs={{ span: 24 }} md={{ span: 13 }}>
							<Form.Item name="codmayorista" label="Mayorista">
								<Select
									value={values.codmayorista}
									onChange={v => {
										setFieldValue('codmayorista', v)
									}}>
									{wholesalersIndas.map(item => (
										<Option value={item.codmayorista}>{item.nombre}</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Divider />
					<Row key="botones" type="flex" justify="start" gutter={16}>
						<Col>
							<Button
								type="primary"
								onClick={() => {
									getTaskVariables({ history })
									if (history) history.goBack()
								}}>
								Cancelar
							</Button>
						</Col>
						<Col>
							<Button
								type="primary"
								onClick={() => {
									const iniValues = obtenerValoresIniciales(taskVariables)
									iniValues.aceptado = false
									iniValues.actualizado = false
									const variables = establecerValoresEnvio(iniValues)
									completeTask({ variables, history, taskId, procId })
								}}>
								Rechazar
							</Button>
						</Col>
						<Col>
							<Button
								type="primary"
								disabled={values.codmayorista ? false : true}
								onClick={() => {
									values.aceptado = true
									values.actualizado = esModificado(values, taskVariables)
									const variables = establecerValoresEnvio(values)
									completeTask({ variables, history, taskId, procId })
								}}>
								Generar pedido
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	)
}

Regularizar.propTypes = {
	completeTask: PropTypes.func.isRequired,
}

export default withRouter(Regularizar)
