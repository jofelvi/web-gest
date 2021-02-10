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
import './styles.css'

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
			const codcli_cbim = selectTaskVariable(taskVariables, 'codcli_cbim')
			if (codcli_cbim) {
				loadEntitiesIndas('idcliente=' + codcli_cbim.value)
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
					<h2 className="form-indas-main-title">
						Regularización de Planes de Compra
					</h2>
					<h3 className="form-grupo-indas">
						Datos generales
					</h3>
					<Row>
						<Col span={12}/>
						<Col span={6}>
							<span class="label-title-indas">Estado</span>
							<Badge status="processing" text={values.estado}/>
						</Col>
						<Col span={4}>
							<span class="label-title-indas">Reno. Automáti.</span>
						</Col>
						<Col span={2}>
							<Switch checked={values.ind_renovar}/>
						</Col>
					</Row>
					<Row>
						<Col span={18}/>
						<Col span={4}>
							<span class="label-title-indas">Forzar Regula.</span>
						</Col>
						<Col span={2}>
							<Switch checked={values.ind_regularizar}/>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<span class="label-title-indas">Cliente</span>
							{values.codcli_cbim} - {values.nomcli_cbim}
						</Col>
					</Row>
					<Row>
						<Col span={9}>
							<span class="label-title-indas">Nombre PC</span>
							{values.plan_nombre}
						</Col>
						<Col span={15}>
							<span class="label-title-indas">Descripción PC</span>
							{values.plan_descripcion}
						</Col>
					</Row>
					<Row>
						<Col span={12}>
							<span class="label-title-indas">Fecha inicio</span>
							{fechaView(values.fecha_inicio)}
						</Col>
						<Col span={12}>
							<span class="label-title-indas">Fecha Fin</span>
							{fechaView(values.fecha_fin)}
						</Col>
					</Row>
					<h3 className="form-grupo-indas">
						Líneas de descuento
					</h3>
					<Row>
						<Col span={18}/>
						<Col span={6}>
							<span class="label-title-indas">Margen</span>
							{values.margen}
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Row gutter={8}>
								<Col span={4} className="label-title-indas">
									Escalado
								</Col>
								<Col span={10} className="label-title-indas">
									Unidades Comprometidas
								</Col>
								<Col span={10} className="label-title-indas">
									Descuento
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={4} className="label-title-indas">
									1
								</Col>
								<Col span={10} className="label-title-indas">
									{values.e1_udsmaximas}
								</Col>
								<Col span={10} className="label-title-indas">
									{values.e1_descuento}
								</Col>
							</Row>
							<Row gutter={8}>
								<Col span={4} className="label-title-indas">
									2
								</Col>
								<Col span={10} className="label-title-indas">
									{values.e2_udsmaximas}
								</Col>
								<Col span={10} className="label-title-indas">
									{values.e2_descuento}
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<EditableTable
							dataSource={values.items}
							getColumns={() => {
								return tableCols(values.tipo)
							}}
							handleSave={row => {
								const newData = values.items
								const index = newData.findIndex(
									item => row.codindas === item.codindas,
								)
								const item = newData[index]
								if (item.cantidad !== row.row) {
									const esPedido =
										typeof values.tipo === 'string' &&
										values.tipo.search(/pedidos/i) !== -1
									// Re-calculamos el total de puntos
									if (esPedido)
										row.puntos_acumulados_total =
											row.puntos_acumulados_unidad * row.cantidad
									else
										row.puntos_coste_total =
											row.puntos_coste_unidad * row.cantidad
								}
								newData.splice(index, 1, {
									...item,
									...row,
								})
								values.items = newData
							}}
						/>
					</Row>
					<Row>
						<Col xs={{ span: 24 }} md={{ span: 11 }}>
							<Form.Item name="codentidad_cbim" label="Entidad">
								<Select
									value={values.codentidad_cbim}
									onChange={v => {
										setFieldValue('codentidad_cbim', v)
										loadWholesalersIndas(v)
									}}>
									{entitiesIndas.map(item => (
										<Option value={item.codentidad_cbim}>{item.nomentidad_cbim}</Option>
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
					<Row type="flex" justify="left" gutter={16}>
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
