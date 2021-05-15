import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../../lib/styled";
import ResizableTable from "../../../shared/ResizableTable";

const columns = [
    {
        title: 'Año', dataIndex: 'año', key: 'ano', width: 180,
    },
    {
        title: 'Grupo', dataIndex: 'nombre', key: 'nombre', width: 180,
    },
    {
        title: 'Unidades', dataIndex: 'unidades', key: 'unidades', width: 180,
    },
];


const TablaPedidosPorGrupoAno = ({loading, data}) => {
    return ( <TableContainer style={{ overflow: 'visible'}}>
        <ResizableTable
            dataSource={ data }
            className="table"
            loading={ loading }
            columns={ columns }
        />
    </TableContainer>);
}

export default TablaPedidosPorGrupoAno;
