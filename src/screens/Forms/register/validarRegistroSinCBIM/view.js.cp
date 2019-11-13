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
				<Form layout="inline" colon={false}>
					<Row type="flex" justify="center" align="top" gutter={8, 16}>
						<Col span={8}><h2>Validar Alta de Cliente</h2></Col>
						<Col span={16}>
								<Form.Item name="codcli_cbim" label="Código Cliente"
									required={true} whitespace={true}>
									<Input/>
									<ErrorMessage component="div" name="codcli_cbim"/>
								</Form.Item>
								<Form.Item name="codentidad_cbim" label="Código Entidad"
									required={true} whitespace={true}>
									<Input/>
									<ErrorMessage component="div" name="codentidad_cbim"/>
								</Form.Item>
								<Form.Item>
									<Button icon="search" onClick={() => {
											console.log("buscar");
										}}>
										Buscar</Button>
								</Form.Item>
						</Col>
					</Row>
					<Row type="flex" justify="center" align="top" gutter={8, 8}>
						<Col span={4}></Col>
						<Col span={10}><h3>Formulario en transferindas</h3></Col>
						<Col span={10}><h3>Formulario en CBIM</h3></Col>
					</Row>
					<Row type="flex" justify="left" align="middle" gutter={8, 8}>
						<Col span={4}>Datos de Cliente</Col>
						<Col span={10}> // Datos en transferindas
              <Row><Col>
                <Form.Item name="cliente_nombre" label="Nombre">
                  <Input value={values.cliente_nombre} disabled="true"/>
                </Form.Item>
              <Row><Col>
              </Col></Row>
                <Form.Item name="cliente_apellido1" label="Primer apellido">
                  <Input value={values.cliente_apellido1} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_apellido2" label="Segundo apellido">
                  <Input value={values.cliente_apellido2} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_nif" label="NIF">
                  <Input value={values.cliente_nif} disabled="true"/>
                </Form.Item>
              </Col></Row>
							<Row><Col>
                <Form.Item name="cliente_email" label="Correo electrónico">
                  <Input value={values.cliente_email} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_telefono" label="Teléfono">
                  <Input value={values.cliente_telefono} disabled="true"/>
                </Form.Item>
              </Col></Row>
						</Col>
						<Col span={10}> <!-- Datos en CBIM -->
              <Row><Col>
                <Form.Item name="cliente_nombre" label="Nombre">
                  <Input value={values.cliente_nombre} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_apellido1" label="Primer apellido">
                  <Input value={values.cliente_apellido1} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_apellido2" label="Segundo apellido">
                  <Input value={values.cliente_apellido2} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_nif" label="NIF">
                  <Input value={values.cliente_nif} disabled="true"/>
                </Form.Item>
              </Col></Row>
							<Row><Col>
                <Form.Item name="cliente_email" label="Correo electrónico">
                  <Input value={values.cliente_email} disabled="true"/>
                </Form.Item>
              </Col></Row>
              <Row><Col>
                <Form.Item name="cliente_telefono" label="Teléfono">
                  <Input value={values.cliente_telefono} disabled="true"/>
                </Form.Item>
              </Col></Row>
						</Col>
					</Row>
					<Row type="flex" justify="left" align="middle" gutter={8, 8}>
						<Col span={4}>Entidad Principal</Col>
						<Col span={10}>
             <Row><Col>
                <Form.Item name="nomentidad_cbim" label="Razón Social">
                  <Input value={values.nomentidad_cbim} disabled="true"/>
                </Form.Item>
              </Col></Row>
							<Row><Col>
								<Form.Item name="entidad_nif" label="NIF">
									<Input value={values.entidad_nif} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_tipo" label="Tipo de entidad">
									<Radio.Group value={values.entidad_tipo}>
										<Radio value='FARMACIA' disabled="true">Farmacia</Radio>
										<Radio value='SOCIEDAD' disabled="true">Sociedad</Radio>
									</Radio.Group>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_telefono" label="Teléfono">
									<Input value={values.entidad_telefono} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_email" label="Correo electrónico">
									<Input value={values.entidad_email} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="direccion" label="Direccion">
									<Input value={values.direccion} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="codigo_postal" label="Código Postal">
									<Input value={values.codigo_postal} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="poblacion" label="Ciudad">
									<Input value={values.poblacion} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="provincia" label="Provincia">
									<Input value={values.provincia} disabled="true"/>
								</Form.Item>
							</Col></Row>
						</Col>
						<Col span={10}>
             <Row><Col>
                <Form.Item name="nomentidad_cbim" label="Razón Social">
                  <Input value={values.nomentidad_cbim} disabled="true"/>
                </Form.Item>
              </Col></Row>
							<Row><Col>
								<Form.Item name="entidad_nif" label="NIF">
									<Input value={values.entidad_nif} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_tipo" label="Tipo de entidad">
									<Radio.Group value={values.entidad_tipo}>
										<Radio value='FARMACIA' disabled="true">Farmacia</Radio>
										<Radio value='SOCIEDAD' disabled="true">Sociedad</Radio>
									</Radio.Group>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_telefono" label="Teléfono">
									<Input value={values.entidad_telefono} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="entidad_email" label="Correo electrónico">
									<Input value={values.entidad_email} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="direccion" label="Direccion">
									<Input value={values.direccion} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="codigo_postal" label="Código Postal">
									<Input value={values.codigo_postal} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="poblacion" label="Ciudad">
									<Input value={values.poblacion} disabled="true"/>
								</Form.Item>
							</Col></Row>
							<Row><Col>
								<Form.Item name="provincia" label="Provincia">
									<Input value={values.provincia} disabled="true"/>
								</Form.Item>
							</Col></Row>
						</Col>
					</Row>
					<Row type="flex" justify="center" align="top" gutter={8, 8}>
           <Col span={12}>
              <Button type="primary" onClick={() => {
									console.log("Cancelar");
								}}>
								Cancelar</Button>
            </Col>
            <Col span={12}>
              <Row type="flex" justify="end" gutter={8}>
								<Col><Button type="primary" onClick={() => {
										console.log("Acpetar")
                   }}>
                Aceptar</Button></Col>
              </Row>
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
