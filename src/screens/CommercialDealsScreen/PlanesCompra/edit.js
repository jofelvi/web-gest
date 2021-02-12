import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlanesCompraForm from './components/PlanesCompraForm';
import { Checkbox, Button, Col, Row, Select, Spin} from 'antd';
import {Maincontainer} from "../../../lib/styled";
import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import { fetchPlan, updatePlan } from '../../../modules/planes-compra/actions';
import _ from 'underscore';

class PlanesCompraEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            loading: false,
            savedPlan: null,
        }
        this.onSavePlan = this.onSavePlan.bind(this)
        this.onSavePlanSuccess = this.onSavePlanSuccess.bind(this)
        this.onSavePlanError = this.onSavePlanError.bind(this)
    }

    componentWillMount(props) {
        const { fetchPlan, match } = this.props;
        fetchPlan({ idcondcomercial: match.params.id })
        this.setState( {
            error: false
        } )
    }

    onSavePlan( plan ) {
        const { updatePlan } = this.props;
        this.setState({ loading: true, error: false })
        const deleteKeys = ['nomcli_cbim', 'tipo', 'codcli_cbim', 'coddelegado', 'estado', 'estado2', 'idcliente', 'delegado']
        for( let i in deleteKeys) {
            delete plan[deleteKeys[i]];
        }
        updatePlan( {
            plan: plan,
            success: this.onSavePlanSuccess,
            error: this.onSavePlanError,
        } )
    }
    onSavePlanSuccess( plan ) {
        this.setState({ loading: false, error: false, savedPlan: plan })
    }
    onSavePlanError( error ) {
        this.setState({ loading: false, error: true, savedPlan: null })
    }
    render() {
        const { plan } = this.props;
        const { savedPlan, error, loading } = this.state;

        return (
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    <h2 className="table-indas-title">Editar plan de compra</h2>
                    { plan != null ? (
                        <PlanesCompraForm
                            editPlan={ _.clone( plan ) }
                            plan={ savedPlan }
                            savedMessage={ ( plan ) => `El plan \'${ plan.nombre }\' se ha guardado.` }
                            loading={ loading }
                            error={ error }
                            onSave={this.onSavePlan}
                        />
                        ) : (<Spin style={{display:'block', marginBottom: '10px'}}/>)}
                    <Button type="link" onClick={() => { this.props.history.push('/planes-de-compra') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                </div>
            </Maincontainer>
        );
    };

}
PlanesCompraEdit.propTypes = {
};

export default connect( ( state ) => ({
    plan: state.planesCompra.plan,
}), { fetchPlan, updatePlan } )( withRouter(PlanesCompraEdit) );
