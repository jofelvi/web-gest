import React from 'react';
import {Card, Col, Row, Switch, Tag, Tooltip, Modal, Spin, Skeleton } from "antd";
import StatisticsPlanGraphic from "./StatisticsPlanGraphic";
import * as moment from "moment";
import {connect} from "react-redux";
import { fetchPlan, updatePlan } from '../../../modules/planes-compra/actions';
import {find} from "lodash";
import * as api from "../../../modules/planes-compra/api";
const { confirm } = Modal;


const renderDate = (dateStr, record, index) => {
    if ( ! dateStr ) {
        return ( '-' );
    }
    return (
        <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
            <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
        </Tooltip>);
}

class Plan extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: true,
            plan: null,
            savedPlan: null,
            editField: false,
            editLoading: false,
        }
        this.onSavePlan = this.onSavePlan.bind(this)
        this.onSavePlanSuccess = this.onSavePlanSuccess.bind(this)
        this.onSavePlanError = this.onSavePlanError.bind(this)
        this.fetchPlanFailed = this.fetchPlanFailed.bind(this)
        this.fetchPlanSuccess = this.fetchPlanSuccess.bind(this)
        this.editPlan = this.editPlan.bind(this)
    }

    componentDidMount() {
        const { fetchPlan, plan } = this.props;
        fetchPlan( { idcondcomercial: plan.idcondcomercial, error: this.fetchPlanFailed, success: this.fetchPlanSuccess } )
    }

    fetchPlanSuccess( plan ) {
        this.setState( { plan, loading: false, error: false })
    }

    editPlan( field, value ) {
        const { plan } = this.state;
        this.setState( { editField: field, editLoading: true } )
        this.onSavePlan (
            {
                ...plan,
                [ field ]: value,
            }
        )

    }

    fetchPlanFailed( error ) {
        this.setState( { plan: null, error, loading: false })
    }
    onSavePlan( plan ) {
        const { updatePlan } = this.props;
        const deleteKeys = ['nomcli_cbim', 'tipo', 'codcli_cbim', 'coddelegado', 'estado', 'estado2', 'idcliente', 'delegado']
        for( let i in deleteKeys) {
            delete plan[deleteKeys[i]];
        }
        updatePlan( {
            plan: plan,
            success: this.onSavePlanSuccess,
            error: this.onSavePlanError,
        } )
    }
    onSavePlanSuccess( plan ) {
        this.setState({ editLoading: false, error: false, editField: false, plan })
    }
    onSavePlanError( error ) {
        this.setState({ loading: false, error: 'No se ha podido guardar el plan' })
    }
    render() {
        const { savedPlan, error, plan, loading, editField } = this.state;
        const propsPlan = this.props.plan;
        if ( loading ) {
            return (<Skeleton />);
        }

        if ( ! plan ) {
            return (<p>Ha ocurrido un error al cargar el plan.</p>)
        }
        return (
            <Row>
                <Col span={ 10 }>
                    <span style={{ fontSize:'18px', color: '#1890ff'}}>{ plan.nombre }</span>
                    <br />
                    <StatisticsPlanGraphic plan={propsPlan}/>

                    <Card style={{ margin: '0', padding: '0px', width: '100%', float: 'right', marginTop:'-50px', textAlign: 'left' }} bordered={false}>
                        <span style={{ fontSize: '38px', color: '#1890FF'}}> { propsPlan.udscompradas } </span>
                        <br />
                        <b style={{ fontSize: '16px', color: '#1890FF' }}>Uds. Compradas</b><br /><br />
                    </Card>
                </Col>
                <Col span={ 14 } style={{ textAlign: 'right' }}>
                    <span style={{ fontSize:'14px', color: '#1890ff', marginRight: '10px' }}>{ renderDate(propsPlan.fechainicio) } - { renderDate(propsPlan.fechafin) }</span>
                    { propsPlan.idestado === 1 ? (<Tag color="green">Activo</Tag>) : (<Tag color="red">Inactivo</Tag>) }
                    <br />
                    <Row gutter={16}>
                        <Col span={14}>
                            <Card style={{ margin: '8px', padding: '0px', width: '100%', float: 'right', textAlign: 'center' }}>
                                <span style={{ fontSize: '34px'}}> { propsPlan.descuento } % </span>
                                <br />
                                <b>Descuento</b><br /><br />
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card style={{ margin: '8px', padding: '0px', width: '100%', float: 'right', textAlign: 'center' }}>
                                <span style={{ fontSize: '34px'}}> { propsPlan.udsmaximas } </span>
                                <br />
                                <b>Compromiso</b><br /><br />
                            </Card>
                        </Col>


                        <Col span={10} offset={14}>
                            <Card border={false} style={{ margin: '8px', padding: '0px', width: '100%', float: 'right', textAlign: 'center' }}>
                                <span style={{ fontSize: '34px'}}> { propsPlan.margen } % </span>
                                <br />
                                <b>Margen</b><br /><br />
                            </Card>
                        </Col>

                        <Col span={24}>
                            <div style={{ textAlign:'right', paddingRight: '20px'}}>
                                { editField == 'ind_regularizacion' ? (<Spin />) : (
                                    <React.Fragment>
                                        <label style={{display: 'inline-block', marginTop:'35px', marginRight: '10px'}}>Forzar Mercancía Pendiente</label>

                                        <Switch
                                            checkedChildren="Si" unCheckedChildren="No"
                                            value={ plan.ind_regularizar }
                                            defaultChecked={ plan.ind_regularizar }
                                            checked={ plan.ind_regularizar }
                                            onChange={ ( value) => {
                                                const accion = ( value === true ) ? 'activar' : 'desactivar';
                                                confirm( {
                                                    title: 'Confirmación requerida.',
                                                    content: `¿Desea ${ accion } la Forzar Mercancía Pendiente en el plan ${ plan.nombre } ?`,
                                                    onOk: () => ( this.editPlan( 'ind_regularizar', value ) )
                                                }) } }
                                        />
                                    </React.Fragment>
                                )}
                                <br />
                                { editField == 'ind_renovar' ? (<Spin />) : (
                                    <React.Fragment>
                                        <label style={{display: 'inline-block', marginTop:'35px', marginRight: '10px'}}>Renovación Automática</label>
                                        <Switch
                                            checkedChildren="Si" unCheckedChildren="No"
                                            value={ plan.ind_renovar }
                                            defaultChecked={ plan.ind_renovar }
                                            checked={ plan.ind_renovar }
                                            onChange={ ( value) => {
                                                const accion = ( value === true ) ? 'activar' : 'desactivar';
                                                confirm( {
                                                    title: 'Confirmación requerida.',
                                                    content: `¿Desea ${ accion } la Renovación Automática en el plan ${ plan.nombre } ?`,
                                                    onOk: () => ( this.editPlan( 'ind_renovar', value ) )
                                                }) } }
                                        />
                                    </React.Fragment>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} style={{marginBottom: '32px'}}>
                    { error && (<p style={{ color: 'red' } }>Ha ocurrido un error al cargar el plan.</p>)}
                </Col>
            </Row>
        );
    }
}

export default  connect(
    state => ({
    }),
    { fetchPlan, updatePlan }
)( Plan );
