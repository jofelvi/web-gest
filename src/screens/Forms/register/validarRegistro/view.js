import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { Form, Input, Checkbox, Row, Col, Button } from 'antd';
import { transformData } from '../../lib';
import { formData, obtenerValoresIniciales, obtenerValidacionSchema } from './data';

const validationSchema = Yup.object().shape( obtenerValidacionSchema() );
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
}) => {
  useEffect(() => {
    getTaskVariables({ history, taskId });
    if (!task) {
      fetchTask(taskId);
    }
  }, []);

  return (
		<Formik
			initialValues={ obtenerValoresIniciales(taskVariables) }
			onSubmit={values => {
				values.aceptado = true;
				const variables = transformData(values, formData);
				completeTask({ variables, history, taskId, procId });
			}}
		validationSchema={validationSchema}
			enableReinitialize
		>
			{({ values, handleSubmit, errors }) => (
				<Form onSubmit={handleSubmit} colon={false}>
					<Row type="flex" justify="left" gutter={8}>
						<Col span={12}>
							<Row><Col><h2>Datos de Cliente</h2></Col></Row>
							<Row><Col>
								<Form.Item name="codcli_cbim" label="Código CBIM" 
									required={true} whitespace={true}>
									<Input value={values.codcli_cbim} disabled="true" size={10}/>
								</Form.Item>
								<ErrorMessage component="div" name="codcli_cbim"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="nomcli_cbim" label="Nombre CBIM">
									<Input value={values.nomcli_cbim} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="nomcli_cbim"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_nombre" label="Nombre">
									<Input value={values.cliente_nombre} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_nombre"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_apellido1" label="Primer apellido">
									<Input value={values.cliente_apellido1} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_apellido1"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_apellido2" label="Segundo apellido">
									<Input value={values.cliente_apellido2} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_apellido2"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_nif" label="NIF">
									<Input value={values.cliente_nif} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_nif"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_email" label="Correo electrónico">
									<Input value={values.cliente_email} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_email"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="cliente_telefono" label="Teléfono">
									<Input value={values.cliente_telefono} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="cliente_telefono"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="ind_acepta_emailComercial"
									label="Admite el envío de emails comerciales">
									<Checkbox checked={values.ind_acepta_emailcomercial} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="ind_acepta_emailComercial"/>
							</Col></Row>
						</Col>
						<Col span={12}>
							<Row><Col><h2>Datos de Entidad</h2></Col></Row>
							<Row><Col>
								<Form.Item name="codentidad_cbim" label="Código entidad">
									<Input value={values.codentidad_cbim} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="codentidad_cbim"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="nomentidad_cbim" label="Razón Social">
									<Input value={values.nomentidad_cbim} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="nomentidad_cbim"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_nif" label="NIF">
									<Input value={values.entidad_nif} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="entidad_nif"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_tipo" label="Tipo de entidad">
									<Input value={values.entidad_tipo} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="entidad_tipo"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_telefono" label="Teléfono">
									<Input value={values.entidad_telefono} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="entidad_telefono"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="direccion" label="Dirección">
									<Input value={values.direccion} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="direccion"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="poblacion" label="Ciudad">
									<Input value={values.poblacion} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="poblacion"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="codigo_postal" label="CP">
									<Input value={values.codigo_postal} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="codigo_postal"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="provincia" label="Provincia">
									<Input value={values.provincia} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="provincia"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_email" label="Correo electrónico">
									<Input value={values.entidad_email} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="entidad_email"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="coddelegado" label="Código delegado">
									<Input value={values.coddelegado} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="coddelegado"/>
							</Col></Row>
							<Row><Col>
								<Form.Item name="nombre_delegado" label="Nombre delegado">
									<Input value={values.nombre_delegado} disabled="true"/>
								</Form.Item>
								<ErrorMessage component="div" name="nombre_delegado"/>
							</Col></Row>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={12}>
							<Button type="primary">Cancelar</Button>
						</Col>
						<Col span={12}>
							<Row type="flex" justify="end" gutter={8}>
							<Col><Button type="primary" onClick={() => {
										values.aceptado = false;
										const variables = transformData(values, formData);
										completeTask({ variables, history, taskId, procId });
									 }}>
								Rechazar
							</Button></Col>
							<Col><Button type="primary" htmlType="submit">Validar</Button></Col>
							</Row>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
  );
};

ValidarRegistro.propTypes = {
  completeTask: PropTypes.func.isRequired,
};

export default withRouter(ValidarRegistro);
