import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row,
    Form,
    Input,
    InputNumber,
    Button
} from 'antd';
import './styles.css'

class CommercialDealLines extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const columnsToValidate = [
            'udsminimas',
            'udsmaximas',
            'descuento',
            'txtdescuento'
        ];
        this.props.form.validateFields(columnsToValidate,(err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                   <Row 
                    className="commercial-deal-form-lines-header"
                    gutter={18}>
                        <Col 
                        md={{span:5}}
                        sm={{span:22}}>Unidades Mínimas</Col>
                        <Col 
                        md={{span:5}}
                        sm={{span:22}}>Unidades Máximas</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}>Descuento</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}>Texto Equivalente</Col>
                        <Col
                        md={{span:5}}
                        sm={{span:22}}></Col>
                    </Row>
                    <Row 
                    className="commercial-deal-form-lines-new"
                    style={{marginTop:10}}
                    gutter={18}>
                            <Col 
                            md={{span:5}}
                            sm={{span:22}}>
                                <Form.Item>
                                    {getFieldDecorator('udsminimas', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Rellene la información',
                                        },
                                        ],
                                    })(<InputNumber style={{width:'100%'}}/>)}
                                </Form.Item>
                            </Col>
                            <Col 
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                    {getFieldDecorator('udsmaximas', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Rellene la información',
                                        },
                                        ],
                                    })(<InputNumber style={{width:'100%'}}/>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                    {getFieldDecorator('descuento', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Rellene la información',
                                        },
                                        ],
                                    })(<InputNumber style={{width:'100%'}}/>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:5}}
                            sm={{span:22}}>
                                 <Form.Item>
                                    {getFieldDecorator('txtdescuento', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Rellene la información',
                                        },
                                        ],
                                    })(<Input/>)}
                                </Form.Item>
                            </Col>
                            <Col
                            md={{span:4}}
                            sm={{span:22}}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                                       Agregar
                                    </Button>
                                </Form.Item>
                            </Col>
                    </Row>
                    <Row className="commercial-deal-form-lines-body">

                    </Row> 
                
            </div>);
    };
};

CommercialDealLines.propTypes = {
    currentCommercialDeal: PropTypes.object
};
export default CommercialDealLines;