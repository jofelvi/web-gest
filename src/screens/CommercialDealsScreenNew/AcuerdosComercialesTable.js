import React, { useState, useEffect } from 'react';
import { ConfigProvider, Table, Tooltip } from 'antd';
import * as moment from 'moment';
import '../../lib/styles.css';
import '../../styles.css';
import { useDispatch, useSelector } from 'react-redux';
import AcuerdosActions from './AcuerdosActions';
import PlanesCompraFiltersNew from './FilterPlanesNew';

import Utils from '../../lib/utils';
import { Maincontainer, TableContainer } from '../../lib/styled';
import locale from 'antd/es/locale/es_ES';
import 'moment/locale/es';
import { getAcuerdosComerciales, getDelegado } from '../../modules/acuerdosComer/actions';

moment.locale('es', {
    week: {
        dow: 1,
    },
});

const AcuerdosComercialesTable = (props) => {
    const [selectedRowKeysState, setSelectedRowKeysState] = useState([]);
    const comercialDeals = useSelector((state) => state.commercialDeals.subBrands);
    const listAcuerdos = useSelector((state) => state.acuerdosComer.listAcuerdosCom);
    const [listaAcuerdosFilter, setListaAcuerdosFilter] = useState([]);
    const filterActive = useSelector((state) => state.acuerdosComer.filterActive);
    const filterDataTableAC = useSelector((state) => state.acuerdosComer.filterDataTableAC);
    const dispatch = useDispatch();
    const [updateEstados, setUpdateEstados] = useState(false);

    useEffect(() => {
        dispatch(getAcuerdosComerciales());
        dispatch(getDelegado());
        setSelectedRowKeysState([]);
    }, [updateEstados]);

    useEffect(() => {
        setListaAcuerdosFilter(listAcuerdos);
    }, [listAcuerdos, filterActive]);

    useEffect(() => {}, [selectedRowKeysState]);

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
            ),
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
            ),
        },
        {
            title: 'Pedido mínimo',
            dataIndex: 'escalados',
            key: 'escalados',
            width: 110,
            render: (value, record, index) => record.escalados[0].udsminimas,
        },
        {
            title: 'Descuento',
            dataIndex: 'descuento',
            key: 'descuento',
            width: 100,
            render: (text, record, index) => Utils.renderFloat(record.escalados[0].descuento) + ' %',
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
            dataIndex: 'estado',
            key: 'estado',
            width: 100,
        },
        /* {
            title: 'Renov. Auto.',
            dataIndex: 'ind_renovar',
            key: 'autorenovar',
            width: 80,
            render: (text, record, index) => (text ? 'Si' : 'No')
        },*/
    ];

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeysState(selectedRowKeys);
    };

    const onFilterArray = (querySearch) => {
        console.log('json para filtrar: ', querySearch);
    };

    const resetFilter = () => {
        setListaAcuerdosFilter(listAcuerdos);
    };

    return (
        <ConfigProvider locale={locale}>
            <Maincontainer>
                <div className='table-indas table-indas-new'>
                    <TableContainer style={{ overflow: 'visible' }}>
                        <h2 className='table-indas-title'>Acuerdos Comerciales</h2>
                        <PlanesCompraFiltersNew onFilterArray={onFilterArray} resetFilter={resetFilter} />

                        <AcuerdosActions
                            selectedRowKeys={selectedRowKeysState}
                            updateSelectedRowKeysNew={() => setSelectedRowKeysState([])}
                            setUpdateEstados={() => setUpdateEstados(!updateEstados)}
                        />

                        <hr />
                        <Table
                            columns={columns}
                            dataSource={filterActive ? filterDataTableAC : listaAcuerdosFilter}
                            className='table'
                            pagination={{
                                total: filterActive ? filterDataTableAC.length : listaAcuerdosFilter.length,
                                showSizeChanger: false,
                                position: 'both',
                                onChange: (page, pageSize) => {
                                    setSelectedRowKeysState([]);
                                },
                            }}
                            className='table'
                            onRow={(record, rowIndex) => {
                                return {
                                    key: record.idcondcomercial,
                                };
                            }}
                            rowKey={'idcondcomercial'}
                            rowSelection={{ onChange: onSelectChange }}
                            tableLayout='auto'
                            scroll={{ x: 'calc(700px + 60%)' }}
                        />
                    </TableContainer>
                </div>
            </Maincontainer>
        </ConfigProvider>
    );
};

export default AcuerdosComercialesTable;

