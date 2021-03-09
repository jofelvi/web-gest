import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Button, Col, Row, Select, Spin, List, Descriptions, Card, Tag } from 'antd';
import {Maincontainer} from "../../lib/styled";
import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import ClientsForm from './components/Form';
import { getClient } from '../../modules/clients-indas/actions';
import { getClientEntities } from '../../modules/clients-indas/actions';
import _ from 'underscore';

class ClientsShowScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: true,
            loadingEntities: true,
            savedPlan: null,
            client: null,
            entities: null,
        }
        this.fetchClientFailed = this.fetchClientFailed.bind(this)
        this.fetchClientSuccess = this.fetchClientSuccess.bind(this)
        this.fetchClientEntitiesFailed = this.fetchClientEntitiesFailed.bind(this)
        this.fetchClientEntitiesSuccess = this.fetchClientEntitiesSuccess.bind(this)
    }

    componentWillMount(props) {
        const { getClient, getClientEntities, match } = this.props;
        getClient({ idcliente: match.params.id, success: this.fetchClientSuccess, error: this.fetchClientFailed })
        getClientEntities( { idcliente: match.params.id, success: this.fetchClientEntitiesSuccess, error: this.fetchClientEntitiesFailed } )
        this.setState( {
            error: false
        } )
    }

    fetchClientFailed( error ) {
        alert("No se ha podido cargar el plan.")
    }
    fetchClientSuccess ( client ) {
        this.setState( { client, loading: false } )
    }

    fetchClientEntitiesFailed( error ) {
        alert("No se han podido cargar las entidades.")
    }
    fetchClientEntitiesSuccess ( entities ) {
        this.setState( { entities, loadingEntities: false } )
    }

    render() {
        const { savedPlan, error, loading, loadingEntities, entities, client } = this.state;

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/clientes') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Expediente Digital</h2>
                    { client != null ? (
                       <ClientsForm
                           client={ client }
                           loading={ false }
                           error={ false }
                       />
                    ) : (<Spin style={{display:'block', marginBottom: '10px'}}/>)}

                    <List
                        header={ 'Entidades' }
                        itemLayout="horizontal"
                        dataSource={ entities ? entities : [] }
                        loading={ loadingEntities }
                        renderItem={entity => (
                            <List.Item key={ entity.codentidad_cbim }>
                                <Row>
                                    <Col span={ 12 }>
                                        <Row>
                                            <Col span={ 18 }>
                                                <Descriptions size="small" column={1} >
                                                    <Descriptions.Item label="">
                                                        <span style={{ fontSize:'18px', color: '#1890ff'}}>{ entity.ind_esfarmacia ? 'Farmacia' : 'Sociedad Limitada' }</span>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label=""><b>{ entity.nomentidad_cbim }</b></Descriptions.Item>
                                                    <Descriptions.Item><small style={{fontWeight: 'bold'}}>Código: { entity.codentidad_cbim }</small></Descriptions.Item>
                                                    <Descriptions.Item label=""> { entity.direccion }, { entity.codigo_postal }, { entity.poblacion }</Descriptions.Item>
                                                    <Descriptions.Item label="">{ entity.provincia }</Descriptions.Item>
                                                    <Descriptions.Item label="Tlf">{ entity.telefono }</Descriptions.Item>
                                                    <Descriptions.Item label="Delegado Comercial">{ entity.delegado[ 0 ].nombre }</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col span={ 6 }>
                                                <Card style={{ marginRight: '20px', width: '100%', float: 'right', textAlign: 'center' }}>
                                                    { entity.idestado == '1' ? (<Tag color="green">Activo</Tag>) : (<Tag color="red">Inactivo</Tag>) }
                                                    <br />
                                                    <span style={{ fontSize: '38px'}}> { entity.puntosacumulados } </span>
                                                    <br />
                                                    <b>PUNTOS</b><br /><br />
                                                    <a href={'#'}>Mov.</a>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={ 12 }>
                                        <List
                                            className={'list sublist'}
                                            dataSource={ entity.mayoristas }
                                            header={ 'Mayoristas' }
                                            renderItem={
                                                ( mayorista ) => (
                                                    <List.Item key={mayorista.codmayorista}>
                                                        <List.Item.Meta
                                                            title={( <span><b>{mayorista.codmayorista}</b> - { mayorista.nombre}</span> ) }
                                                        />
                                                    </List.Item>
                                                )
                                            }
                                        >

                                        </List>
                                    </Col>
                                </Row>
                            </List.Item>
                            )
                        }
                    />


                    <Button type="link" onClick={() => { this.props.history.push('/clientes') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                </div>
            </Maincontainer>
        );
    };

}
ClientsShowScreen.propTypes = {
};

export default connect( ( state ) => ({
}), { getClient, getClientEntities } )( withRouter(ClientsShowScreen) );
