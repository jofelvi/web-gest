import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button, Spin, Dropdown, Menu, message, Modal, Space} from 'antd';
import * as moment from "moment";
import {DownOutlined, ExportOutlined} from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import * as api from './../../../../modules/planes-compra/api';
import { updatePlans  } from '../../../../modules/planes-compra/actions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as download from "downloadjs";
import { IFrame } from './IFrame'

const { confirm } = Modal;

class PlanesCompraActions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exportLoading: false,
            loading: false,
            filters: {},
            avanceContent: null,
        }
        this.updatePlans = this.updatePlans.bind(this)
        this.renovePlans = this.renovePlans.bind(this)
        this.successUpdate = this.successUpdate.bind( this )
        this.errorUpdate = this.errorUpdate.bind( this )
        this.confirmUpdatePlans = this.confirmUpdatePlans.bind ( this )
        this.confirmRenovePlans = this.confirmRenovePlans.bind ( this )
        this.avancePlan = this.avancePlan.bind( this )
    }

    confirmRenovePlans( ) {
        const {selectedRowKeys} = this.props;
        const planes = selectedRowKeys.join(', ')
        const messageContent = selectedRowKeys.length > 0 ? `¿Desea renovar los planes ${planes}?`
            : `¿Desea renovar el plan ${planes}?`;
        confirm({
            title: `Confirmar acción`,
            icon: <ExclamationCircleOutlined />,
            content: messageContent,
            onOk: () => {
                this.renovePlans()
            },
            onCancel() {
            },
        });

    }

    confirmUpdatePlans( keyName, valueName, key, value ) {
        const {selectedRowKeys} = this.props;
        const planes = selectedRowKeys.join(', ')
        const messageContent = selectedRowKeys.length > 0 ? `¿Desea cambiar \'${keyName}\' de los planes ${planes} a \'${valueName}\'?`
            : `¿Desea cambiar \'${keyName}\' del plan ${planes} a \'${valueName}\'?`;
        confirm({
            title: `Confirmar acción`,
            icon: <ExclamationCircleOutlined />,
            content: messageContent,
            onOk: () => {
                this.updatePlans( key, value )
            },
            onCancel() {
            },
        });

    }
    renovePlans( ) {
        const { updatePlans, selectedRowKeys } = this.props;
        this.setState({loading: 'renovar' })
        updatePlans ( { change: { } , action: 'renovar', plansIds: selectedRowKeys, success: this.successUpdate, error: this.errorUpdate } );
    }

    updatePlans( key, value ) {
        const { updatePlans, selectedRowKeys } = this.props;
        this.setState({loading: key})
        updatePlans ( { change: { [key]: value}, plansIds: selectedRowKeys, success: this.successUpdate, error: this.errorUpdate } );
    }

    successUpdate () {
        this.setState({loading: false})
        this.props.updateSelectedRowKeys([])
        message.success(
            'Cambio aplicado correctamente.',
        )
    }

    avancePlan() {
        const { plans, selectedRowKeys } = this.props;
        if ( selectedRowKeys.length != 1 ) {
            return;
        }
        const plan = find( plans, { idcondcomercial: selectedRowKeys[ 0 ] } );
        console.log(' AVANZING PLAN', plan)
        const idcliente = plan.idcliente;
        this.setState({loading: 'avance'})
        api.avanceCliente( idcliente, (e) => {
            const cssHref = `<link type="text/css" rel="Stylesheet" href="/assets/avance.css" />`;
            const avanceContent = `${cssHref}${e.target.responseText}`;
            this.setState({loading: false, avanceContent: avanceContent }, () => {
                console.log('STATE SET', this.state)
            })
        } )
    }

    errorUpdate (e) {
        this.setState({loading: false})
        alert("No se ha podido realizar la operación. "+e)
    }


    render() {
        const { exportLoading, loading } = this.state
        const { selectedRowKeys, history, filters } = this.props
        return (

            <div className="table-actions">
                <div className="table-action-button">
                    <Button style={{marginLeft: '10px', marginRight: '10px'}} type="primary" onClick={() => {
                        history.push('/planes-de-compra/crear')
                    }}>
                        Nuevo
                    </Button>
                    <Button
                        type="link"
                        style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0}}
                        onClick={
                            () => {
                                this.setState({exportLoading: true})
                                api.exportPlans( filters , () => {
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
                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                                    this.props.history.push(`/planes-de-compra/${selectedRowKeys[0]}/editar`)
                                }}>
                                    Editar
                                </Button>
                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}
                                        onClick={() => {
                                            this.props.history.push(`/planes-de-compra/${selectedRowKeys[0]}/copiar`)
                                }}>
                                    Copiar
                                </Button>
                                <Button type="link" disabled={loading == 'avance'} style={{marginLeft: '0px', marginRight: '0px'}} onClick={ this.avancePlan } >
                                    { loading == 'avance' ? <Spin /> : 'Avance' }
                                </Button>
                                <Modal
                                    width={800} height={800}
                                    title="Avance"
                                    visible={this.state.avanceContent != null}
                                    onClose={() => { this.setState({avanceContent: null}) }}
                                    footer={[
                                        <Button key="back" onClick={() => { this.setState({avanceContent: null}) }}>
                                            Cerrar
                                        </Button>
                                    ]}
                                >
                                    <IFrame style={{width:'100%', minHeight: '600px', border: 'none'}}>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.avanceContent }}>
                                        </div>
                                    </IFrame>
                                </Modal>

                            </React.Fragment>
                        )
                    }
                    {
                        selectedRowKeys.length >= 1 && (
                            <React.Fragment>
                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}
                                        onClick={() => { this.confirmRenovePlans() }}>
                                    Renovar
                                </Button>
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item key="1" onClick={() => { this.confirmUpdatePlans( 'Estado', 'Activo', 'idestado', '1') }}>
                                            Activo
                                        </Menu.Item>
                                        <Menu.Item key="2" onClick={() => { this.confirmUpdatePlans( 'Estado', 'Inactivo', 'idestado', '2') }}>
                                            Inactivo
                                        </Menu.Item>
                                    </Menu>
                                )}>
                                    <Button disabled={ loading } type="link" style={{marginLeft: '0px', marginRight: '0px'}}>
                                        { loading == 'idestado' ? <Spin /> : 'Cambiar a' } <DownOutlined/>
                                    </Button>
                                </Dropdown>

                                <Dropdown overlay={(
                                    <Menu >
                                        <Menu.Item key="1_reg" onClick={() => { this.confirmUpdatePlans( 'Renovación Aut.', 'Activo', 'ind_renovar', true) }}>
                                            Activar
                                        </Menu.Item>
                                        <Menu.Item key="2_reg" onClick={() => { this.confirmUpdatePlans( 'Renovación Aut.', 'Inactivo', 'ind_renovar', false) }}>
                                            Desactivar
                                        </Menu.Item>
                                    </Menu>
                                )}>
                                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}>
                                        { loading == 'ind_renovar' ? <Spin /> : 'Renovación Aut.' } <DownOutlined/>
                                    </Button>
                                </Dropdown>


                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item key="1" onClick={() => { this.confirmUpdatePlans( 'Regularización Aut.', 'Activo', 'ind_regularizar', true) }}>
                                            Activar
                                        </Menu.Item>
                                        <Menu.Item key="2" onClick={() => { this.confirmUpdatePlans( 'Regularización Aut.', 'Inactivo', 'ind_regularizar', false) }}>
                                            Desactivar
                                        </Menu.Item>
                                    </Menu>
                                )}>
                                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}}>
                                        { loading == 'ind_regularizar' ? <Spin /> : 'Regularización Aut.' } <DownOutlined/>
                                    </Button>
                                </Dropdown>
                            </React.Fragment>
                        )

                    }

                </div>
            </div>
        );
    };

}

export default  connect(
    state => ({
    }),
    { updatePlans }
)( withRouter(PlanesCompraActions) );
