import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../lib/styled";
import ResizableTable from "../../shared/ResizableTable";
import {LIMIT} from "../../../constants";
import TablaPedidosMes from "./Estadisticas/TablaPedidosMes";
import TablaPedidosAno from "./Estadisticas/TablaPedidosAno";

const EstadisticasTablaPedidos = ({loading, filters, data}) => {
    if ( filters && 'mes' === filters.grupo ) {
        return ( <TableContainer style={{ overflow: 'visible'}}>
            <TablaPedidosMes data={data} loading={loading} />
        </TableContainer>)
    }
    return ( <TableContainer style={{ overflow: 'visible'}}>
        <TablaPedidosAno data={data} loading={loading} />
    </TableContainer>);
}

export default  connect(
    state => ({
    }),
    {  }
)( EstadisticasTablaPedidos );
