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
import { getClientEntities, getClientStatisticsPurchase, getClientPlans, updateClient } from '../../modules/clients-indas/actions';
import _ from 'underscore';
import { Line, Pie, RadialBar } from '@ant-design/charts';
import { reduce, find, filter } from 'lodash';
import * as moment from "moment";
import StatisticsPlanGraphic from './components/StatisticsPlanGraphic';
import Plan from './components/Plan';
import Entidades from './components/Entidades';
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
            savedPlan: null,
            client: null,
            entities: null,
            plans: null,
            statisticsPurchaseData: null,
            statisticsPurchase: null,
            statisticsPurchasePeriod: '1year',
            statisticsPurchaseColumn: 'unidades',
        }
        this.fetchClientFailed = this.fetchClientFailed.bind(this)
        this.fetchClientSuccess = this.fetchClientSuccess.bind(this)
        this.fetchClientEntitiesFailed = this.fetchClientEntitiesFailed.bind(this)
        this.fetchClientEntitiesSuccess = this.fetchClientEntitiesSuccess.bind(this)
        this.fetchClientPlansFailed = this.fetchClientPlansFailed.bind(this)
        this.fetchClientPlansSuccess = this.fetchClientPlansSuccess.bind(this)
        this.fetchStatisticsPurchaseFailed = this.fetchStatisticsPurchaseFailed.bind(this)
        this.fetchStatisticsPurchaseSuccess = this.fetchStatisticsPurchaseSuccess.bind(this)
        this.editPlan = this.editPlan.bind(this)
        this.onSaveClient = this.onSaveClient.bind(this)
    }

    componentWillMount(props) {
        const { getClient, getClientEntities, getClientStatisticsPurchase, getClientPlans, match } = this.props;
        getClient({ idcliente: match.params.id, success: this.fetchClientSuccess, error: this.fetchClientFailed })
        getClientEntities( { idcliente: match.params.id, success: this.fetchClientEntitiesSuccess, error: this.fetchClientEntitiesFailed } )
        getClientPlans( { idcliente: match.params.id, success: this.fetchClientPlansSuccess, error: this.fetchClientPlansFailed } )
        getClientStatisticsPurchase( { idcliente: match.params.id, success: this.fetchStatisticsPurchaseSuccess, error: this.fetchStatisticsPurchaseFailed } )
        this.setState( {
            error: false
        } )
    }
    onSaveClient( client ) {
        const {match } = this.props;
        this.setState( { loadingClient: true, clientError: false, savingClient: client } )
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
        alert("No se ha podido cargar las estadísticas de compra.")
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
        const { savedPlan, clientError, error, plans, loadingPlans, loadingClient, loadingEntities, entities, client, statisticsPurchaseData, statisticsPurchasePeriod, statisticsPurchaseColumn } = this.state;

        const data = reduce( statisticsPurchaseData, ( result, statisticsRow ) => {
            const monthsAgo = ((new Date()).getFullYear()-statisticsRow.año)*12+((new Date()).getMonth()-statisticsRow.mes)
            let key = '';
            if ( statisticsPurchasePeriod == '1year' && monthsAgo < 13 ) {
                key = statisticsRow.año+'-'+statisticsRow.mes;
            } else if ( statisticsPurchasePeriod == '5year' && monthsAgo >= (new Date()).getMonth() ) {
                key = statisticsRow.año+'-12';
            }
            const currentResult = find( result, ( resultRow ) => ( resultRow.[ statisticsPurchasePeriod] == key )  )
            const accumulatedValue = currentResult ? currentResult.[statisticsPurchaseColumn] : 0;
            const incrementedValue = parseInt( statisticsRow.[statisticsPurchaseColumn] )
            result = filter( result, ( resultRow ) => ( resultRow.[ statisticsPurchasePeriod ] != key ) )
            result.push({
                [statisticsPurchasePeriod]: key,
                [statisticsPurchaseColumn]: accumulatedValue+incrementedValue
            });
            return result;
        }, [] );

        console.log('data', data )

        const statisticsPurchaseConfig = {
            data: data,
            padding: 'auto',
            xField: statisticsPurchasePeriod,
            yField: statisticsPurchaseColumn,
            xAxis: {
                type: 'timeCat',
                tickCount: 5,
            },
        }
        const statisticsGroupsConfig = {
            appendPadding: 10,
            data: [
                { value: 12134, label: 'Grave Pants' },
                { value: 14031, label: 'Grave' },
                { value: 129, label: 'L. Blanca' },
                { value: 350, label: 'L. Higiene y Proteccion' },
            ],
            angleField: 'value',
            colorField: 'label',
            radius: 0.9,
            label: {
                type: 'inner',
                offset: '-30%',
                content: function content(_ref) {
                    var percent = _ref.percent;
                    return ''.concat(percent * 100, '%');
                },
                style: {
                    fontSize: 14,
                    textAlign: 'center',
                },
            },

        }
        const statisticsPlanConfig = {
            appendPadding: 10,
            data: [
                { normalizedValue: 19, value: 10, label: 'Pedidos' },
                { normalizedValue: 21, value: 80, label: 'Compras' },
            ],
            yField: 'normalizedValue',
            xField: 'label',
            radius: 0.8,
            innerRadius: 0.2,
            tooltip: {
                formatter: function formatter(datum) {
                    console.log('datum',datum)
                    return {
                        name: 'Valor',
                        value: datum.value,
                    };
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
                           onSave={ this.onSaveClient }
                       />
                    ) : (<Skeleton style={{marginBottom: '10px'}}/>)}
                    { clientError && (<p style={{ color: 'red'}}>Error guardando el cliente.</p>) }
                    { loadingEntities ? (<Skeleton />) : (<Entidades entities={ entities }/>) }

                </div>
                <div className="table-indas table-indas-new">
                    <h2 className="table-indas-title">Estadísticas</h2>
                    <Row>
                        <Col span={12} style={{ padding: '0 20px' }}>
                            <Card  title="Ventas" bordered={ true } style={{ textAlign: 'center'}}>
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
                                { statisticsPurchaseData === null || statisticsPurchaseData.length === 0? (<Skeleton />) : (
                                    <Line {...statisticsPurchaseConfig} />
                                )}
                            </Card>
                            <br />
                            <Card  title="Ventas por categoría" bordered={ true }>
                                <Pie {...statisticsGroupsConfig} />
                            </Card>
                        </Col>
                        <Col span={12} style={{ padding: '0 20px' }}>
                            <Card  title="Planes de compra" bordered={ true }>
                                { plans ? plans.map( ( plan ) => (
                                    <Plan plan={ plan } />
                                )) : (<Skeleton />) }
                            </Card>
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
}), { getClient, updateClient, getClientEntities, getClientPlans, getClientStatisticsPurchase } )( withRouter(ClientsShowScreen) );
