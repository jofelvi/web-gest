import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Button, Skeleton, Col, Row, Select, Spin, List, Descriptions, Card, Tag, Tooltip, Switch, Modal} from 'antd';
import {Maincontainer} from "../../lib/styled";
import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import ClientsForm from './components/Form';
import { getClient } from '../../modules/clients-indas/actions';
import { getClientEntities, getClientStatisticsPurchase, getClientPlans, updateClient, getClientStatisticsPurchaseGroups } from '../../modules/clients-indas/actions';
import { setOrderListState } from '../../modules/orders/actions';
import { setSelectedKeys, setOpenKeys } from '../../modules/menu/actions';
import _ from 'underscore';
import { Line, Pie, RadialBar } from '@ant-design/charts';
import { reduce, find, filter } from 'lodash';
import * as moment from "moment";
import StatisticsPlanGraphic from './components/StatisticsPlanGraphic';
import Plan from './components/Plan';
import Entidades from './components/Entidades';
import { decimalAdjust } from '../../utils';
import { setFilters as setPCFilters } from "../../modules/planes-compra/actions";
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

class ClientsShowScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            clientError: false,
            loadingClient: true,
            loading: true,
            loadingPlans: true,
            loadingEntities: true,
            loadingStatisticsPurchase: true,
            loadingStatisticsPurchaseGroup: true,
            savedPlan: null,
            client: null,
            entities: null,
            plans: null,
            clientSaved: false,
            statisticsPurchaseData: null,
            statisticsPurchaseGroupsData: null,
            statisticsPurchase: null,
            statisticsPurchasePeriod: '1year',
            statisticsPurchaseGroupsPeriod: 'mes',
            statisticsPurchaseColumn: 'unidades',
            statisticsPurchaseGroupsColumn: 'unidades',
        }
        this.fetchClientFailed = this.fetchClientFailed.bind(this)
        this.fetchClientSuccess = this.fetchClientSuccess.bind(this)
        this.fetchClientEntitiesFailed = this.fetchClientEntitiesFailed.bind(this)
        this.fetchClientEntitiesSuccess = this.fetchClientEntitiesSuccess.bind(this)
        this.fetchClientPlansFailed = this.fetchClientPlansFailed.bind(this)
        this.fetchClientPlansSuccess = this.fetchClientPlansSuccess.bind(this)
        this.fetchStatisticsPurchaseFailed = this.fetchStatisticsPurchaseFailed.bind(this)
        this.fetchStatisticsPurchaseSuccess = this.fetchStatisticsPurchaseSuccess.bind(this)
        this.fetchStatisticsPurchaseGroupsFailed = this.fetchStatisticsPurchaseGroupsFailed.bind(this)
        this.fetchStatisticsPurchaseGroupsSuccess = this.fetchStatisticsPurchaseGroupsSuccess.bind(this)
        this.editPlan = this.editPlan.bind(this)
        this.onSaveClient = this.onSaveClient.bind(this)
    }

    componentWillMount(props) {
        const { getClient, getClientEntities, getClientStatisticsPurchase, getClientStatisticsPurchaseGroups, getClientPlans, match } = this.props;
        getClient({ idcliente: match.params.id, success: this.fetchClientSuccess, error: this.fetchClientFailed })
        getClientEntities( { idcliente: match.params.id, success: this.fetchClientEntitiesSuccess, error: this.fetchClientEntitiesFailed } )
        getClientPlans( { idcliente: match.params.id, success: this.fetchClientPlansSuccess, error: this.fetchClientPlansFailed } )
        getClientStatisticsPurchase( { idcliente: match.params.id, success: this.fetchStatisticsPurchaseSuccess, error: this.fetchStatisticsPurchaseFailed } )
        getClientStatisticsPurchaseGroups( { idcliente: match.params.id, success: this.fetchStatisticsPurchaseGroupsSuccess, error: this.fetchStatisticsPurchaseGroupsFailed } )
    }
    onSaveClient( client ) {
        const {match } = this.props;
        this.setState( { loadingClient: true, clientSaved: true, clientError: false, savingClient: client } )
        this.props.updateClient( {
            client: client,
            success: ( data ) => {
                this.setState( { loadingClient: false, client: this.state.savingClient } )
            },
            error: ( ) => {
                this.setState( { clientError: 'No se ha podido guardar el cliente.', loadingClient: false } )
            }
        })
    }
    fetchStatisticsPurchaseSuccess ( statisticsPurchaseData ) {
        this.setState( { statisticsPurchaseData, loadingStatisticsPurchase: false } )
    }

    fetchStatisticsPurchaseFailed( error ) {
        this.setState( { statisticsPurchaseData: null, loadingStatisticsPurchase: false } )
    }
    fetchStatisticsPurchaseGroupsSuccess ( statisticsPurchaseGroupsData ) {
        this.setState( { statisticsPurchaseGroupsData, loadingStatisticsPurchaseGroup: false } )
    }

    fetchStatisticsPurchaseGroupsFailed( error ) {
        this.setState( { statisticsPurchaseGroupsData: null, loadingStatisticsPurchaseGroup: false } )
    }


    fetchClientFailed( error ) {
        this.setState( { clientError: 'No se ha podido cargar el cliente.', loadingClient: false } )
    }
    fetchClientSuccess ( client ) {
        this.setState( { client, loadingClient: false } )
    }

    fetchClientEntitiesFailed( error ) {
        alert("No se han podido cargar las entidades.")
    }
    fetchClientEntitiesSuccess ( entities ) {
        this.setState( { entities, loadingEntities: false } )
    }

    fetchClientPlansFailed( error ) {
        alert("No se han podido cargar los planes.")
    }
    fetchClientPlansSuccess ( plans ) {
        this.setState( { plans, loadingPlans: false } )
    }
    editPlan( field, value ) {
        alert( 'editing '+field+' setting '+value )
    }
    render() {
        const {
            loadingEntities, entities, client, savedPlan, clientError, error, plans, loadingPlans, loadingClient,
            loadingStatisticsPurchaseGroup, statisticsPurchaseGroupsData, statisticsPurchaseGroupsColumn, statisticsPurchaseGroupsPeriod,
            loadingStatisticsPurchase, statisticsPurchaseData, statisticsPurchaseColumn, statisticsPurchasePeriod
        } = this.state;

        const statisticsPurchaseGraphicData = reduce( statisticsPurchaseData, ( result, statisticsRow ) => {
            const monthsAgo = ((new Date()).getFullYear()-statisticsRow.año)*12+((new Date()).getMonth()-statisticsRow.mes)
            let key = '';
            if ( statisticsPurchasePeriod == '1year' && monthsAgo < 13 ) {
                key = statisticsRow.año+'-'+moment(statisticsRow.año+'-'+statisticsRow.mes).startOf('day').format( 'MMM' );
            } else if ( statisticsPurchasePeriod == '5year' ) {
                key = statisticsRow.año;
            }
            const currentResult = find( result, ( resultRow ) => ( resultRow[ statisticsPurchasePeriod] == key )  )
            const accumulatedValue = currentResult ? currentResult[statisticsPurchaseColumn] : 0;
            const incrementedValue = parseInt( statisticsRow[statisticsPurchaseColumn] )
            result = filter( result, ( resultRow ) => ( resultRow[ statisticsPurchasePeriod ] != key ) )
            result.push({
                [statisticsPurchasePeriod]: key,
                [statisticsPurchaseColumn]: accumulatedValue+incrementedValue
            });
            return result;
        }, [] );

        const statisticsPurchaseGroupsGraphicData = reduce( statisticsPurchaseGroupsData, ( result, statisticsRow ) => {
            const monthsAgo = ((new Date()).getFullYear()-statisticsRow.año)*12+((new Date()).getMonth()-statisticsRow.mes)
            let key = '';
            if ( statisticsPurchaseGroupsPeriod == 'mes' && statisticsRow.año === (new Date()).getFullYear() && statisticsRow.mes == (new Date()).getMonth() ) {
                key = statisticsRow.nombre
            } else if ( statisticsPurchaseGroupsPeriod == 'año' && statisticsRow.año == (new Date()).getFullYear() ) {
                key = statisticsRow.nombre;
            } else {
                return result;
            }
            const currentResult = find( result, ( resultRow ) => ( resultRow[ statisticsPurchaseGroupsPeriod] == key )  )
            const accumulatedValue = currentResult ? currentResult[statisticsPurchaseGroupsColumn] : 0;
            const incrementedValue = parseInt( statisticsRow[statisticsPurchaseGroupsColumn] )
            result = filter( result, ( resultRow ) => ( resultRow[ statisticsPurchaseGroupsPeriod ] != key ) )
            result.push({
                ...statisticsRow,
                [statisticsPurchaseGroupsPeriod]: key,
                [statisticsPurchaseGroupsColumn]: accumulatedValue+incrementedValue
            });
            return result;
        }, [] );


        const statisticsPurchaseConfig = {
            data: statisticsPurchaseGraphicData,
            padding: 'auto',
            xField: statisticsPurchasePeriod,
            yField: statisticsPurchaseColumn,
        }
        const statisticsGroupsConfig = {
            appendPadding: 10,
            data: statisticsPurchaseGroupsGraphicData,
            angleField: statisticsPurchaseGroupsColumn,
            colorField: 'nombre',
            radius: 0.9,
            label: {
                type: 'inner',
                offset: '-30%',
                content: function content(_ref) {
                    var percent = decimalAdjust( 'round', _ref.percent * 100, -2 );
                    return ''.concat(percent, '%');
                },
                style: {
                    fontSize: 14,
                    textAlign: 'center',
                },
            },

        }
        return (
        <div>
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/clientes') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Expediente Digital</h2>
                    { ! loadingClient ? (
                       <ClientsForm
                           client={ client }
                           loading={ false }
                           error={ false }
                           show={ this.state.clientSaved }
                           onSave={ this.onSaveClient }
                       />
                    ) : (<Skeleton style={{marginBottom: '10px'}}/>)}
                    { clientError && (<p style={{ color: 'red'}}>Error guardando el cliente.</p>) }
                    <h2 style={{margin: '20px 0 10px 0'}}>Entidades</h2>
                    { loadingEntities ? (<Skeleton />) : (<Entidades history={this.props.history} entities={ entities }/>) }

                </div>
                <div className="table-indas table-indas-new">
                    <Row>
                        <Col span={12} style={{ padding: '0 20px' }}>
                            <h2 style={{margin: '20px 0 10px 0'}}>Ventas
                                <span style={{ fontSize:'12px', float: 'right' }}><a onClick={( ) => {
                                    const { client } = this.state;
                                    if ( client )  {
                                        this.props.setOrderListState({
                                            //cdfilters: { page: 0},
                                            count: 0,
                                            buttonIsvisible: false,
                                            visible: false,
                                            loadingLine: false,
                                            order_id: 0,
                                            expandedKeys: [],
                                            filters: {page: 0, searchByClient: client.codcli_cbim, searchByEntity: client.nomcli_cbim, searchByEntityName: client.nomcli_cbim},
                                        } )
                                        this.props.history.push('/orders')
                                        this.props.setSelectedKeys( { selectedKeys: ["6"] })
                                    }
                                } }>Ver Listado</a></span>
                            </h2>
                            <hr />
                            <h4 style={{margin: '20px 0 10px 0'}}>Volumen de ventas</h4>
                            <Card bordered={ false } style={{ textAlign: 'center'}}>
                                <Select
                                    style={{ marginRight: '30px'}}
                                    key={'select_period'}
                                    value={statisticsPurchasePeriod}
                                    onChange={(statisticsPurchasePeriod) => this.setState({ statisticsPurchasePeriod } ) }
                                >
                                    <Select.Option value={'1year'}>Últimos 12 meses</Select.Option>
                                    <Select.Option value={'5year'}>Últimos 5 años</Select.Option>
                                </Select>
                                <Select
                                    key={'select_data'}
                                    value={statisticsPurchaseColumn}
                                    onChange={(statisticsPurchaseColumn) => this.setState({ statisticsPurchaseColumn } ) }
                                >
                                    <Select.Option value={'unidades'}>Unidades vendidas</Select.Option>
                                    <Select.Option value={'pedidos'}>Pedidos</Select.Option>
                                    <Select.Option value={'totalpvm'}>PVM</Select.Option>
                                </Select>
                                { loadingStatisticsPurchase && (<Skeleton />) }
                                { ! loadingStatisticsPurchase && ( statisticsPurchaseData === null || statisticsPurchaseData.length === 0 ) && (
                                    (
                                        <p>No hay resultados</p>
                                    )
                                ) }
                                { ! loadingStatisticsPurchase && ( statisticsPurchaseData !== null && statisticsPurchaseData.length !== 0 ) && (
                                    (
                                        <Line {...statisticsPurchaseConfig} />
                                    )
                                ) }
                                <hr/>
                            </Card>
                            <br />
                            <hr/>
                            <h4 style={{margin: '20px 0 10px 0'}}>Ventas agrupadas por Grupo</h4>
                            <Card bordered={ false } style={{ textAlign: 'center' }}>
                                <Select
                                    style={{ marginRight: '30px'}}
                                    key={'select_period'}
                                    value={statisticsPurchaseGroupsPeriod}
                                    onChange={(statisticsPurchaseGroupsPeriod) => this.setState({ statisticsPurchaseGroupsPeriod } ) }
                                >
                                    <Select.Option value={'mes'}>Este mes</Select.Option>
                                    <Select.Option value={'año'}>Este año</Select.Option>
                                </Select>
                                <Select
                                    key={'select_data'}
                                    value={statisticsPurchaseGroupsColumn}
                                    onChange={(statisticsPurchaseGroupsColumn) => this.setState({ statisticsPurchaseGroupsColumn } ) }
                                >
                                    <Select.Option value={'unidades'}>Unidades vendidas</Select.Option>
                                    <Select.Option value={'pedidos'}>Pedidos</Select.Option>
                                    <Select.Option value={'totalpvm'}>PVM</Select.Option>
                                </Select>
                                { loadingStatisticsPurchaseGroup && (<Skeleton />) }
                                { ! loadingStatisticsPurchaseGroup && ( statisticsPurchaseGroupsData === null || statisticsPurchaseGroupsData.length === 0 ) && (
                                    (
                                        <p>No hay resultados</p>
                                    )
                                ) }
                                { ! loadingStatisticsPurchaseGroup && ( statisticsPurchaseGroupsData !== null && statisticsPurchaseGroupsData.length !== 0 ) && (
                                    (
                                        <Pie {...statisticsGroupsConfig} />
                                    )
                                ) }
                                <hr/>
                            </Card>
                        </Col>
                        <Col span={12} style={{ padding: '0 20px' }}>
                            <h2 style={{margin: '20px 0 10px 0'}}>Planes de compra
                                <span style={{ fontSize:'12px', float: 'right' }}><a onClick={( ) => {
                                    const { client } = this.state;
                                    if ( client )  {
                                        this.props.setPCFilters({
                                            selectedRowKeys: [],
                                            page: 1,
                                            filters: {codcli_cbim: client.codcli_cbim, idcliente: client.idcliente, searchByEntity: client.nomcli_cbim},
                                            selectedRowsAction: false,
                                        } )
                                        this.props.history.push('/planes-de-compra')
                                        this.props.setSelectedKeys( { selectedKeys: ["14"] })
                                        this.props.setOpenKeys( ["5"] )
                                    }
                                } }>Ver Listado</a></span>
                            </h2>
                            <hr />
                                { plans ? plans.map( ( plan ) => (
                                    <Card bordered={ false } style={{ marginTop: '20px'}}>
                                        <Plan plan={ plan } />
                                        <hr/>
                                    </Card>
                                )) : (<Skeleton />) }
                        </Col>
                    </Row>
                </div>
            </Maincontainer>
        </div>
        );
    };

}
ClientsShowScreen.propTypes = {
};

export default connect( ( state ) => ({
}), { setOpenKeys, setSelectedKeys, setOrderListState, setPCFilters, getClientStatisticsPurchaseGroups, getClient, updateClient, getClientEntities, getClientPlans, getClientStatisticsPurchase } )( withRouter(ClientsShowScreen) );
