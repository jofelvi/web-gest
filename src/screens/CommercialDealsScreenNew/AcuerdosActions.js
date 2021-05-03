import React from 'react'
import {connect} from 'react-redux'
import {Button, Dropdown, Menu, message, Modal, Spin} from 'antd'
import {DownOutlined, ExclamationCircleOutlined, ExportOutlined} from "@ant-design/icons"
import {Link, withRouter} from 'react-router-dom'
import {find} from 'lodash'
import * as api from '../../modules/planes-compra/api'
import {updatePlans} from '../../modules/planes-compra/actions'
import {IFrame} from '../../screens/CommercialDealsScreen/PlanesCompra/components/IFrame'

const {confirm} = Modal

class AcuerdosActions extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			exportLoading: false,
			loading: false,
			filters: {},
			avanceTitle: null,
			avanceContent: null,
		}
		this.updatePlans = this.updatePlans.bind(this)
		this.renovePlans = this.renovePlans.bind(this)
		this.successUpdate = this.successUpdate.bind(this)
		this.errorUpdate = this.errorUpdate.bind(this)
		this.confirmUpdatePlans = this.confirmUpdatePlans.bind(this)
		this.confirmRenovePlans = this.confirmRenovePlans.bind(this)
		this.avancePlan = this.avancePlan.bind(this)
	}

	confirmRenovePlans() {
		const {selectedRowKeys} = this.props
		const planes = selectedRowKeys.join(', ')
		const messageContent = selectedRowKeys.length > 0 ? `¿Desea renovar los planes ${planes}?`
			: `¿Desea renovar el plan ${planes}?`
		confirm({
			title: `Confirmar acción`,
			icon: <ExclamationCircleOutlined/>,
			content: messageContent,
			onOk: () => {
				this.renovePlans()
			},
			onCancel() {
			},
		})

	}

	confirmUpdatePlans(keyName, valueName, key, value) {
		const {selectedRowKeys} = this.props
		console.log(selectedRowKeys)

	}

	renovePlans() {
		const {updatePlans, selectedRowKeys} = this.props
		this.setState({loading: 'renovar'})
		updatePlans({
			change: {},
			action: 'renovar',
			plansIds: selectedRowKeys,
			success: this.successUpdate,
			error: this.errorUpdate
		})
	}

	updatePlans(key, value) {
		const {updatePlans, selectedRowKeys} = this.props
		this.setState({loading: key})
		updatePlans({
			change: {[key]: value},
			plansIds: selectedRowKeys,
			success: this.successUpdate,
			error: this.errorUpdate
		})
	}

	successUpdate() {
		this.setState({loading: false})
		this.props.updateSelectedRowKeys([])
		message.success(
			'Cambio aplicado correctamente.',
		)
	}

	avancePlan() {
		const {plans, selectedRowKeys} = this.props
		if (selectedRowKeys.length != 1) {
			return
		}
		const plan = find(plans, {idcondcomercial: selectedRowKeys[0]})
		const idcliente = plan.idcliente
		this.setState({loading: 'avance'})
		api.avanceCliente(idcliente, (e) => {
			const cssHref = `<link type="text/css" rel="Stylesheet" href="/assets/avance.css" />`
			const avanceContent = `${cssHref}${e.target.responseText}`
			const avanceTitle = `${plan.codcli_cbim} - ${plan.nomcli_cbim}`
			this.setState({loading: false, avanceContent, avanceTitle})
		})
	}

	errorUpdate(e) {
		this.setState({loading: false})
		alert("No se ha podido realizar la operación. ")
		console.log('Error:', e)
	}


	render() {
		const {exportLoading, loading} = this.state
		const {selectedRowKeys, history, filters} = this.props
		return (

			<div className="table-actions">
				<div className="table-action-button">
					<Button style={{marginLeft: '10px', marginRight: '10px'}} type="primary" onClick={() => {
						history.push('/acuerdos-comerciales/crear')
					}}>
						Nuevo
					</Button>
					<Button
						type="link"
						style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0}}
						onClick={
							() => {
								this.setState({exportLoading: true})
								api.exportPlans(filters, () => {
									this.setState({exportLoading: false})
								})
							}
						}
					>
						{exportLoading ? <Spin/> : <ExportOutlined style={{fontSize: '20px'}}/>}
					</Button>
					{
						selectedRowKeys.length == 1 && (
							<React.Fragment>

								<Link
									to={{
										pathname: `/acuerdos-comerciales/${selectedRowKeys[0]}/editar`,
										search: "editar",
									}}
								>
									<Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}
										/*onClick={() => {
										this.props.history.push(`/acuerdos-comerciales/${selectedRowKeys[0]}/editar`)}}*/
									>
										Editar
									</Button>
								</Link>
								<Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}
										onClick={() => {
											this.props.history.push(`/acuerdos-comerciales/${selectedRowKeys[0]}/copiar`)
										}}>
									Copiar
								</Button>

								<Modal
									style={{
										minWidth: '1200px', width: '80%',
										height: '800px', padding: 0
									}}
									className="unpadded-modal"
									title={this.state.avanceTitle}
									visible={this.state.avanceContent != null}
									onCancel={() => {
										this.setState({avanceContent: null})
									}}
									footer={[
										<Button key="back" onClick={() => {
											this.setState({avanceContent: null})
										}}>
											Cerrar
										</Button>
									]}
								>
									<IFrame style={{width: '100%', minHeight: '600px', border: 'none'}}>
										<div dangerouslySetInnerHTML={{__html: this.state.avanceContent}}>
										</div>
									</IFrame>
								</Modal>

							</React.Fragment>
						)
					}
					{
						selectedRowKeys.length >= 1 && (
							<React.Fragment>
								<Dropdown overlay={(
									<Menu>
										<Menu.Item key="1" onClick={() => {
											this.confirmUpdatePlans('Estado', 'Activo', 'idestado', '1')
										}}>
											Activo
										</Menu.Item>
										<Menu.Item key="2" onClick={() => {
											this.confirmUpdatePlans('Estado', 'Inactivo', 'idestado', '2')
										}}>
											Inactivo
										</Menu.Item>
									</Menu>
								)}>
									<Button disabled={loading} type="link"
											style={{marginLeft: '0px', marginRight: '0px'}}>
										{loading == 'idestado' ? <Spin/> : 'Cambiar a'} <DownOutlined/>
									</Button>
								</Dropdown>

							</React.Fragment>
						)

					}

				</div>

				{selectedRowKeys.length > 0 && (
					<div style={{width: '200px', paddingTop: '20px', float: 'right'}}>{selectedRowKeys.length} fila(s)
						seleccionada(s).</div>)}
			</div>
		)
	}

}

export default connect(
	state => ({}),
	{updatePlans}
)(withRouter(AcuerdosActions))