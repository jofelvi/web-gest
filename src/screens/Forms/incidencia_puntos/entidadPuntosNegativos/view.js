import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import {
	Form,
	Input,
	Row,
	Col,
	Button,
	Radio,
} from 'antd'
import { transformData, selectTaskVariable } from '../../lib'
import { obtenerValoresIniciales, fechaView } from './lib'
import { processData } from './data'
import './style-rv.css'

const getValueRadio = ind_esFarmacia => {
	if (typeof ind_esFarmacia !== 'boolean') return ind_esFarmacia
	return ind_esFarmacia ? '1' : '0'
}

const EntidadPuntosNegativos = ({
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
	loadClienteCbimEntidades,
	entidadesCbim,
}) => {
	useEffect(() => {
		getTaskVariables({ history, taskId })
		if (!task) {
			fetchTask(taskId)
		}
	}, [token, task, history, taskId])

	useEffect(() => {
		if (taskVariables) {
			const codcli_cbim = selectTaskVariable(taskVariables, 'codcli_cbim')
			if (codcli_cbim) {
				loadClienteCbimEntidades(codcli_cbim.value)
			}
		}
	}, [token, taskVariables])

	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables)}
			enableReinitialize>
				{({ values, handleChange, setFieldValue }) => (
					<Form colon={false} className="form-indas">
						<h2 className="form-indas-main-title">Incidencia puntos</h2>
						<Row type="flex" style={{ width: '100%' }}>
							<section className="form-indas-section">
								<h2 className="table-indas-title">Datos Cliente</h2>
								<Row>
									<Col span={4}>
										<Form.Item
											name="codcli_cbim"
											label="Código Cliente">
											<Input
												value={values.taskData.codcli_cbim}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={10}>
										<Form.Item
											name="nomcli_cbim"
											label="Nombre">
											<Input
												value={values.taskData.nomcli_cbim}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={10}>
										<Form.Item
											name="cliente_email"
											label="Correo electrónico">
											<Input
												value={values.taskData.cliente_email}
												readonly={true}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										<Form.Item
											name="cliente_estado"
											label="Estado">
											<Input
												value={values.taskData.cliente_estado}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={6}>
										<Form.Item
											name="fecha_alta"
											label="Fecha de alta">
											<Input
												value={fechaView(values.taskData.fecha_alta)}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={12}></Col>
								</Row>
							</section>
							<section className="form-indas-section">
								<h2 className="table-indas-title">Datos Entidad</h2>
								<Row>
									<Col span={4}>
										<Form.Item
											name="codentidad_cbim"
											label="Código CBIM"
											>
											<Input
												value={values.taskData.codentidad_cbim}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="nomentidad_cbim"
											label="Razón Social"
											>
											<Input
												value={values.taskData.nomentidad_cbim}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={8}>
										<Form.Item
											name="tipo_trn"
											label="Tipo">
											<Radio.Group
												value={getValueRadio(values.taskData.ind_esfarmacia)}>
												<Radio value="1" readonly={true}>
													Farmacia
												</Radio>
												<Radio value="0" readonly={true}>
													Sociedad
												</Radio>
											</Radio.Group>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={4}>
										<Form.Item
											name="entidad_estado"
											label="Estado">
											<Input
												value={values.taskData.entidad_estado}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={16}>
										<Form.Item
											name="direccion"
											label="Direccion">
											<Input
												value={values.taskData.direccion}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={4}>
										<Form.Item
											name="codigo_postal"
											label="Código Postal">
											<Input
												value={values.taskData.codigo_postal}
												readonly={true}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={12}>
										<Form.Item
											name="poblacion"
											label="Población"
											>
											<Input
												value={values.taskData.poblacion}
												readonly={true}
											/>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name="provincia"
											label="Provincia"
											>
											<Input
												value={values.taskData.provincia}
												readonly={true}
											/>
										</Form.Item>
									</Col>
								</Row>
								<Row align="bottom">
									<Col span={1}></Col>
									<Col span={4}>
										<span style={{ fontSize: "xx-large" }}>
											{values.taskData.puntos}
										</span>
										<Form.Item
											name="puntos"
											label="PUNTOS">
										</Form.Item>
									</Col>
									<Col span={19}>
										<Form.Item
											name="incidencia"
											label="Incidencia">
											<Input.TextArea
												value={values.taskData.mensaje_error}
												disabled={true}
											/>
										</Form.Item>
									</Col>
								</Row>
							</section>
					</Row>
					<Row type="flex" justify="left" align="top" gutter={16}>
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
									const merge = { ...values.taskData }
									const variables = transformData(merge, processData)
									completeTask({ variables, history, taskId, procId })
								}}>
								Aceptar
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	)
}

EntidadPuntosNegativos.propTypes = {
	loadClienteCbimEntidades: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	token: PropTypes.string,
}

export default withRouter(EntidadPuntosNegativos)
