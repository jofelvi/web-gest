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
import { fetchPlan, createPlan, createPlanSetLoading } from "../../../modules/planes-compra/actions";

class PlanesCompraCreate extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        const { plan, createPlanSetLoading, createPlan, error, loading } = this.props

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Crear plan de compra</h2>
                    <PlanesCompraForm
                        plan={ plan }
                        error={ error }
                        loading={ loading }
                        onSave={ ( plan ) => {
                            createPlanSetLoading( { loading: true } )
                            createPlan( { plan } )
                        }}
                    />
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
    plan: state.planesCompra.plan,
    loading: state.planesCompra.createLoading,
    error: state.planesCompra.createError,
}), { fetchPlan, createPlanSetLoading, createPlan  } )( withRouter(PlanesCompraCreate) );
