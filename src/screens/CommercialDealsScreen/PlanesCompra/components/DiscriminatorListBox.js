import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';

import { Checkbox, Button, Col, Row, Select} from 'antd';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import _ from 'underscore';
import ListPresetSelector from "./ListPresetSelector";

class DiscriminatorListBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOptionKeys: [],
        }

        this.toggleSelectedDiscriminatorOptions = this.toggleSelectedDiscriminatorOptions.bind(this)
    }

    toggleSelectedDiscriminatorOptions ( value ) {
        const selectedOptionKeys = this.state.selectedOptionKeys;
        if ( this.state.selectedOptionKeys.indexOf(value) > -1 ) {
            this.setState( { selectedOptionKeys: _.filter(selectedOptionKeys, (key) => (key!=value) ) } )
        } else {
            selectedOptionKeys.push(value)
            this.setState( { selectedOptionKeys } );
        }
        this.props.onChange( selectedOptionKeys );
    }

    discriminatedOptions () {
        const { options } = this.props;
        return _.filter( options,
            ( item ) => (this.state.selectedOptionKeys.indexOf( item.discriminator ) > -1)
        )
    }

    render() {
        const { options, discriminator_options } = this.props;

        return (
            <React.Fragment>
                { this.props.preset && (
                    <ListPresetSelector {... this.props.preset } />
                )}
            <Row style={{width: '100%'}}>
                <Col span={12} style={{ height: '1150px', overflow: 'auto', paddingRight: '10px' }}>
                    <List
                        size="small"
                        header={<div>Submarcas</div>}
                        bordered
                        dataSource={ discriminator_options }
                        renderItem={
                            item => (
                                <List.Item
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Checkbox
                                        value={ item.value }
                                        checked={ this.state.selectedOptionKeys.indexOf(item.value) > -1 }
                                        onChange={ ( value ) => ( this.toggleSelectedDiscriminatorOptions( item.value ) ) }
                                    >
                                        {item.label}
                                    </Checkbox>
                                </List.Item>
                            )
                        }
                    />
                </Col>
                <Col span={12} style={{ height: '1150px', overflow: 'auto', paddingLeft: '10px' }}>
                    <List
                        size="small"
                        header={<div>Seleccionados</div>}
                        bordered
                        dataSource={ this.discriminatedOptions() }
                        renderItem={
                            item => (
                                <List.Item>
                                        {item.label}
                                </List.Item>)
                        }
                    />
                </Col>
            </Row>
            </React.Fragment>
        );
    };

}
DiscriminatorListBox.propTypes = {
};

export default DiscriminatorListBox;
