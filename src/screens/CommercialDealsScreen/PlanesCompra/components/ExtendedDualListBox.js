import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';

import { Checkbox, Button, Col, Row, Select} from 'antd';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import _ from 'underscore';

class ExtendedDualListBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOptionKeys: [],
        }

        this.updateSelectedOptions = this.updateSelectedOptions.bind(this)
    }

    updateSelectedOptions ( value ) {
        const selectedOptionKeys = this.state.selectedOptionKeys;
        if ( this.state.selectedOptionKeys.indexOf(value) > -1 ) {
            this.setState( { selectedOptionKeys: _.filter(selectedOptionKeys, (key) => (key!=value) ) } )
        } else {
            selectedOptionKeys.push(value)
            this.setState( { selectedOptionKeys } );
        }
    }

    rightButtonClick () {
        //get selected options, pass to values

    }

    render() {
        const { options, filter } = this.props;

        const filteredOptions = _.filter( options, filter )

        return (
            <Row style={{width: '100%'}}>
                <Col span={11}>
                    <List
                        size="small"
                        header={<div>Productos</div>}
                        bordered
                        dataSource={ filteredOptions }
                        renderItem={
                            item => (
                                <List.Item
                                    onClick={ ( event ) => ( this.updateSelectedOptions( item.value ) ) }
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Checkbox
                                        value={ item.value }
                                        checked={ this.state.selectedOptionKeys.indexOf(item.value) > -1 }
                                        onChange={ ( event ) => ( this.updateSelectedOptions( event.target.value ) ) }
                                    >
                                        {item.label}
                                    </Checkbox>
                                </List.Item>
                            )
                        }
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Button style={{ 'display' : 'inline-block', margin: '10px' }}><DoubleRightOutlined /></Button>

                    <Button style={{ 'display' : 'inline-block', margin: '10px' }}><RightOutlined /></Button>
                    <Button style={{ 'display' : 'inline-block', margin: '10px' }}><LeftOutlined /></Button>
                    <Button style={{ 'display' : 'inline-block', margin: '10px' }}><DoubleLeftOutlined /></Button>
                </Col>
                <Col span={11}>
                    <List
                        size="small"
                        header={<div>Seleccionados</div>}
                        bordered
                        dataSource={this.props.values}
                        renderItem={
                            item => (
                                <List.Item>
                                    <Checkbox
                                        checked={ false}
                                        onChange={(e) => {

                                        } }
                                    >
                                        {item.label}
                                    </Checkbox>
                                </List.Item>)
                        }
                    />
                </Col>
            </Row>
        );
    };

}
ExtendedDualListBox.propTypes = {
};

export default ExtendedDualListBox;
