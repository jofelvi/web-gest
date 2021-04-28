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

class PlanesCompraCreateNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: false,
        }
        this.onSavePlanSuccess = this.onSavePlanSuccess.bind( this )
        this.onSavePlanError = this.onSavePlanError.bind( this )
    }
    onSavePlanSuccess( plan ) {
        this.setState({ loading: false, error: false, savedPlan: plan })
    }
    onSavePlanError( error ) {
        this.setState({ loading: false, error: true, savedPlan: null })
    }
    render() {
        const { plan, createPlan } = this.props
        const { error, loading } = this.state;

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Crear plan de compra</h2>
                    <PlanesCompraForm
                        plan={ plan }
                        error={ this.state.error }
                        loading={ loading }
                        savedMessage={ ( plan ) => `El plan \'${ plan.nombre }\' se ha creado.` }
                        onSave={ ( plan ) => {
                            this.setState({ loading: true, error: false })
                            createPlan( {
                                plan: plan,
                                success: this.onSavePlanSuccess,
                                error: this.onSavePlanError,
                            } )
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
PlanesCompraCreateNew.propTypes = {
};

export default connect( ( state ) => ({
    plan: state.planesCompra.plan,
}), { fetchPlan, createPlanSetLoading, createPlan  } )( withRouter(PlanesCompraCreateNew) );
