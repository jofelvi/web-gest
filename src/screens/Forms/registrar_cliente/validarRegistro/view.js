import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Form, Input, Row, Col, Button, Radio, Select, Icon } from 'antd'
import { transformData } from '../../lib'
import { formData } from './data'
import { obtenerValoresIniciales } from '../comunes'
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
	const [nombreComo, setNombreComo] = useState('')
	const [loadingSearch, setLoadingSearch] = useState(false)
	const [lstClientesCbim, setLstClientesCbim] = useState([])

	return (
		<Formik
			initialValues={obtenerValoresIniciales(taskVariables, formData)}
			enableReinitialize>
			{({ values, errors }) => (
				<Form colon={false} className="form-indas">
					<h2 className="form-indas-main-title">Validar Alta de Cliente</h2>
					<Row type="flex" align="top">
						<Col span={24}>
							<h3 className="form-indas-main-sub-title">
								Buscador en entidad en CBIM
							</h3>
							<Select
								showSearch
								showArrow={true}
								placeholder="Introduzca la cadena a buscar"
								suffixIcon={<Icon type="search" />}
								loading={loadingSearch}
								value={nombreComo}
								onSearch={value => {
									console.log('Buscando clientes: ', value)
								}}
								onChange={value => {
									setNombreComo(value)
								}}>
								{lstClientesCbim.map((c, i) => (
									<Option key={i}>c.w_busqueda}</Option>
								))}
							</Select>
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
										<Form.Item name="cliente_nombre" label="Nombre">
											<Input value={values.cliente_nombre} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido1"
											label="Primer apellido">
											<Input
												value={values.cliente_apellido1}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido2"
											label="Segundo apellido">
											<Input
												value={values.cliente_apellido2}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nif" label="NIF">
											<Input value={values.cliente_nif} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email"
											label="Correo electrónico">
											<Input value={values.cliente_email} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono" label="Teléfono">
											<Input
												value={values.cliente_telefono}
												disabled="true"
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
										<Form.Item name="nomentidad_cbim" label="Razón Social">
											<Input value={values.nomentidad_cbim} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input value={values.entidad_nif} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="ind_esfarmacia" label="Tipo de entidad">
											<Radio.Group value={values.entidad_tipo}>
												<Radio value="FARMACIA" disabled="true">
													Farmacia
												</Radio>
												<Radio value="SOCIEDAD" disabled="true">
													Sociedad
												</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_telefono" label="Teléfono">
											<Input
												value={values.entidad_telefono}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email"
											label="Correo electrónico">
											<Input value={values.cliente_email} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="direccion" label="Direccion">
											<Input value={values.direccion} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal" label="Código Postal">
											<Input value={values.codigo_postal} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion" label="Ciudad">
											<Input value={values.poblacion} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia" label="Provincia">
											<Input value={values.provincia} disabled="true" />
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
										<Form.Item name="codcli_cbim" label="Código CIBM">
											<Input value={values.codcli_cbim} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nombre" label="Nombre">
											<Input value={values.cliente_nombre} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido1"
											label="Primer apellido">
											<Input
												value={values.cliente_apellido1}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_apellido2"
											label="Segundo apellido">
											<Input
												value={values.cliente_apellido2}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nif" label="NIF">
											<Input value={values.cliente_nif} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="cliente_email"
											label="Correo electrónico">
											<Input value={values.cliente_email} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono" label="Teléfono">
											<Input
												value={values.cliente_telefono}
												disabled="true"
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
											<Input value={values.cdoentidad_cbim} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="nomentidad_cbim" label="Razón Social">
											<Input value={values.nomentidad_cbim} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input value={values.entidad_nif} disabled={true} />
										</Form.Item>
									</Row>
									<Row>
										<div>{values.ind_esfarmacia}</div>
										<Form.Item name="ind_esfarmacia" label="Tipo de entidad">
											<Radio.Group value={values.ind_esfarmacia}>
												<Radio value={true} disabled={true}>
													Farmacia
												</Radio>
												<Radio value={false} disabled={true}>
													Sociedad
												</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_telefono" label="Teléfono">
											<Input
												value={values.entidad_telefono}
												disabled="true"
											/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name="entidad_email"
											label="Correo electrónico">
											<Input value={values.entidad_email} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="direccion" label="Direccion">
											<Input value={values.direccion} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal" label="Código Postal">
											<Input value={values.codigo_postal} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion" label="Ciudad">
											<Input value={values.poblacion} disabled="true" />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia" label="Provincia">
											<Input value={values.provincia} disabled="true" />
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
								onClick={() => {
									values.aceptado = true
									const variables = transformData(values, formData)
									console.log('validarRegistro.aceptar.values:', values)
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
									values.aceptado = false
									const variables = transformData(values, formData)
									console.log('validarRegistro.rechazar.values:', values)
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
	completeTask: PropTypes.func.isRequired,
}

export default withRouter(ValidarRegistro)
