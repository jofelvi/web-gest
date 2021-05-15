import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Checkbox,
    Button,
    Skeleton,
    Col,
    Row,
    Select,
    Spin,
    List,
    Descriptions,
    Card,
    Tag,
    Tooltip,
    Switch,
    Modal,
    ConfigProvider
} from 'antd';
import {Maincontainer} from "../../lib/styled";
import {
    LeftOutlined
} from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import _ from 'underscore';
import { Line, Pie, RadialBar } from '@ant-design/charts';
import {reduce, find, filter, get} from 'lodash';
import * as moment from "moment";
import PuntosTable from "./components/puntos/Table";
import PuntosEntity from "./components/puntos/Entity";
import { getEntityPuntos, getEntity } from '../../modules/clients-indas/actions';
import locale from "antd/es/locale/es_ES";
import PuntosFilters from "./components/puntos/Filters";
import PuntosActions from "./components/puntos/Actions";
import ClientsActions from "./components/Actions";

const { confirm } = Modal;

const renderDate = (dateStr, record, index) => {
    if ( ! dateStr ) {
        return ( '-' );
    }
    return (
        <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
            <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
        </Tooltip>);
}

class ClientsPuntosScreen extends React.Component {
    constructor( props ) {
        super( props )
        this.state = props.state != null ? props.state : {
            page: 1,
            selectedRowKeys: [],
            data: [],
            loading: false,
            count: 0,
            filters: {
            },
            codentidad_cbim: this.props.match.params.codentidad_cbim,
            sorter: {
                field: 'codcli_cbim',
                order: 'desc',
            },
            entity: false,
        };
        this.onChangeSorter = this.onChangeSorter.bind( this );
        this.onChangePage = this.onChangePage.bind( this );
        this.updateList = this.updateList.bind( this );
        this.setFilters = this.setFilters.bind( this );
        this.onSelectRowChange = this.onSelectRowChange.bind( this );
        this.loadEntity = this.loadEntity.bind( this );
        this.applyEntity = this.applyEntity.bind(this);
    }

    componentWillMount() {
        this.updateList();
        this.loadEntity();
    }

    onChangePage (page, pageSize) {
        this.setState( { page: page, selectedRowKeys: [] }, this.updateList )
    }
    onChangeSorter ( sorter ) {
        this.setState({ sorter: { field: sorter.field, order: sorter.order == 'ascend' ? 'ASC' : 'DESC' }} , this.updateList );
    }

    onSelectRowChange( selectedRowKeys ) {
        this.setState({ selectedRowKeys }, () => {
        })
    }
    setFilters( filters ) {
        this.setState({ filters: { ...filters }, page: 1, selectedRowKeys: [] }, this.updateList )
    }

    applyEntity ( entity ) {
        this.setState({entity})
    }

    loadEntity() {
        const { getEntity, match } = this.props;
        getEntity( {
            codentidad_cbim: match.params.codentidad_cbim,
            success: this.applyEntity,
            error: () => {
                this.setState( { entity: false })
            }
        })
    }

    updateList() {
        const { getEntityPuntos, match } = this.props;
        const { filters, page } = this.state;
        this.setState( { loading: true } );

        getEntityPuntos( {
            page: page,
            codentidad_cbim: match.params.codentidad_cbim,
            filters: {
                ...filters,
            },
            success: ( data, count ) => {
                this.setState( { data, count, loading: false } )
            },
            error: () => {
                this.setState( { data: [], count: 0, loading: false })
            }
        });
    }

    render() {
        const { loading, data, page, count, selectedRowKeys, entity, filters, codentidad_cbim } = this.state;
        const { history, match} = this.props;

        return ( <ConfigProvider locale={ locale }>
            <Maincontainer>
                <div className="table-indas table-indas-new">
                    <Button type="link" onClick={() => { this.props.history.push('/clientes/'+match.params.idcliente+'/expediente') }}>
                        <LeftOutlined /> Atrás
                    </Button>
                    { entity && ( <PuntosEntity entity={entity} /> ) }
                    { ! entity && (<Skeleton />) }
                    <h2 className="table-indas-title">Movimientos de puntos</h2>
                    <PuntosFilters
                        setFilters={ this.setFilters }
                        filters={ filters }
                    />

                    <PuntosActions
                        history={ history }
                        filters={ filters }
                        codentidad_cbim={ codentidad_cbim}
                        onReload={ this.updateList }
                    />
                    <hr />

                    <PuntosTable
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
        );
    };

}
ClientsPuntosScreen.propTypes = {
};

export default connect( ( state ) => ({
}), { getEntityPuntos, getEntity  } )( withRouter(ClientsPuntosScreen) );
