import React, { useEffect, useState } from 'react'
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
	Icon,
	Spin,
} from 'antd'
import { transformData } from '../../lib'
import { obtenerValoresIniciales, getOptionValue } from './lib'
import { processData } from './data'
import './style-rv.css'

const { Option } = Select

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

	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables)}
			enableReinitialize>
			{({ values, errors, handleChange, setFieldValue }) => (
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
										<Form.Item name="cliente_nombre_trn" label="Nombre">
											<Input
												value={values.taskData.cliente_nombre}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido1_trn"
											label="Primer apellido">
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
										<Form.Item name="cliente_nif_trn" label="NIF">
											<Input
												value={values.taskData.cliente_nif}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email_trn"
											label="Correo electrónico">
											<Input
												value={values.taskData.cliente_email}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono_trn" label="Teléfono">
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
										<Form.Item name="tipo_trn" label="Tipo de entidad">
											<Radio.Group value={values.taskData.tipo}>
												<Radio value="FARMACIA" disabled={true}>
													Farmacia
												</Radio>
												<Radio value="SOCIEDAD" disabled={true}>
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
										<Form.Item name="direccion_trn" label="Direccion">
											<Input
												value={values.taskData.direccion}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal_trn" label="Código Postal">
											<Input
												value={values.taskData.codigo_postal}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion_trn" label="Ciudad">
											<Input
												value={values.taskData.poblacion}
												disabled={true}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia_trn" label="Provincia">
											<Input
												value={values.taskData.provincia}
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
										<Form.Item name="codcli_cbim" label="Código CBIM">
											<Input
												value={values.clienteCbim.codcli_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nombre" label="Nombre">
											<Input
												value={values.clienteCbim.cliente_nombre}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido1"
											label="Primer apellido">
											<Input
												value={values.clienteCbim.cliente_apellido1}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido2"
											label="Segundo apellido">
											<Input
												value={values.clienteCbim.cliente_apellido2}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nif" label="NIF">
											<Input
												value={values.clienteCbim.cliente_nif}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email"
											label="Correo electrónico">
											<Input
												value={values.clienteCbim.cliente_email}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono" label="Teléfono">
											<Input
												value={values.clienteCbim.cliente_telefono}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
								</section>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">
										Entidad Principal
									</h4>
									<Row>
										<Form.Item name="codentidad_cbim" label="Cśdigo Entidad">
											<Input
												value={values.clienteCbim.codentidad_cbim}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="nomentidad_cbim" label="Razón Social">
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
										<Form.Item name="tipo_cbim" label="Tipo de entidad">
											<Radio.Group value={values.clienteCbim.tipo}>
												<Radio value="FARMACIA" disabled={true}>
													Farmacia
												</Radio>
												<Radio value="SOCIEDAD" disabled={true}>
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
											label="Correo electrónico">
											<Input
												value={values.clienteCbim.entidad_email}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="direccion" label="Direccion">
											<Input
												value={values.clienteCbim.direccion}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal" label="Código Postal">
											<Input
												value={values.clienteCbim.codigo_postal}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion" label="Ciudad">
											<Input
												value={values.clienteCbim.poblacion}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia" label="Provincia">
											<Input
												value={values.clienteCbim.provincia}
												disabled={true}
												onChange={v => handleChange(v)}
											/>
										</Form.Item>
									</Row>
								</section>
							</Col>
						</Row>
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
								disabled={
									!values.clienteCbim ||
									Object.entries(values.clienteCbim).length === 0 ||
									!values.clienteCbim.entidad_email
								}
								onClick={() => {
									if (
										!values.clienteCbim ||
										Object.entries(values.clienteCbim).length === 0
									) {
										alert(
											'No puede aceptar el registro. Debe primero busrcar y seleccionar los datos asociados en CBIM',
										)
										return
									}
									values.clienteCbim.aceptado = true
									const merge = { ...values.taskData, ...values.clienteCbim }
									const variables = transformData(merge, processData)
									console.log('validarRegistro.aceptar.variables:', variables)
									//completeTask({ variables, history, taskId, procId });
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
									console.log(
										'validarRegistro.rechazar.variables:',
										variables,
									)
									//completeTask({ variables, history, taskId, procId });
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
