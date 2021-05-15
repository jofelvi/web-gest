import React, {useState} from 'react';
import { List } from 'antd';
import { Checkbox, Button, Col, Row, Select} from 'antd';
import _ from 'underscore';
import ListPresetSelector from "./ListPresetSelector";
import {DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";

const  ListTransferProducts =(props)=> {





        return (
            <React.Fragment>
                <Row style={{width: '100%'}}>
                    {/* <Col span={11} style={{ paddingLeft: '30px'}}>
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
                    </Col> */}
                </Row>
            </React.Fragment>
        );

}


export default ListTransferProducts;
