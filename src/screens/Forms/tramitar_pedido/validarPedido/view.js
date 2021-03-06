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
const ValidarPedido = ({
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
	loadWholesalersIndas,
	wholesalersIndas,
}) => {
	useEffect(() => {
		getTaskVariables({ history, taskId })
		if (!task) {
			fetchTask(taskId)
		}
	}, [token, task])
	useEffect(() => {
		if (taskVariables) {
			let codEntidadCbim = selectTaskVariable(
				taskVariables,
				'codentidad_cbim',
			)
			if (codEntidadCbim) {
				loadWholesalersIndas(codEntidadCbim.value)
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
						Gestionar incidencia en pedido
					</h2>
					<Row>
						<Col span={24}>
							<span class="label-title-indas">Cliente</span>
							{values.codcli_cbim} - {values.nomcli_cbim}
						</Col>
						<Col span={24}>
							<Row gutter={8}>
								<Col span={4} className="label-title-indas">
									Id. Pedido
								</Col>
								<Col span={4} className="label-title-indas">
									Fecha
								</Col>
								<Col span={12} className="label-title-indas">
									Entidad
								</Col>
								<Col span={4} className="label-title-indas">
									Estado
								</Col>
							</Row>
							<Row gutter={8}>
								<Tooltip
									title={
										'id: ' + values.origen + '-' + values.codpedido_origen
									}>
									<Col span={4} className="label-ellipsis-indas">
										{values.origen}-{values.codpedido_origen}
									</Col>
								</Tooltip>
								<Col span={4}>{fechaView(values.fecha_alta)}</Col>
								<Col span={12}>
									{values.codentidad_cbim} -
									{values.ind_esfarmacia ? 'Farmacia' : 'Sociedad'} -
									{values.nomentidad_cbim}
								</Col>
								<Col span={4}>{values.nombre_estado}</Col>
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
							<Form.Item name="codcupon" label="Campa??a">
								<Input
									id="codcupon"
									value={values.codcupon}
									onChange={ev => {
										handleChange(ev)
									}}
								/>
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
					<Row>
						<Col span={24}>
							<Form.Item name="mensaje_error" label="Incidencia">
								<TextArea
									rows={2}
									disabled="true"
									value={values.mensaje_error}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col>
							<Button
								type="link"
								onClick={() => {
									getTaskVariables({ taskId })
									if (taskId) fetchTask(taskId)
								}}>
								<Icon type="redo" />
								Restablecer
							</Button>
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
								onClick={() => {
									values.aceptado = true
									values.actualizado = esModificado(values, taskVariables)
									const variables = establecerValoresEnvio(values)
									completeTask({ variables, history, taskId, procId })
								}}>
								Validar
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	)
}

ValidarPedido.propTypes = {
	completeTask: PropTypes.func.isRequired,
}

export default withRouter(ValidarPedido)
