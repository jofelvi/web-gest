import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import {InputsContainer} from "../../../lib/styled";

class ClientsFilters extends React.Component {
    render() {
        return (
            <div className="table-filters-indas">
                <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
                    <Row key={'filters_b'} style={{width: '100%', marginBottom: 0}}>
                        <Col span={18} style={{padding: '10px'}}  key={'col_1'}>
                            Filtro 1

                        </Col>

                    </Row>
                </InputsContainer>
            </div>
        );
    };

}
ClientsFilters.propTypes = {
};

export default  connect(
    state => ({
    }),
    {  }
)( ClientsFilters );
