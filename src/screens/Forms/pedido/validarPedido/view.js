import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { Form, Row, Col, Button, Input, Select, Divider, Table, Icon, Tooltip } from 'antd';
import { transformData, selectTaskVariable } from '../../lib';
import { tableCols } from './data';
import { obtenerValoresIniciales, obtenerValidacionSchema, fechaView } from './lib';
import { EditableTable } from './editableTable';
import './styles.css';

const { Option } = Select;
const { TextArea } = Input;
const validationSchema = Yup.object().shape( obtenerValidacionSchema() );
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
    getTaskVariables({ history, taskId });
    if (!task) {
      fetchTask(taskId);
    }
  }, []);
	useEffect(() => {
		if(taskVariables) {
			let codEntidadCbim = selectTaskVariable(taskVariables, "codentidad_cbim");
			if(codEntidadCbim) {
				loadWholesalersIndas(codEntidadCbim.value);
			}
		}
	}, [ token, taskVariables ]);

  return (
		<Formik
			initialValues={ obtenerValoresIniciales(taskVariables) }
			validationSchema={validationSchema}
			onSubmit={values => {
				values.aceptado = true;
				const variables = transformData(values);
				console.log("Aceptar: ", variables);
				completeTask({ variables, history, taskId, procId });
			}}
			enableReinitialize
		>
			{({ values, handleSubmit, errors }) => (
				<Form 
					onSubmit={handleSubmit} 
					olon={false} 
					className="form-indas">
					<h2 className="form-indas-main-title">Gestionar incidencia en pedido</h2>
					<Row>
						<Col span={24}>
							<span class="label-title-indas">Cliente</span>
							{values.codcli_cbim} - {values.nomcli_cbim}
						</Col>
						<Col span={24}>
							<Row gutter={8}>
								<Col span={4} className="label-title-indas">Id. Pedido</Col>
								<Col span={4} className="label-title-indas">Fecha</Col>
								<Col span={12} className="label-title-indas">Entidad</Col>
								<Col span={4} className="label-title-indas">Estado</Col>
							</Row>
							<Row gutter={8}>
								<Tooltip title={"id: " + values.origen + "-" + values.drupal_order_id}>
								<Col span={4} className="label-ellipsis-indas">
									{values.origen}-{values.drupal_order_id}
								</Col>
								</Tooltip>
								<Col span={4}>{fechaView(values.fecha_alta)}</Col>
								<Col span={12}>{values.codentidad_cbim} - {values.nomentidad_cbim}</Col>
								<Col span={4}>{values.nomestado}</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<EditableTable columns={tableCols} dataSource={values.items}
							updateData={ (newData) => { values.items = newData; }}/>
					</Row>
					<Row type="flex" justify="left" gutter={16}>
						<Col xs={{span:24}} md={{span:10}}>
							<Form.Item name="codcupon" label="Campaña">
								<Input value={values.codcupon}/>
							</Form.Item>
						</Col>
						<Col xs={{span:24}} md={{span:14}}>
							<Form.Item name="codmayorista" label="Mayorista">
								<Select value={values.codmayorista}>
									{wholesalersIndas.map(item => (
										<Option value={item.codmayorista}>{item.nombre}</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row type="flex" justify="left" gutter={16}>
						<Col span={24}>
							<Form.Item name="mensaje_error" label="Incidencia">
								<TextArea rows={2} disabled="true" value={values.mensaje_error}/>
							</Form.Item>
						</Col>
					</Row>
					<Row type="flex" justify="left" gutter={16}>
						<Col><Button type="link" 
										onClick={() => { 
											console.log("Guardar cambios: ", values); 
								 }}>
							<Icon type="save" />Guardar
						</Button></Col>	
						<Col><Button type="link"
										onClick={() => { 
											console.log("Validar procetaje cambios: ", values); 
								 }}>
							<Icon type="percentage" />Validar
						</Button></Col>	
						<Col><Button type="link"
										onClick={() => { 
											//window.location.reload();
											values = obtenerValoresIniciales(taskVariables);
											console.log("Restablecer valores: ", values); 
								 }}>
							<Icon type="redo" />Restablecer
						</Button></Col>	
					</Row>
					<Divider/>
					<Row type="flex" justify="left" gutter={16}>
						<Col>
							<Button type="primary" onClick={() => {
										console.log("Cancelar");
									 }}>

								Cancelar
							</Button>
						</Col>
						<Col>
							<Button type="primary" onClick={() => {
										console.log("Rechazar");
									 }}>
								Rechazar
							</Button>
						</Col>
						<Col>
							<Button type="primary" onClick={() => {
										console.log("Validar");
									 }}>
								Validar
							</Button>
						</Col>
					</Row>
				</Form>
			)}
		</Formik>
  );
};

ValidarPedido.propTypes = {
  completeTask: PropTypes.func.isRequired,
};

export default withRouter(ValidarPedido);
