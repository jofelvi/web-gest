import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlanesCompraForm from './components/PlanesCompraForm';
import { Checkbox, Button, Col, Row, Select} from 'antd';
import {Maincontainer} from "../../../lib/styled";

import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";

class PlanesCompraCreate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Crear plan de compra</h2>
                    <PlanesCompraForm />
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                </div>
            </Maincontainer>
        );
    };

}
PlanesCompraCreate.propTypes = {
};

export default connect( ( state ) => ({

}), {  } )( withRouter(PlanesCompraCreate) );
