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
	Select,
	message,
	Icon,
} from 'antd'
import { transformData, selectTaskVariable } from '../../lib'
import {
	obtenerValoresIniciales,
	getOptionValue,
	isNotValidData,
	setEntidadCbim,
} from './lib'
import { processData } from './data'
import './style-rv.css'

const { Option } = Select

const getValueRadio = ind_esFarmacia => {
	if (typeof ind_esFarmacia !== 'boolean') return ind_esFarmacia
	return ind_esFarmacia ? '1' : '0'
}

const ValidarEntidad = ({
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
			const idCliente = selectTaskVariable(taskVariables, 'idcliente')
			if (idCliente) {
				loadClienteCbimEntidades(idCliente.value)
			}
		}
	}, [token, taskVariables])

	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables)}
			enableReinitialize>
			{({ values, handleChange, setFieldValue }) => (
				<Form colon={false} className="form-indas">
					<h2 className="form-indas-main-title">Validar Alta de Entidad</h2>
					<Row type="flex" align="top">
						<Col span={24}>
							<h3 className="form-indas-main-sub-title">
								Lista de entidades del cliente {values.taskData.idcliente}
							</h3>
							<Form.Item name="entidades">
								<Select
									onChange={v => setFieldValue(v, 'entidad')}
									onSelect={key => {
										const cc = entidadesCbim.list.find(
											e => e.codentidad_cbim === parseInt(key, 10),
										)
										if (cc) {
											const entidad = setEntidadCbim(cc)
											values.entidadCbim = { ...values.taskData, ...entidad }
										} else {
											values.entidadCbim = {}
										}
									}}>
									{entidadesCbim.list.map(c => {
										return (
											<Option
												key={c.codentidad_cbim}
												disabled={c.ind_registrado}>
												{c.ind_registrado ? <Icon type="check" /> : ''}{' '}
												{getOptionValue(c)}
											</Option>
										)
									})}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row
						type="flex"
						justify="left"
						align="top"
						gutter={(8, 8)}
						className="form-indas-body-container">
						<Row type="flex" style={{ width: '100%' }} gutter={16}>
							<Col md={{ span: 12 }} xs={{ span: 24 }}>
								<section className="form-indas-section">
									<h3 className="form-indas-main-sub-title">
										Datos de Farmacia / Sociedad
									</h3>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<Form.Item
											name="nomentidad_cbim_trn"
											required={true}
											label="Razón Social">
											<Input
												value={values.taskData.nomentidad_cbim}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif_trn" label="NIF">
											<Input
												value={values.taskData.entidad_nif}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="tipo_trn"
											label="Tipo de entidad"
											required={true}>
											<Radio.Group
												value={getValueRadio(values.taskData.ind_esfarmacia)}>
												<Radio value="1" disabled={true}>
													Farmacia
												</Radio>
												<Radio value="0" disabled={true}>
													Sociedad
												</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="direccion_trn"
											label="Direccion"
											required={true}>
											<Input
												value={values.taskData.direccion}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="codigo_postal_trn"
											label="Código Postal"
											required={true}>
											<Input
												value={values.taskData.codigo_postal}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="poblacion_trn"
											label="Localidad"
											required={true}>
											<Input
												value={values.taskData.poblacion}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="provincia_trn"
											label="Provincia"
											required={true}>
											<Input
												value={values.taskData.provincia}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_telefono_trn"
											required={true}
											label="Teléfono">
											<Input
												value={values.taskData.entidad_telefono}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email_trn"
											label="Correo electrónico">
											<Input
												value={values.taskData.cliente_email}
												disabled={true}
											/>
										</Form.Item>
									</Row>
								</section>
							</Col>
							<Col md={{ span: 12 }} xs={{ span: 24 }}>
								<section className="form-indas-section">
									<h3 className="form-indas-main-sub-title">
										Datos de Farmacia / Sociedad CBIM
									</h3>
									<Row>
										<Form.Item
											name="codentidad_cbim"
											label="Cśdigo Entidad"
											required={true}>
											<Input
												value={values.entidadCbim.codentidad_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="nomentidad_cbim"
											label="Razón Social"
											required={true}>
											<Input
												value={values.entidadCbim.nomentidad_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input
												value={values.entidadCbim.entidad_nif}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="tipo_cbim"
											label="Tipo de entidad"
											required={true}>
											<Radio.Group
												value={getValueRadio(
													values.entidadCbim.ind_esfarmacia,
												)}>
												<Radio value="1" disabled={true}>
													Farmacia
												</Radio>
												<Radio value="0" disabled={true}>
													Sociedad
												</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="direccion"
											label="Direccion"
											required={true}>
											<Input
												value={values.entidadCbim.direccion}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="codigo_postal"
											label="Código Postal"
											required={true}>
											<Input
												value={values.entidadCbim.codigo_postal}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="poblacion"
											label="Localidad"
											required={true}>
											<Input
												value={values.entidadCbim.poblacion}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="provincia"
											label="Provincia"
											required={true}>
											<Input
												value={values.entidadCbim.provincia}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_telefono"
											label="Teléfono"
											required={true}>
											<Input
												value={values.entidadCbim.entidad_telefono}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email"
											label="Correo electrónico">
											<Input
												value={values.entidadCbim.entidad_email}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
								</section>
							</Col>
						</Row>
					</Row>
					<Row
						type="flex"
						justify="left"
						align="top"
						className={isNotValidData(values.entidadCbim) ? 'hide' : ''}>
						<Col>
							<div class="ant-message-notice">
								<div class="ant-message-notice-content">
									<div class="ant-message-custom-content ant-message-warning">
										<i
											aria-label="icon: exclamation-circle"
											class="anticon anticon-exclamation-circle">
											<svg
												viewBox="64 64 896 896"
												focusable="false"
												class=""
												data-icon="exclamation-circle"
												width="1em"
												height="1em"
												fill="currentColor"
												aria-hidden="true">
												<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
											</svg>
										</i>
										<span className="margin-10">
											{!values.entidadCbim ||
											Object.entries(values.entidadCbim).length === 0
												? "Para 'Aceptar' debe seleccionar una entidad CBIM"
												: "No se puede 'Aceptar' el registro debido a que faltan datos."}
										</span>
									</div>
								</div>
							</div>
						</Col>
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
								disabled={!isNotValidData(values.entidadCbim)}
								onClick={() => {
									if (!isNotValidData(values.entidadCbim)) {
										message.error(
											'No puede aceptar el registro. Debe primero seleccionar los datos asociados en CBIM',
										)
										return
									}
									values.entidadCbim.aceptado = true
									const merge = { ...values.taskData, ...values.entidadCbim }
									const variables = transformData(merge, processData)
									completeTask({ variables, history, taskId, procId })
								}}>
								Aceptar
							</Button>
						</Col>
						<Col>
							<Button
								type="primary"
								onClick={() => {
									values.taskData.aceptado = false
									const variables = transformData(
										values.taskData,
										processData,
									)
									completeTask({ variables, history, taskId, procId })
								}}>
								Rechazar
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
	)
}

ValidarEntidad.propTypes = {
	loadClienteCbimEntidades: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	token: PropTypes.string,
}

export default withRouter(ValidarEntidad)
