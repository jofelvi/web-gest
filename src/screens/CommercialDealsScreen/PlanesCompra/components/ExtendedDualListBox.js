import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';

import { Checkbox, Button, Col, Row, Select, Spin} from 'antd';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import _ from 'underscore';
import { difference } from 'lodash';
const { Option } = Select;
const listStyle = {
    height: '500px',
    overflow: 'auto'
};

class ExtendedDualListBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLeftKeys: [],
            selectedRightKeys: [],
            selectedKeys: props.selectedKeys,
        }

        this.updateSelectedLeftKeys = this.updateSelectedLeftKeys.bind(this)
        this.leftButtonClick = this.leftButtonClick.bind( this );
        this.rightButtonClick = this.rightButtonClick.bind( this );
        this.allRightButtonClick = this.allRightButtonClick.bind( this );
        this.allLeftButtonClick = this.allLeftButtonClick.bind( this );
        this.updateValue = this.updateValue.bind( this );

    }

    toggleValue ( value, collection ) {
        if ( collection.indexOf(value) > -1 ) {
            return _.filter( collection, ( key ) => ( key != value ) )
        }
        collection.push( value )
        return collection;
    }

    updateSelectedLeftKeys ( value ) {
        const selectedLeftKeys = this.toggleValue( value, this.state.selectedLeftKeys );
        this.setState( { selectedLeftKeys } )
    }

    updateSelectedRightKeys ( value ) {
        const selectedRightKeys = this.toggleValue( value, this.state.selectedRightKeys );
        this.setState( { selectedRightKeys } )
    }

    allRightButtonClick () {
        const { options, filter } = this.props;
        const { selectedKeys } = this.state;
        const filteredOptions = _.filter( options, filter )
        const filteredUnselectedOptions = _.filter( filteredOptions, ( option ) => (selectedKeys.indexOf(option.value) == -1))

        const newSelectedKeys = _.union( selectedKeys, filteredUnselectedOptions.map((o)=>o.value) )
        this.setState( { selectedLeftKeys: [], selectedKeys: newSelectedKeys }, this.updateValue)
    }
    rightButtonClick () {
        const { selectedLeftKeys, selectedKeys } = this.state;
        const newSelectedKeys = _.union( selectedKeys, selectedLeftKeys )
        this.setState( { selectedLeftKeys: [], selectedKeys: newSelectedKeys }, this.updateValue)
    }

    leftButtonClick () {
        const { selectedRightKeys, selectedKeys } = this.state;
        this.setState( { selectedRightKeys: [], selectedKeys: difference( selectedKeys, selectedRightKeys) }, this.updateValue )
    }
    allLeftButtonClick() {
        this.setState( { selectedRightKeys: [], selectedKeys: [] }, this.updateValue)
    }
    updateValue() {
        this.props.onChange( this.state.selectedKeys )
    }
    render() {
        const { options, filter } = this.props;
        const { selectedKeys, selectedLeftKeys, selectedRightKeys } = this.state;

        const filteredOptions = _.filter( options, filter )
        const filteredUnselectedOptions = _.filter( filteredOptions, ( option ) => (selectedKeys.indexOf(option.value) == -1))
        const selectedOptions = _.filter( options, ( option ) => (selectedKeys.indexOf(option.value) > -1))

        return (
            <React.Fragment>
                <Row style={{width: '100%'}}>
                    <Col span={11} style={{ paddingLeft: '30px'}}>
                        <List
                            style={ listStyle }
                            size="small"
                            header={<div>Productos</div>}
                            bordered
                            dataSource={ filteredUnselectedOptions }
                            loading={ filteredOptions.length < 1 }
                            renderItem={
                                item => (
                                    <List.Item
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Checkbox
                                            value={ item.value }
                                            checked={ selectedLeftKeys.indexOf(item.value) > -1 }
                                            onChange={ ( event ) => ( this.updateSelectedLeftKeys( event.target.value ) ) }
                                        >
                                            {item.label}
                                        </Checkbox>
                                    </List.Item>
                                )
                            }
                            />

                    </Col>
                    <Col span={1} style={{ textAlign: 'center' }}>
                        <Button
                            style={{ 'display' : 'inline-block', margin: '10px' }}
                            onClick={ this.allRightButtonClick }
                        ><DoubleRightOutlined /></Button>
                        <Button
                            style={{ 'display' : 'inline-block', margin: '10px' }}
                            onClick={ this.rightButtonClick }
                        ><RightOutlined /></Button>
                        <Button
                            style={{ 'display' : 'inline-block', margin: '10px' }}
                            onClick={ this.leftButtonClick }
                        ><LeftOutlined /></Button>
                        <Button
                            style={{ 'display' : 'inline-block', margin: '10px' }}
                            onClick={ this.allLeftButtonClick }
                        ><DoubleLeftOutlined /></Button>

                    </Col>
                    <Col span={11}>
                        <List
                            size="small"
                            header={<div>Seleccionados</div>}
                            bordered
                            style={ listStyle }
                            dataSource={ selectedOptions }
                            renderItem={
                                item => (
                                    <List.Item
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Checkbox
                                            value={ item.value }
                                            checked={ selectedRightKeys.indexOf(item.value) > -1 }
                                            onChange={ ( event ) => ( this.updateSelectedRightKeys( event.target.value ) ) }
                                        >
                                            {item.label}
                                        </Checkbox>
                                    </List.Item>)
                            }
                        />
                    </Col>
                </Row>
            </React.Fragment>
        );
    };

}
ExtendedDualListBox.propTypes = {
};

export default ExtendedDualListBox;
