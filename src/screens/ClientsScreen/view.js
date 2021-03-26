import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ClientsFilters from './components/Filters';
import ClientsTable from './components/Table';
import ClientsActions from './components/Actions';
import {setListState} from "../../modules/clients-indas/actions";
import { get } from "lodash";
import {ConfigProvider} from "antd";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../lib/styled";
import PlanesCompraActions from "../CommercialDealsScreen/PlanesCompra/components/PlanesCompraActions";

class ClientsScreen extends React.Component {
    constructor( props ) {
        super( props )
        this.state = props.state != null ? props.state : {
            page: 1,
            selectedRowKeys: [],
            data: [],
            loading: false,
            count: 0,
            filters: {},
            sorter: {
                field: 'codcli_cbim',
                order: 'desc',
            },
        };
        this.onChangeSorter = this.onChangeSorter.bind( this );
        this.onChangePage = this.onChangePage.bind( this );
        this.updateList = this.updateList.bind( this );
        this.setFilters = this.setFilters.bind( this );
        this.saveState = this.saveState.bind( this );
        this.onSelectRowChange = this.onSelectRowChange.bind( this );
    }

    componentWillMount() {
        this.updateList();
        this.props.fetchDelegados();
    }

    onChangePage (page, pageSize) {
        this.setState( { page: page, selectedRowKeys: [] } )
    }
    onChangeSorter ( sorter ) {
        this.setState({ sorter: { field: sorter.field, order: sorter.order == 'ascend' ? 'ASC' : 'DESC' }} , this.updateList );
    }

    onSelectRowChange( selectedRowKeys ) {
        this.setState({ selectedRowKeys }, () => {
            this.saveState();
        })
    }
    setFilters( filters ) {
        this.setState({ filters: { ...filters }, page: 1, selectedRowKeys: [] }, this.updateList )
    }

    updateList() {
        const { filters, page, loading } = this.state;
        if ( false === loading ) {
            this.setState( { loading: true } );
            this.props.loadEntitiesIndas( {
                page: page,
                filters: {
                    ...filters,
                    sort_field: get( this.state, 'sorter.field', ''),
                    sort_order: get( this.state, 'sorter.order', ''),
                },
                success: ( data, count ) => {
                    this.setState( { data, count, loading: false }, this.saveState )
                },
                error: () => {
                    this.setState( { data: [], count: 0, loading: false }, this.saveState)
                }
            });
        }
    }

    saveState() {
        this.props.setListState( this.state );
    }

    render () {
        const { entities, history } = this.props;
        const { loading, data, page, count, filters, selectedRowKeys } = this.state;

        return (
            <ConfigProvider locale={ locale }>
                <Maincontainer>
                    <div className="table-indas table-indas-new">
                        <h2 className="table-indas-title">Clientes</h2>

                <ClientsFilters
                    setFilters={ this.setFilters }
                    filters={ filters }
                />
                <ClientsActions
                    history={ history }
                    filters={ filters }
                    entities={ entities }
                    onReload={ this.updateList }
                    selectedRowKeys={ selectedRowKeys }
                />
                <hr />
                <ClientsTable
                    loading={ loading }
                    data={ data }
                    page={ page }
                    count={ count }
                    selectedRowKeys={ selectedRowKeys }
                    onChangePage={ this.onChangePage }
                    onSelectRowChange={ this.onSelectRowChange }
                    onChangeSorter={ this.onChangeSorter }
                />
                    </div>
            </Maincontainer>
            </ConfigProvider>
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
