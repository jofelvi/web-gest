import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Checkbox, Switch, DatePicker, Input, Button, Col, Row, Select, Tooltip, ConfigProvider} from 'antd';
import * as moment from "moment";
import Utils from "../../../../lib/utils";
import locale from "antd/es/locale/es_ES";
import {Maincontainer, TableContainer} from "../../../../lib/styled";
import ResizableTable from "../../../shared/ResizableTable";
import {InfoCircleOutlined} from "@ant-design/icons";

const columns = [
    {
        title: 'Año', dataIndex: 'año', key: 'ano', width: 180,
    },
    {
        title: 'Altas', dataIndex: 'altas', key: 'altas', width: 180,
    },
    {
        title: 'Cotillas', dataIndex: 'cotillas', key: 'cotillas', width: 180,
    },
    {
        title: ( <Tooltip title="Entidades que tienen pedidos en el periodo de consulta.">Activas <InfoCircleOutlined /></Tooltip>), dataIndex: 'activas', key: 'activas', width: 180,
    },
];


const TablaClientesAno = ({loading, data}) => {
    return ( <TableContainer style={{ overflow: 'visible'}}>
        <ResizableTable
            dataSource={ data }
            className="table"
            loading={ loading }
            columns={ columns }
        />
    </TableContainer>);
}

export default TablaClientesAno;