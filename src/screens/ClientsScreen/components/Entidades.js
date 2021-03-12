import React from 'react';
import {Button, Card, Col, Descriptions, List, Modal, Row, Tag} from "antd";
import {find} from "lodash";
import * as api from "../../../modules/planes-compra/api";
import {IFrame} from "../../CommercialDealsScreen/PlanesCompra/components/IFrame";


class Entidades extends React.Component {

    render() {
        const { entities } = this.props;

        return (<List
            header={ (<h2 style={{margin: '20px 0 10px 0'}}>Entidades</h2>) }
            itemLayout="horizontal"
            dataSource={ entities ? entities : [] }
            loading={ false }
            renderItem={entity => (
                <React.Fragment>
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
                                        <a href={'#'}>Movs.</a>
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
                </React.Fragment>
            )
            }
        />);
    }
}

export default Entidades;
