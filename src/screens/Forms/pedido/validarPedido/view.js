import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { Form, Row, Col, Button, Input, Select, Divider, Table, Icon } from 'antd';
import { transformData, selectTaskVariable } from '../../lib';
import { tableCols } from './data';
import { obtenerValoresIniciales, obtenerValidacionSchema } from './lib';
import { EditableFormRow, EditableCell } from './editableRow';
import './styles.css';

const { Option } = Select;
const { TextArea } = Input;
const tableComponents = {
	body: {
		row: EditableFormRow,
		cell: EditableCell,
	},
};
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
					<Row type="flex" justify="left">
						<Col span={24}>
							<b>Cliente:&nbsp;</b>{values.codcli_cbim} - {values.nomcli_cbim}
						</Col>
					</Row>
					<Row type="flex" justify="left" gutter={8}>
						<Col span={4}><b>Id. Pedido</b></Col>
						<Col span={4}><b>Fecha</b></Col>
						<Col span={12}><b>Entidad</b></Col>
						<Col span={4}><b>Estado</b></Col>
					</Row>
					<Row type="flex" justify="left" gutter={8}>
						<Col span={4} className="ant-table-row-cell-ellipsis">
							{values.origen}-{values.drupal_order_id}</Col>
						<Col span={4}>{values.fecha_alta}</Col>
						<Col span={12}>{values.codentidad_cbim} - {values.nomentidad_cbim}</Col>
						<Col span={4}>{values.nomestado}</Col>
					</Row>
					<Row type="flex" justify="left" gutter={16}>
						<Table columns={tableCols.map(col => {
															if (!col.editable) {
																return col;
															}
															return {
																...col,
																onCell: record => ({
																	record,
																	editable: col.editable,
																	dataIndex: col.dataIndex,
																	title: col.title,
																	handleSave: row => {
																		let lineas = values.items;
																		console.log("Salvando fila ", row);
																		console.log("Salvando lineas ", lineas);
																		values.lineas = lineas.map(linea => {
																			return linea.codindas == row.codindas? row: linea;
																		});
																		console.log("Salvando values ", values.lineas);
																	}
																}),
															};
														})}
							className="table-indas"
							dataSource={values.items} 
							components={tableComponents}
							borderred
							pagination={{ pageSize: 4 }}/>
					</Row>
					<Row type="flex" justify="left" gutter={16}>
						<Col xs={{span:24}} md={{span:10}}>
							<Form.Item name="codcupon" label="Campaña">
								<Input value={values.codcupon}/>
							</Form.Item>
						</Col>
						<Col xs={{span:24}} md={{span:14}}>
							<Form.Item name="codmayorista" label="Mayorista">
								<Select defaultValue={values.codmayorista}>
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
						<Col><Button type="link" onClick={() => { console.og("Guardar cambios"); }}>
							<Icon type="save" />Guardar
						</Button></Col>	
						<Col><Button type="link" onClick={() => { console.og("Validar descuentos"); }}>
							<Icon type="percentage" />Validar
						</Button></Col>	
						<Col><Button type="link" onClick={() => { console.og("Restablecer valores"); }}>
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
