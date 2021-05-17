import React from 'react';
import { connect } from 'react-redux';
import {Row, Col, Button, Spin, Dropdown, Menu, message, Modal, Space, Input} from 'antd';
import * as moment from "moment";
import {DownOutlined, ExportOutlined} from "@ant-design/icons";
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';
import * as api from '../../../../modules/clients-indas/api';
//import {  } from '../../../modules/clients-indas/actions';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as download from "downloadjs";
import PuntosActionCreate from "./ActionCreate";

const { confirm } = Modal;

class PuntosActions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exportLoading: false,
            loading: false,
        }

    }


    render() {
        const { exportLoading, loading } = this.state
        const { history, filters, codentidad_cbim, onReload } = this.props

        return (

            <div className="table-actions">
                <div className="table-action-button">
                    <Button
                        type="link"
                        style={{marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0}}
                        onClick={
                            () => {
                                this.setState({exportLoading: true})
                                api.exportEntityPuntos( codentidad_cbim, filters , () => {
                                    this.setState({exportLoading: false})
                                })
                            }
                        }
                    >
                        {exportLoading ? <Spin/> : <ExportOutlined style={{fontSize: '20px'}}/> }
                    </Button>

                    <Button type="link" style={{marginLeft: '0px', marginRight: '0px'}} onClick={() => {
                       this.setState( { loading: 'create' } )
                    }}>
                        Añadir Movimiento
                    </Button>
                </div>
                <PuntosActionCreate
                    onClose={ () => {
                        this.setState( { loading: false })
                        onReload()
                    }}
                    codentidad_cbim={ codentidad_cbim }
                    visible={ 'create' === loading }
                />
            </div>
        );
    };

}

export default  connect(
    state => ({
    }),
    {  }
)( withRouter(PuntosActions) );
