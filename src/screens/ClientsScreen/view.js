import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientsFilters from './components/Filters';
import ClientsTable from './components/Table';

class ClientsScreen extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            page: 1,
            selectedRowKeys: [],
            data: [],
            loading: false,
            count: 0,
            sorter: {
                field: 'codcli_cbim',
                order: 'desc',
            },
        }
        this.onChangePage = this.onChangePage.bind( this );
        this.updateList = this.updateList.bind( this );
        this.onSelectedRowChange = this.onSelectedRowChange.bind( this );
    }

    componentWillMount() {
        this.updateList();
    }

    onChangePage (page, pageSize) {
        this.setState( { page: page, selectedRowKeys: [] }, this.updateList )
    }
    onChangeSorter ( sorter ) {

    }

    onSelectedRowChange( selectedRowKeys ) {
        this.setState({ selectedRowKeys }, () => {
            this.saveState();
        })
    }

    updateList() {
        this.props.loadEntitiesIndas( {
            page: this.state.page,
            filters: {
                sort_field: this.state.sorter.field,
                sort_order: this.state.sorter.order,
            },
            success: ( data, count ) => {
                this.setState( { data, count, loading: false })
            },
            error: () => {
                this.setState( { data: [], count: 0, loading: false })
            }
        });
    }

    saveState() {
        //todo
    }

    render () {
        const { entities } = this.props;
        const { loading, data, page, count } = this.state;

        return (
            <React.Fragment>
                <ClientsFilters />
                <ClientsTable
                    loading={ loading }
                    data={ data }
                    page={ page }
                    count={ count }
                    onChangePage={ this.onChangePage }
                    onSelectRowChange={ this.onSelectRowChange }
                    onChangeSorter={ this.onChangeSorter }
                />
            </React.Fragment>
        )
    }
}

ClientsScreen.propTypes = {
    loadClientsIndas: PropTypes.func,
    loadEntitiesIndas: PropTypes.func,
    loadWholesalersIndas: PropTypes.func,
    token: PropTypes.string
}

export default ClientsScreen;
