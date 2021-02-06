import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

import * as apiClientes from '../../../modules/clients-indas/api';


const { Option } = Select;




class OrderFilterEntity extends React.Component {
    state = {
        data: [],
        value: this.props.value,
    };

    handleSearch = value => {
        if (value) {
            this.fetch(value, data => this.setState({data}));
        } else {
            this.setState({data: []});
        }
    };

    fetch = (value, callback) => {
        const str = querystring.encode({
            como: value,
        });

        const response = apiClientes.getEntitiesIndas(str).then(
            (response) => response.data
        ).then( (results) => {
            const data = [];
            results.forEach(r => {
                data.push({
                    value: r.codentidad_cbim,
                    text: '['+r.codentidad_cbim+'] '+r.nomentidad_cbim+' - '+r.poblacion+', '+r.codigo_postal+', '+r.provincia+', '+r.direccion+'.',
                    entity: r
                });
            });

            callback(data)

        });
    }

    handleChange = value => {
        this.setState({value: null});
        let currentRow = null
        this.state.data.forEach((row) => {
            if ( row.entity.codentidad_cbim == value ) {
                currentRow = row.entity
            }
        })
        const cod = (currentRow != '' && this.props.column && this.props.column == 'object') ? currentRow : currentRow.codcli_cbim
        //if (this.props.column )
        const client=currentRow ? cod : '';
        this.props.onChangeClient(client);
        this.props.onChange(typeof(value) == 'undefined' ? '' : value)
    };

    constructor(props) {
        super(props)
        this.fetch = this.fetch.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    render() {
        const options = this.state.data.map(d => (<Option key={d.value}>{d.text}</Option>) );
        return (
            <Select
                showSearch
                value={this.state.value || this.props.value }
                placeholder={this.props.placeholder}
                style={{ width: '100%', marginTop: 10, marginLeft:10 }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                allowClear
            >
                {options}
            </Select>
        );
    };

}
OrderFilterEntity.propTypes = {
    order: PropTypes.shape({}).isRequired,
};

export default connect( ( state ) => ({  }), { } )( OrderFilterEntity );
