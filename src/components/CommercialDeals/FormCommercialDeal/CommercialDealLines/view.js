import React from 'react';
import PropTypes from 'prop-types';
import {
    Col,
    Row,
    Form,
    Input,
    InputNumber,
    Button,
    Icon
} from 'antd';
import './styles.css'

class CommercialDealLines extends React.Component {
    state = {
        lines:this.props.currentCommercialDeal.escalados?  this.props.currentCommercialDeal.escalados : []
    }
    addRow = e => {
        e.preventDefault();
        const columnsToValidate = [
            'udsminimas',
            'udsmaximas',
            'descuento',
            'txtdescuento'
        ];
        this.props.form.validateFields(columnsToValidate,(err, values) => {
          if (!err) {
            var {lines} = this.state;
            lines.push(values);
            this.setState({lines: lines});
          }
        });
      };
    render(){
        const { getFieldDecorator } = this.props.form;
        const lines = this.props.currentCommercialDeal.escalados;
        //this.setState({lines: lines});
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
                                    <Button type="primary" htmlType="submit" onClick={this.addRow}>
                                       Agregar
                                    </Button>
                                </Form.Item>
                            </Col>
                    </Row>
                    <Row className="commercial-deal-form-lines-body">
                        {this.state.lines.map((line) =>
                           <Row 
                           style={{marginTop:10, paddingTop:'10px', borderWidth:'2px 0 0 0', borderStyle:'solid', borderColor:'rgba(0,0,0,0.2)'}}
                           gutter={18}>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.udsminimas}</Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.udsmaximas}
                                </Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.descuento}</Col>
                                <Col 
                                md={{span:5}}
                                sm={{span:22}}>{line.txtdescuento}</Col>
                                <Col 
                                md={{span:4}}
                                sm={{span:22}}>
                                    <Button type="primary" htmlType="submit" onClick={this.deleteRow}>
                                    <Icon type="delete" />
                                    </Button>
                                </Col>
                            </Row> 
                        )}
                    </Row> 
                        
                
            </div>);
    };
};

CommercialDealLines.propTypes = {
    currentCommercialDeal: PropTypes.object
};
export default CommercialDealLines;