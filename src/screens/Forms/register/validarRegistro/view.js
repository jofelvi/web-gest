import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Form, Input, Checkbox, Row, Col, Button } from 'antd';

import { selectTaskVariable } from '../../lib';

const validationSchema = Yup.object().shape({
	// Datos del cliente
	codcli_cbim:       Yup.string().required(),
	nomcli_cbim:       Yup.string().required(),
	cliente_nombre:    Yup.string().required(),
	cliente_apellido1: Yup.string().required(),
	// Datos de la entidad
	codentidad_cbim:   Yup.string().required(),
	nomentidad_cbim:   Yup.string().required(),
});

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
			initialValues={{
				codcli_cbim: 
					taskVariables && selectTaskVariable(taskVariables, 'codcli_cbim')
						? selectTaskVariable(taskVariables, 'codcli_cbim').value
						: '',
				nomcli_cbim:
					taskVariables && selectTaskVariable(taskVariables, 'nomcli_cbim')
						? selectTaskVariable(taskVariables, 'nomcli_cbim').value
						: '',
				cliente_nombre:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_nombre')
						? selectTaskVariable(taskVariables, 'cliente_nombre').value
						: '',
				cliente_apellido1:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_apellido1')
						? selectTaskVariable(taskVariables, 'cliente_apellido1').value
						: '',
				cliente_apellido2:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_apellido2')
						? selectTaskVariable(taskVariables, 'cliente_apellido2').value
						: '',
				cliente_email:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_email')
						? selectTaskVariable(taskVariables, 'cliente_email').value
						: '',
				cliente_telefono:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_telefono')
						? selectTaskVariable(taskVariables, 'cliente_telefono').value
						: '',
				cliente_nif:
					taskVariables && selectTaskVariable(taskVariables, 'cliente_nif')
						? selectTaskVariable(taskVariables, 'cliente_nif').value
						: '',
				ind_acepta_newsletter:
					taskVariables && selectTaskVariable(taskVariables, 'ind_acepta_newsletter')
						? selectTaskVariable(taskVariables, 'ind_acepta_newsletter').value
						: false,
				ind_acepta_emailcomercial:
					taskVariables && selectTaskVariable(taskVariables, 'ind_acepta_emailcomercial')
						? selectTaskVariable(taskVariables, 'ind_acepta_emailcomercial').value
						: false,
				codentidad_cbim:
					taskVariables && selectTaskVariable(taskVariables, 'codentidad_cbim')
						? selectTaskVariable(taskVariables, 'codentidad_cbim').value
						: '',
				nomentidad_cbim:
					taskVariables && selectTaskVariable(taskVariables, 'nomentidad_cbim')
						? selectTaskVariable(taskVariables, 'nomentidad_cbim').value
						: '',
				dir_via:
					taskVariables && selectTaskVariable(taskVariables, 'dir_via')
						? selectTaskVariable(taskVariables, 'dir_via').value
						: '',
				dir_cp:
					taskVariables && selectTaskVariable(taskVariables, 'dir_cp')
						? selectTaskVariable(taskVariables, 'dir_cp').value
						: '',
				dir_poblacion:
					taskVariables && selectTaskVariable(taskVariables, 'dir_poblacion')
						? selectTaskVariable(taskVariables, 'dir_poblacion').value
						: '',
				dir_provincia:
					taskVariables && selectTaskVariable(taskVariables, 'dir_provincia')
						? selectTaskVariable(taskVariables, 'dir_provincia').value
						: '',
				entidad_email:
					taskVariables && selectTaskVariable(taskVariables, 'entidad_email')
						? selectTaskVariable(taskVariables, 'entidad_email').value
						: '',
				entidad_telefono:
					taskVariables && selectTaskVariable(taskVariables, 'entidad_telefono')
						? selectTaskVariable(taskVariables, 'entidad_telefono').value
						: '',
				entidad_nif:
					taskVariables && selectTaskVariable(taskVariables, 'entidad_nif')
						? selectTaskVariable(taskVariables, 'entidad_nif').value
						: '',
				entidad_tipo:
					taskVariables && selectTaskVariable(taskVariables, 'entidad_tipo')
						? selectTaskVariable(taskVariables, 'entidad_tipo').value
						: '',
				coddelegado:
					taskVariables && selectTaskVariable(taskVariables, 'coddelegado')
						? selectTaskVariable(taskVariables, 'coddelegado').value
						: '',
			}}
			onSubmit={values => {
				const variables = [];
				Object.entries(values).map(value => {
					const taskVariable = {
						name: value[0],
						value: value[1],
						type: `${(typeof value[1])
							.charAt(0)
							.toUpperCase()}${(typeof value[1]).slice(1)}`,
						transient: false,
					};
					return variables.push(taskVariable);
				});
				completeTask({ variables, history, taskId, procId });
			}}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ values, handleSubmit, handleChange, handleBlur }) => (
				<Form onSubmit={handleSubmit} colon="false">
					<Row type="flex" justify="left" gutter={8}>
						<Col span={12}>
							<Row><Col><h2>Datos de Cliente</h2></Col></Row>
							<Row><Col>
								<Form.Item label="Código CBIM">
									<Input value={values.codcli_cbim} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Nombre CBIM">
									<Input value={values.nomcli_cbim} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Nombre">
									<Input value={values.cliente_nombre} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Primer apellido">
									<Input value={values.cliente_apellido1} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Segundo apellido">
									<Input value={values.cliente_apellido2} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="NIF">
									<Input value={values.cliente_nif} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Correo electrónico">
									<Input value={values.cliente_email} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Teléfono">
									<Input value={values.cliente_telefono} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Admite el envío de emails comerciales">
									<Checkbox checked={values.ind_acepta_emailcomercial} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Desea recibir la publicación Newsletter">
									<Checkbox checked={values.ind_acepta_newsletter} disabled="true"/>
								</Form.Item>
							</Col></Row>
						</Col>
						<Col span={12}>
							<Row><Col><h2>Datos de Entidad</h2></Col></Row>
							<Row><Col>
								<Form.Item label="Código entidad">
									<Input value={values.codentidad_cbim} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Razón Social">
									<Input value={values.nomentidad_cbim} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="NIF">
									<Input value={values.entidad_nif} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Tipo de entidad">
									<Input value={values.entidad_tipo} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Teléfono">
									<Input value={values.entidad_telefono} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Dirección">
									<Input value={values.dir_via} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Ciudad">
									<Input value={values.dir_poblacion} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="CP">
									<Input value={values.dir_cp} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Provincia">
									<Input value={values.dir_provincia} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Correo electrónico">
									<Input value={values.entidad_email} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item label="Código delegado">
									<Input value={values.coddelegado} disabled="true"/>
								</Form.Item>
							</Col></Row>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={24}>
							<Button type="primary" htmlType="submit">Validar</Button>
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
