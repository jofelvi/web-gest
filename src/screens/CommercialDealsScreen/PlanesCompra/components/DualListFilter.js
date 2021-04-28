import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';

import { Checkbox, Button, Col, Row, Select} from 'antd';
import { UpOutlined, DownOutlined, RightOutlined, DoubleRightOutlined, LeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import _ from 'underscore';
const { Option } = Select;

class DualListFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        };
        this.changeValue = this.changeValue.bind(this)
    }

    changeValue ( value ) {
        this.props.onChange ( value )
    }

    render() {
        const { options, value } = this.props;
        return (
            <React.Fragment>

              <Select value={ value || '' } style={{ width: '96%', marginLeft: '2%'}} onChange={this.changeValue} disabled={ options.length == 0 }>
                  <Option value={''}>- Seleccionar -</Option>
                  { options.map( ( option ) => {
                      return (<Option value={option.value}>{option.label}</Option>)
                  }) }
              </Select>
            </React.Fragment>
        );
    };

}
DualListFilter.propTypes = {
};

export default DualListFilter;
