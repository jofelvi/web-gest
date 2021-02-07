import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined } from "@ant-design/icons";
import {Button} from "antd";
import { withRouter } from 'react-router-dom';


class PlanesCompraCreated extends React.Component {
    render() {
        const { plan } = this.props;

        return (
            <div style={{ textAlign: 'center'}}>
                <div>
                    <CheckOutlined style={{ fontSize: '42px'}} />
                </div>
                { this.props.isEdit ? (
                    <h3 style={{ margin: '15px'}}>El plan '{ plan.nombre }' se ha guardado.</h3>
                ) : (
                    <h3 style={{ margin: '15px'}}>El plan '{ plan.nombre }' se ha creado.</h3>
                ) }
                <Button  type="primary" onClick={() => { this.props.history.push('/planes-de-compra/') }}>
                    Volver al listado
                </Button>
            </div>
        );
    };

}
PlanesCompraCreated.propTypes = {
};

export default withRouter( PlanesCompraCreated );
