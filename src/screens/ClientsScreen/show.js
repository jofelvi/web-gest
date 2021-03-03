import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Button, Col, Row, Select, Spin} from 'antd';
import {Maincontainer} from "../../lib/styled";
import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import ClientsForm from './components/Form';
import { getClient } from '../../modules/clients-indas/actions';
import _ from 'underscore';

class ClientsShowScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: true,
            savedPlan: null,
            client: null,
        }
        this.fetchClientFailed = this.fetchClientFailed.bind(this)
        this.fetchClientSuccess = this.fetchClientSuccess.bind(this)
    }

    componentWillMount(props) {
        const { getClient, match } = this.props;
        getClient({ idcliente: match.params.id, success: this.fetchClientSuccess, error: this.fetchClientFailed })
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

    render() {
        const { savedPlan, error, loading, client } = this.state;

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
}), { getClient } )( withRouter(ClientsShowScreen) );
