import React, { useState, useEffect } from 'react';
import { ConfigProvider, Table, Tooltip, } from 'antd';
import * as moment from 'moment';
import '../../lib/styles.css';
import '../../styles.css'
import { useDispatch, useSelector } from 'react-redux';
import ResizableTable from '../shared/ResizableTable';
import PlanesCompraActions from "../../screens/CommercialDealsScreen/PlanesCompra/components/PlanesCompraActions";
import AcuerdosActions from './AcuerdosActions'


import Utils from '../../lib/utils';
import {
    Maincontainer,
    TableContainer,
} from '../../lib/styled';

import { Anchor } from 'antd';

import locale from "antd/es/locale/es_ES";
import "moment/locale/es";
import {
    getAcuerdosComerciales,
    getByIdAcuerdoComerciale,
    getCatalogoProductos,
    getSubmarcas
} from "../../modules/acuerdosComer/actions";

const { Link } = Anchor;

const dateFormat = 'DD/MM/YYYY';


moment.locale("es", {
    week: {
        dow: 1
    }
});

const AcuerdosComercialesTable = (props) => {

    const [loading, setLoading] = useState(false);
    const [selectedRowKeysState, setSelectedRowKeysState] = useState([]);
    const comercialDeals = useSelector((state) => state.commercialDeals.subBrands);
    const listAcuerdos = useSelector((state) => state.acuerdosComer.listAcuerdosCom);

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getAcuerdosComerciales())
        dispatch(getByIdAcuerdoComerciale())

    }, [])

    console.log(JSON.stringify(listAcuerdos))

    const invoices = [
        { active: false, customerEmail: 'joedoe@gmail.com', status: 'paid' },
        { active: false, customerEmail: 'sam@gmail.com', status: 'paid' },
        { active: true, customerEmail: 'michael@gmail.com', status: 'void' },
        { active: true, customerEmail: 'adam@gmail.com', status: 'paid' },
        { active: true, customerEmail: 'johndoe@gmail.com', status: 'open' }
    ]

    const filter = { status: 'paid' }

    const selectedFilterKeys = Object.keys(filter)

    const filteredInvoices = invoices.filter(invoice => selectedFilterKeys.every(key =>
        filter[key] === invoice[key]
    ))

    console.log("filteredInvoices", filteredInvoices)

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            width: 200,
        },

        {
            title: 'Fecha Inicio',
            dataIndex: 'fechainicio',
            key: 'fecha_inicio',
            width: 120,
            render: (dateStr, record, index) => (
                <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                    <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                </Tooltip>
            )
        },
        {
            title: 'Fecha Fin',
            dataIndex: 'fechafin',
            key: 'fecha_fin',
            width: 120,
            render: (dateStr, record, index) => (
                <Tooltip title={moment(dateStr).format('DD/MM/YYYY HH:mm')}>
                    <span>{moment(dateStr).format('DD/MM/YYYY')}</span>
                </Tooltip>
            )
        },
        {
            title: 'Uds Minimas',
            dataIndex: 'escalados',
            key: 'escalados',
            width: 110,
            render: (value, record, index) => (record.escalados[0].udsminimas)
        },
        {
            title: 'Descuento',
            dataIndex: 'descuento',
            key: 'descuento',
            width: 100,
            render: (text, record, index) => (Utils.renderFloat(record.escalados[0].descuento) + " %")
        },
        {
            title: 'Cod Cliente',
            dataIndex: 'codcli_cbim',
            key: 'codentidad',
            width: 80,
        },
        {
            title: 'Nombre Cliente',
            dataIndex: 'nomcli_cbim',
            key: 'nomentidad',
            width: 180,
        },
        {
            title: 'Delegado Comercial',
            dataIndex: 'delegado',
            key: 'delegadocomercial',
            width: 180,
        },
        {
            title: 'Estado',
            dataIndex: 'estado2',
            key: 'estado',
            width: 100,
        },
        {
            title: 'Renov. Auto.',
            dataIndex: 'ind_renovar',
            key: 'autorenovar',
            width: 80,
            render: (text, record, index) => (text ? 'Si' : 'No')
        },
    ];

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysState(selectedRowKeys)
    };

    return (
        <ConfigProvider locale={locale}>
            {console.log('comercialDeals', comercialDeals)}
            <Maincontainer>
                <div className="table-indas table-indas-new">

                    <TableContainer style={{ overflow: 'visible' }}>

                        <AcuerdosActions
                            selectedRowKeys={selectedRowKeysState}
                            updateSelectedRowKeys={(newSelectedRowKeys) => (setSelectedRowKeysState(prevState => [...prevState, newSelectedRowKeys]))}
                        />

                        <Table
                            columns={columns}
                            dataSource={listAcuerdos}
                            className="table"
                            pagination={{
                                total: listAcuerdos.length,
                                showSizeChanger: false,
                                position: 'both',
                                onChange: (page, pageSize) => {
                                    //this.setState( { page: page, selectedRowKeys: [] }, this.updateList )
                                }
                            }}
                            className="table"
                            onRow={(record, rowIndex) => {
                                return {
                                    key: record.idcondcomercial
                                };
                            }}
                            rowKey={'idcondcomercial'}
                            rowSelection={{ onChange: onSelectChange }}
                            tableLayout="auto"
                            scroll={{ x: 'calc(700px + 60%)' }}
                        />
                    </TableContainer>
                </div>
            </Maincontainer>
        </ConfigProvider>
    );

};


export default AcuerdosComercialesTable;