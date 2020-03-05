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
	Checkbox,
	Icon,
	Spin,
	message,
} from 'antd'
import { transformData } from '../../lib'
import {
	obtenerValoresIniciales,
	getOptionValue,
	isNotValidData,
} from './lib'
import { processData } from './data'
import './style-rv.css'

const { Option } = Select

const getValueRadio = ind_esFarmacia => {
	if(typeof ind_esFarmacia !== 'boolean') return ind_esFarmacia
	return ind_esFarmacia ? '1' : '0'
}

const ValidarRegistro = ({
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
	loadClientesCbim,
	clientesCbim,
}) => {
	useEffect(() => {
		getTaskVariables({ history, taskId })
		if (!task) {
			fetchTask(taskId)
		}
	}, [token, task])

	useEffect(() => {
		// Controlamos si ocurre un error en la petición del servicio de busqueda
		if (clientesCbim.error) {
			message.error(
				'Ha ocurrido un error al realizar la busqueda de clientes',
			)
		}
	}, [clientesCbim])

	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables)}
			enableReinitialize>
			{({ values, handleChange, setFieldValue }) => (
				<Form colon={false} className="form-indas">
					<h2 className="form-indas-main-title">Validar Alta de Cliente</h2>
					<Row type="flex" align="top">
						<Col span={24}>
							<h3 className="form-indas-main-sub-title">
								Buscador de entidad en CBIM
							</h3>
							<Form.Item name="buscador">
								<Select
									showSearch
									showArrow={true}
									placeholder="Introduzca la cadena a buscar"
									suffixIcon={<Icon type="search" />}
									notFoundContent={
										values.loadingSearch ? <Spin size="small" /> : null
									}
									filterOption={false}
									onChange={v => setFieldValue(v, 'buscador')}
									onSearch={value => {
										values.clienteCbim = {}
										values.loadingSearch = true
										clearTimeout(values.debounce)
										values.debounce = setTimeout(() => {
											values.loadingSearch = false
											loadClientesCbim(value)
										}, 600)
									}}
									onSelect={key => {
										const cc = clientesCbim.list[key]
										if (cc) {
											values.clienteCbim = { ...values.taskData, ...cc }
											values.clienteCbim.cliente_email =
												values.clienteCbim.entidad_email
										}
									}}>
									{clientesCbim.list.map((c, i) => {
										return <Option key={i}>{getOptionValue(c)}</Option>
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
								<h3 className="form-indas-main-sub-title">
									Formulario en transferindas
								</h3>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">
										Datos de Cliente
									</h4>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<Form.Item
											name="cliente_nombre_trn"
											label="Nombre"
											required={true}>
											<Input
												value={values.taskData.cliente_nombre}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido1_trn"
											label="Primer apellido"
											required={true}>
											<Input
												value={values.taskData.cliente_apellido1}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido2_trn"
											label="Segundo apellido">
											<Input
												value={values.taskData.cliente_apellido2}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_nif_trn"
											label="NIF"
											required={true}>
											<Input
												value={values.taskData.cliente_nif}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email_trn"
											label="Correo electrónico"
											required={true}>
											<Input
												value={values.taskData.cliente_email}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_telefono_trn"
											label="Teléfono"
											required={true}>
											<Input
												value={values.taskData.cliente_telefono}
												disabled={true}
											/>
										</Form.Item>
									</Row>
								</section>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">
										Entidad Principal
									</h4>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<Form.Item
											name="nomentidad_cbim_trn"
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
										<Form.Item name="entidad_telefono_trn" label="Teléfono">
											<Input
												value={values.taskData.entidad_telefono}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email"
											label="Correo electrónico">
											<Input
												value={values.taskData.cliente_email}
												disabled={true}
											/>
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
											name="ind_acepta_emailcomercial_trn"
											label="Autorizo la recepción de comunicaciones comerciales">
											<Checkbox
												checked={values.taskData.ind_acepta_emailcomercial}
												disabled={true}
											/>
										</Form.Item>
									</Row>
								</section>
							</Col>
							<Col md={{ span: 12 }} xs={{ span: 24 }}>
								<h3 className="form-indas-main-sub-title">
									Formulario en CBIM
								</h3>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">
										Datos de Cliente
									</h4>
									<Row>
										<Form.Item
											name="codcli_cbim"
											label="Código CBIM"
											required={true}>
											<Input
												value={values.clienteCbim.codcli_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<div className="col-space"></div>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email"
											label="Correo electrónico"
											required={true}>
											<Input
												id="clienteCbim.cliente_email"
												value={values.clienteCbim.cliente_email}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<div className="col-space"></div>
									</Row>
								</section>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">
										Entidad Principal
									</h4>
									<Row>
										<Form.Item
											name="codentidad_cbim"
											label="Cśdigo Entidad"
											required={true}>
											<Input
												value={values.clienteCbim.codentidad_cbim}
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
												value={values.clienteCbim.nomentidad_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input
												value={values.clienteCbim.entidad_nif}
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
													values.clienteCbim.ind_esfarmacia,
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
										<Form.Item name="entidad_telefono" label="Teléfono">
											<Input
												value={values.clienteCbim.entidad_telefono}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email"
											label="Correo electrónico"
											required={true}>
											<Input
												value={values.clienteCbim.entidad_email}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="direccion"
											label="Direccion"
											required={true}>
											<Input
												value={values.clienteCbim.direccion}
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
												value={values.clienteCbim.codigo_postal}
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
												value={values.clienteCbim.poblacion}
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
												value={values.clienteCbim.provincia}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="ind_acepta_emailcomercial_trn"
											label="Autorizo la recepción de comunicaciones comerciales">
											<Checkbox
												checked={values.clienteCbim.ind_acepta_emailcomercial}
												disabled={true}
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
						className={isNotValidData(values.clienteCbim) ? 'hide' : ''}>
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
											{!values.clienteCbim ||
											Object.entries(values.clienteCbim).length === 0
												? "Para 'Aceptar' debe realizar la busqueda de la entidad en CBIM"
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
								disabled={!isNotValidData(values.clienteCbim)}
								onClick={() => {
									if (!isNotValidData(values.clienteCbim)) {
										message.error(
											'No puede aceptar el registro. Debe primero busrcar y seleccionar los datos asociados en CBIM',
										)
										return
									}
									values.clienteCbim.aceptado = true
									const merge = { ...values.taskData, ...values.clienteCbim }
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
									const merge = { ...values.taskData, ...values.clienteCbim }
									const variables = transformData(merge, processData)
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

ValidarRegistro.propTypes = {
	loadClientesCbim: PropTypes.func.isRequired,
	completeTask: PropTypes.func.isRequired,
	token: PropTypes.string,
}

export default withRouter(ValidarRegistro)
