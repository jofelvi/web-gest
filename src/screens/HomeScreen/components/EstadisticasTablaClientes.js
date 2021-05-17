import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../lib/styled";
import ResizableTable from "../../shared/ResizableTable";
import {LIMIT} from "../../../constants";
import {estados} from '../../../modules/clients-indas/api';
import {filter } from 'lodash';
import TablaClientesAno from './Estadisticas/TablaClientesAno';
import TablaClientesMes from './Estadisticas/TablaClientesMes';

const EstadisticasTablaClientes = ({loading, filters, data}) => {
    if ( filters && 'mes' === filters.grupo ) {
        return ( <TableContainer style={{ overflow: 'visible'}}>
            <TablaClientesMes data={data} loading={loading} />
        </TableContainer>)
    }
    return ( <TableContainer style={{ overflow: 'visible'}}>
        <TablaClientesAno data={data} loading={loading} />
    </TableContainer>);
}

export default  connect(
    state => ({
    }),
    {  }
)( EstadisticasTablaClientes );
