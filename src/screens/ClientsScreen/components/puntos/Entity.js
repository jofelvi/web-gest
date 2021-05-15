import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Card, Col, Tooltip, Descriptions, List, Row, Tag} from "antd";
import * as moment from "moment";
import Utils from "../../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../../lib/styled";
import ResizableTable from "../../../shared/ResizableTable";
import {LIMIT} from "../../../../constants";

class PuntosEntity extends React.Component {
    render() {
        const {entity} = this.props;
        return (
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={18}>
                            <Descriptions size="small" column={1}>
                                <Descriptions.Item label="">
                                    <span style={{
                                        fontSize: '18px',
                                        color: '#1890ff'
                                    }}>{entity.ind_esfarmacia ? 'Farmacia' : 'Sociedad Limitada'}</span>
                                </Descriptions.Item>
                                <Descriptions.Item label=""><b>{entity.nomentidad_cbim}</b></Descriptions.Item>
                                <Descriptions.Item><small
                                    style={{fontWeight: 'bold'}}>Código: {entity.codentidad_cbim}</small></Descriptions.Item>
                                <Descriptions.Item
                                    label=""> {entity.direccion}, {entity.codigo_postal}, {entity.poblacion}</Descriptions.Item>
                                <Descriptions.Item label="">{entity.provincia}</Descriptions.Item>
                                <Descriptions.Item label=""><span
                                    style={{color: '#1890ff'}}><b>Tlf.:</b></span> {entity.telefono}</Descriptions.Item>
                                { entity.delegado && ( <Descriptions.Item label=""><span style={{color: '#1890ff'}}><b>Delegado Comercial:</b></span> {entity.delegado.nombre} </Descriptions.Item> ) }
                            </Descriptions>
                        </Col>
                        <Col span={6}>
                            <div style={{textAlign: 'right', paddingBottom: '5px', paddingRight: '12px'}}>
                                {entity.idestado == '1' ? (<Tag color="green">Activo</Tag>) : (
                                    <Tag color="red">Inactivo</Tag>)}
                            </div>
                            <Card style={{marginRight: '20px', width: '100%', float: 'right', textAlign: 'center'}}>
                                <br/>
                                <span style={{fontSize: '38px'}}> {entity.puntosacumulados} </span>
                                <br/>
                                <b>PUNTOS</b><br/><br/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <List
                        className={'list sublist'}
                        dataSource={entity.mayoristas}
                        header={'Mayoristas'}
                        renderItem={
                            (mayorista) => (
                                <List.Item key={mayorista.codmayorista}>
                                    <List.Item.Meta
                                        title={(
                                            <span><b>{mayorista.codmayorista}</b> - {mayorista.nombre} [ {mayorista.cooperador} ]</span>)}
                                    />
                                </List.Item>
                            )
                        }
                    >

                    </List>
                </Col>
            </Row>
        );
    }
}
export default  connect(
    state => ({
    }),
    {  }
)( PuntosEntity );

