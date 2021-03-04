import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button, Spin, Dropdown, Menu, message, Modal, Space, Input} from 'antd';
import * as moment from "moment";
import {DownOutlined, ExportOutlined} from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import * as api from './../../../modules/clients-indas/api';
//import {  } from '../../../modules/clients-indas/actions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as download from "downloadjs";
import {
    CheckboxPasswordReset,
    ConfirmationText,
    ContentContainer,
    Label,
    TextContainer
} from "../../../components/Clients-Indas/styles";
import ActionEmailEdit from './ActionEmailEdit';

const { confirm } = Modal;

class ClientsActions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exportLoading: false,
            loading: false,
            entity: false,
        }

        this.cambiarEmail = this.cambiarEmail.bind( this )
    }

    cambiarEmail() {
        const { entities, selectedRowKeys } = this.props;
        if ( selectedRowKeys.length != 1 ) {
            return;
        }
        const entity = find( entities, ( entity ) => parseInt(  entity.codentidad_cbim ) == parseInt( selectedRowKeys[ 0 ] ) )
        this.setState( { loading: 'email', entity: entity })
        console.log( 'Searching', selectedRowKeys[0] ,'Entity', entities, entity)
    }

    errorUpdate (e) {
        this.setState({loading: false})
        alert("No se ha podido realizar la operación. ")
        console.log('Error:', e)
    }


    render() {
        const { exportLoading, loading, entity } = this.state
        const { selectedRowKeys, history, filters } = this.props
        return (

            <div className="table-actions">
                <div className="table-action-button">
                    <Button
                        type="link"
                        style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0}}
                        onClick={
                            () => {
                                this.setState({exportLoading: true})
                                api.exportEntities( filters , () => {
                                    this.setState({exportLoading: false})
                                })
                            }
                        }
                    >
                        {exportLoading ? <Spin/> : <ExportOutlined style={{fontSize: '20px'}}/> }
                    </Button>
                    {
                        selectedRowKeys.length == 1 && (
                            <React.Fragment>
                                <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                                    this.props.history.push(`/clientes/${selectedRowKeys[0]}/expediente`)
                                }}>
                                    Ver expediente digital
                                </Button>
                                <Button type="link" disabled={loading == 'email'} style={{marginLeft: '0px', marginRight: '0px'}} onClick={ this.cambiarEmail } >
                                    { loading == 'email' ? <Spin /> : 'Cambiar Email' }
                                </Button>
                                <ActionEmailEdit
                                    onClose={ () => this.setState( {loading: false, entity: false } ) }
                                    visible={ entity && loading == 'email' && entity != false }
                                    entidad={ entity }
                                />

                            </React.Fragment>
                        )
                    }
                    {
                        selectedRowKeys.length >= 1 && (
                            <React.Fragment>
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item key="1" onClick={() => { this.confirmUpdateStatus( 'Estado', 'Activo', 'idestado', '1') }}>
                                            Activo
                                        </Menu.Item>
                                        <Menu.Item key="2" onClick={() => { this.confirmUpdateStatus( 'Estado', 'Inactivo', 'idestado', '2') }}>
                                            Inactivo
                                        </Menu.Item>
                                    </Menu>
                                )}>
                                    <Button disabled={ loading } type="link" style={{marginLeft: '0px', marginRight: '0px'}}>
                                        { loading == 'idestado' ? <Spin /> : 'Cambiar a' } <DownOutlined/>
                                    </Button>
                                </Dropdown>

                            </React.Fragment>
                        )

                    }

                </div>
                { selectedRowKeys.length > 0 && ( <div style={ { width: '200px', paddingTop: '20px', float: 'right' } } >{ selectedRowKeys.length } fila(s) seleccionada(s).</div> ) }
            </div>
        );
    };

}

export default  connect(
    state => ({
    }),
    { }
)( withRouter(ClientsActions) );
