import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Input, Button, Col, Row, Select} from 'antd';
import {InputsContainer} from "../../../../lib/styled";

const inputStyle = {
    width: 'calc(100% - 40px)',
    margin: '10px'
}

class PlanesCompraForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <span>
                        Datos generales
                    </span>
                <div className="table-filters-indas" style={{padding:'20px'}}>
                        <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>

                            <Col span={24} push={0}>
                                <label>Cliente</label>
                                <Input style={inputStyle} />
                            </Col>
                            <Col span={18} push={6}>
                                <label>Nombre del plan</label>
                                <Input style={inputStyle} />
                            </Col>
                            <Col span={6} pull={18}>
                                <label>Descripción del plan</label>
                                <Input style={inputStyle} />
                            </Col>
                        </Row>
                    <Row style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                        <Col span={8} >
                            <label>Fecha de inicio</label>
                            <Input style={inputStyle} />
                        </Col>
                        <Col span={8} >
                            <label>Fecha de fin</label>
                            <Input style={inputStyle} />
                        </Col>
                    </Row>
                </div>

            </React.Fragment>
        );
    };

}
PlanesCompraForm.propTypes = {
};

export default connect( ( state ) => ({

}), {  } )( PlanesCompraForm );
