import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Checkbox, Row, Col, Button, Radio, Divider } from 'antd';
import { transformData } from '../../lib';
import { formData } from './data';
import { obtenerValoresIniciales, obtenerValidacionSchema } from '../comunes';

const ValidarRegistroSinCBIM = ({
  getTaskVariables,
  taskVariables,
  completeTask,
  fetchTask,
  history,
  match: {
    params: { taskId, procId },
  },
  task,
}) => {
  useEffect(() => {
    getTaskVariables({ history, taskId });
    if (!task) {
      fetchTask(taskId);
    }
  }, []);

  return (
		<Formik
			initialValues={ obtenerValoresIniciales(taskVariables, formData) }
			enableReinitialize
		>
			{({ values, errors }) => (
				<Form colon={false} className="form-indas">
					<Row 
						type="flex" 
						justify="left" 
						align="middle" 
						gutter={16}>
						<Col
							xs={{span:24}} 
							lg={{span:10}}
							xxl={{span:8}}>
							<h2 className="form-indas-main-title">Validar Alta de Cliente</h2>
						</Col>
						<Col
							xs={{span:24}}  
							lg={{span:14}}
							xxl={{span:16}}>
							<Row gutter={16}>
								<Col xs={{span:24}}
									 md={{span:9}}>
									<Form.Item name="codcli_cbim" label="Código Cliente"
										required={true} whitespace={true}>
										<Input/>
										<ErrorMessage component="div" name="codcli_cbim"/>
									</Form.Item>
								</Col>
								<Col xs={{span:24}}
									 md={{span:9}}>
									<Form.Item name="codentidad_cbim" label="Código Entidad"
										required={true} whitespace={true}>
										<Input/>
										<ErrorMessage component="div" name="codentidad_cbim"/>
									</Form.Item>
								</Col>
								<Col xs={{span:24}}
									 md={{span:6}}>
									<Form.Item className="form-indas-search-btn-container">
										<Button 
											className="form-indas-btn-search"
											icon="search" 
											onClick={() => {
												console.log("buscar");
											}}>
											Buscar</Button>
									</Form.Item>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row 
						type="flex" 
						justify="left" 
						align="top" 
						gutter={8, 8}
						className="form-indas-body-container"
						>
						<Row
							type="flex"
							style={{width:"100%"}}
							gutter={16}
						>
							<Col md={{span:12}}
								 xs={{span:24}}>
								<h3 className="form-indas-main-sub-title">Formulario en transferindas</h3>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">Datos de Cliente</h4>
									<Row>
										<Form.Item name="cliente_nombre" label="Nombre">
											<Input value={values.cliente_nombre} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_apellido1" label="Primer apellido">
											<Input value={values.cliente_apellido1} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_apellido2" label="Segundo apellido">
											<Input value={values.cliente_apellido2} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nif" label="NIF">
											<Input value={values.cliente_nif} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_email" label="Correo electrónico">
											<Input value={values.cliente_email} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono" label="Teléfono">
											<Input value={values.cliente_telefono} disabled="true"/>
										</Form.Item>
									</Row>
								</section>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">Entidad Principal</h4>
									<Row>
										<Form.Item name="nomentidad_cbim" label="Razón Social">
										<Input value={values.nomentidad_cbim} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input value={values.entidad_nif} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_tipo" label="Tipo de entidad">
											<Radio.Group value={values.entidad_tipo}>
												<Radio value='FARMACIA' disabled="true">Farmacia</Radio>
												<Radio value='SOCIEDAD' disabled="true">Sociedad</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_telefono" label="Teléfono">
											<Input value={values.entidad_telefono} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_email" label="Correo electrónico">
											<Input value={values.entidad_email} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="direccion" label="Direccion">
											<Input value={values.direccion} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal" label="Código Postal">
											<Input value={values.codigo_postal} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion" label="Ciudad">
											<Input value={values.poblacion} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia" label="Provincia">
											<Input value={values.provincia} disabled="true"/>
										</Form.Item>
									</Row>
								</section>
							</Col>
							<Col md={{span:12}}
								 xs={{span:24}}>
								<h3 className="form-indas-main-sub-title">Formulario en CBIM</h3>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">Datos de Cliente</h4>
									<Row>
										<Form.Item name="cliente_nombre" label="Nombre">
											<Input value={values.cliente_nombre} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_apellido1" label="Primer apellido">
											<Input value={values.cliente_apellido1} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_apellido2" label="Segundo apellido">
											<Input value={values.cliente_apellido2} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_nif" label="NIF">
											<Input value={values.cliente_nif} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_email" label="Correo electrónico">
											<Input value={values.cliente_email} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="cliente_telefono" label="Teléfono">
											<Input value={values.cliente_telefono} disabled="true"/>
										</Form.Item>
									</Row>
								</section>
								<section className="form-indas-section">
									<h4 className="form-indas-main-title-section">Entidad Principal</h4>
									<Row>
										<Form.Item name="nomentidad_cbim" label="Razón Social">
											<Input value={values.nomentidad_cbim} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_nif" label="NIF">
											<Input value={values.entidad_nif} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_tipo" label="Tipo de entidad">
											<Radio.Group value={values.entidad_tipo}>
												<Radio value='FARMACIA' disabled="true">Farmacia</Radio>
												<Radio value='SOCIEDAD' disabled="true">Sociedad</Radio>
											</Radio.Group>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_telefono" label="Teléfono">
											<Input value={values.entidad_telefono} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="entidad_email" label="Correo electrónico">
											<Input value={values.entidad_email} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="direccion" label="Direccion">
											<Input value={values.direccion} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="codigo_postal" label="Código Postal">
											<Input value={values.codigo_postal} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="poblacion" label="Ciudad">
											<Input value={values.poblacion} disabled="true"/>
										</Form.Item>
									</Row>
									<Row>
										<Form.Item name="provincia" label="Provincia">
											<Input value={values.provincia} disabled="true"/>
										</Form.Item>
									</Row>
								</section>
							</Col>
						</Row>
					</Row>
					<Row type="flex" justify="left" align="top" gutter={16}>
						<Col>
							<Button type="primary" onClick={() => {
								console.log("Cancelar");
							}}>
							Cancelar</Button>
						</Col>
						<Col>
							<Button type="primary" onClick={() => {
									console.log("Acpetar")
							}}>
							Aceptar</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
  );
};

ValidarRegistroSinCBIM.propTypes = {
  completeTask: PropTypes.func.isRequired,
};

export default withRouter(ValidarRegistroSinCBIM);
