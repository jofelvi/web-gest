import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Switch, Layout } from 'antd';
import { String } from 'typescript-string-operations';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ButtonGroup from 'antd/lib/button/button-group';
import ItemActions from './ItemActions';
import FormCommercialDeal from '../FormCommercialDeal';
dayjs.extend(customParseFormat);

const { Content } = Layout;

//properties
const columnsToShow = [
    {
        title: 'ID',
        dataIndex: 'idcondcomercial',
        key: 'idcondcomercial',
        sorter: (a, b) => a.idcondcomercial - b.idcondcomercial,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a, b) => a.nombre - b.nombre,
        sortDirections: ['descend', 'ascend'],
    },
    // {
    //     title: 'Descripción',
    //     dataIndex: 'descripcion',
    //     key: 'descripcion'
    // },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        key: 'tipo',
        filters: [
            {
                text: 'Promoción',
                value: 'Promoción',
            },
            {
                text: 'Acuerdo Comercial',
                value: 'Acuerdo Comercial',
            },
            {
                text: 'Plan de Compra',
                value: 'Plan de Compra',
            },
            {
                text: 'Campaña',
                value: 'Campaña',
            },
        ],
        onFilter: (value, record) => record.tipo.indexOf(value) === 0,
    },
    {
        title: 'Fecha de Inicio',
        dataIndex: 'fechainicio',
        key: 'fechainicio',
        sorter: (a, b) => {
            const aDate = dayjs(a.fechainicio, 'DD/MM/YYYY').toDate();
            const bDate = dayjs(b.fechainicio, 'DD/MM/YYYY').toDate();
            if (aDate > bDate) {
                return aDate - bDate;
            } else {
                return bDate - aDate;
            }
        },
        sortDirections: ['descend', 'ascend'],
        render: (date) => dayjs(new Date(date)).format('DD/MM/YYYY'),
    },
    {
        title: 'Fecha Fin',
        dataIndex: 'fechafin',
        key: 'fechafin',
        sorter: (a, b) => {
            const aDate = dayjs(a.fechafin, 'DD/MM/YYYY').toDate();
            const bDate = dayjs(b.fechafin, 'DD/MM/YYYY').toDate();
            if (aDate > bDate) {
                return aDate - bDate;
            } else {
                return bDate - aDate;
            }
        },
        sortDirections: ['descend', 'ascend'],
        render: (date) => dayjs(new Date(date)).format('DD/MM/YYYY'),
    },
    // {
    //     title: 'Código Campaña',
    //     dataIndex: 'codcupon',
    //     key: 'codcupon'
    // },
    // {
    //     title: 'Margen',
    //     dataIndex: 'margen',
    //     key: 'margen',
    //     render: (data) => String.Format('{0}%',data)
    // },
    {
        title: 'Surtido',
        dataIndex: 'ind_surtido',
        key: 'ind_surtido',
        render: (data) => (data ? 'SI' : 'NO'),
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado_disp',
        filters: [
            {
                text: 'Borrador',
                value: 'Borrador',
            },
            {
                text: 'Activo',
                value: 'Activo',
            },
            {
                text: 'Inactivo',
                value: 'Inactivo',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.estado.indexOf(value) === 0,
        sorter: (a, b) => a.estado.length - b.estado.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: '',
        dataIndex: 'estado',
        key: 'estado',
        render: (estado, deal) =>
            estado === 'Borrador' ? (
                <div onClick={(ev) => changeState(ev)} disabled={deal.productos.length === 0 && deal.clientes.length === 0}>
                    Activar
                </div>
            ) : (
                <Switch
                    onChange={(ev) => {
                        changeState(ev);
                    }}
                    checked={estado === 'Activo'}></Switch>
            ),
    },
    {
        title: '',
        dataIndex: '',
        key: 'Actions',
        render: (deal) => <ItemActions key={String.Format('commercial-deals-{0}-actions', deal.id)} deal={deal} />,
    },
];
const columnsLines = [
    {
        title: 'Unidades Mínimas',
        dataIndex: 'udsminimas',
        key: 'udsminimas',
        sorter: (a, b) => a.udsminimas - b.udsminimas,
    },
    {
        title: 'Unidades Máximas',
        dataIndex: 'udsmaximas',
        key: 'udsmaximas',
        sorter: (a, b) => a.udsmaximas - b.udsmaximas,
    },
    {
        title: 'Descuento',
        dataIndex: 'descuento',
        key: 'descuento',
        sorter: (a, b) => a.descuento - b.descuento,
        render: (descuento) => String.Format('{0} %', descuento),
    },
    {
        title: 'Texto Equivalente',
        dataIndex: 'txtdescuento',
        key: 'txtdescuento',
    },
];

const changeState = (ev) => {};

//components
const ViewCommercialDeals = ({
    list,
    type,
    loadFamilies,
    loadSubFamilies,
    loadProducts,
    loadUsers,
    getUsersCount,
    loadBrands,
    loadSubBrands,
    loadDealTypes,
    showNewCommercialDeal,
    setCurrentCommercialDeal,
    token,
    setCommercialDealFormStep,
    setFormKey,
    setNewCommercialDeal,
    setAsociatedProducts,
    setAsociatedClients,
    setCcNotEditable,
}) => {
    const [loading, setLoading] = useState(true);

    const renderTable = (items, loading) => {
        return (
            <div className='table-indas'>
                <h2 className='table-indas-title'>Condiciones comerciales</h2>

                <ButtonGroup className='commercial-deals-top-actions'>
                    <Button
                        onClick={() => {
                            setFormKey();
                            getUsersCount({ emailComo: '' });
                            loadUsers({ page: 1, emailComo: '' });
                            setCurrentCommercialDeal({ productos: [], esscalados: [], clientes: [] });
                            setNewCommercialDeal(true);
                            showNewCommercialDeal(true);
                            setCommercialDealFormStep({ currentStep: 0 });
                            setCurrentCommercialDeal({ productos: [], esscalados: [], clientes: [] });
                            setAsociatedProducts({ isAsociatedProduct: false });
                            setAsociatedClients({ isAsociatedClient: false });
                            setCcNotEditable({ isNotEditable: false });
                        }}
                        hidden={loading}>
                        Nuevo
                    </Button>
                </ButtonGroup>

                <Table
                    className='commercial-deals-table'
                    dataSource={items}
                    columns={columnsToShow}
                    expandedRowRender={(item) => expandRow(item)}
                    rowKey='idcondcomercial'
                    pagination={{ position: 'both', pageSize: 20 }}
                    locale={{ filterConfirm: 'ok', filterReset: 'limpiar', filterTitle: 'filtro' }}
                    size='middle'
                    loading={loading}
                    scroll={{ x: true }}></Table>
            </div>
        );
    };
    const expandRow = (item) => {
        return (
            <div className='table-indas-expand'>
                <h4 className='table-indas-title'>Lineas</h4>
                <Table
                    className='commercial-deals-lines'
                    dataSource={item.escalados}
                    columns={columnsLines}
                    size='small'
                    pagination={false}
                    rowKey='idescalado'></Table>
            </div>
        );
    };

    useEffect(() => {
        if (list.length > 0) {
            setLoading(false);
        }
        loadFamilies();
        loadSubFamilies();
        loadProducts();
        loadBrands();
        loadSubBrands();
        getUsersCount();
        loadDealTypes();
    }, [list, token]);
    return (
        <div>
            {type === 'all' ? renderTable(list, loading) : <div>sin resultados</div>}
            <FormCommercialDeal />
        </div>
    );
};

//defs
ViewCommercialDeals.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    families: PropTypes.arrayOf(PropTypes.shape({})),
    subFamilies: PropTypes.arrayOf(PropTypes.shape({})),
    products: PropTypes.arrayOf(PropTypes.shape({})),
    users: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
    showNewCommercialDeal: PropTypes.func.isRequired,
    newCommercialDealVisible: PropTypes.bool,
    setCurrentCommercialDeal: PropTypes.func,
    loadFamilies: PropTypes.func,
    loadSubFamilies: PropTypes.func,
    loadProducts: PropTypes.func,
    loadBrands: PropTypes.func,
    loadSubBrands: PropTypes.func,
    loadUsers: PropTypes.func,
    loadDealTypes: PropTypes.func,
};

export default ViewCommercialDeals;

