import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Table, Button, Switch} from 'antd';
import './styles.css';
import { String} from 'typescript-string-operations';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ButtonGroup from 'antd/lib/button/button-group';
import ItemActions from './ItemActions';
import FormCommercialDeal from '../FormCommercialDeal';
dayjs.extend(customParseFormat)

//properties
const columnsToShow = [
    {
        title: 'ID',
        dataIndex: 'idcondcomercial',
        key: 'idcondcomercial',
        sorter: (a,b) => a.idcondcomercial - b.idcondcomercial,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
        key: 'descripcion',
    },
    {
        title: 'Tipo de Condición',
        dataIndex: 'tipo',
        key: 'tipo',
        filters: [
            {
                text:'Promoción',
                value:'Promoción'
            },
            {
                text:'Acuerdo Comercial',
                value:'Acuerdo Comercial'
            },
            {
                text:'Plan de Compra',
                value:'Plan de Compra'
            },
            {
                text:'Campaña',
                value:'Campaña'
            }
        ],
        onFilter: (value, record) => record.tipo.indexOf(value) === 0,
    },
    {
        title: 'Fecha de Inicio',
        dataIndex: 'fechainicio',
        key: 'fechainicio',
        sorter: (a,b) => {
            const aDate = dayjs(a.fechainicio,'DD/MM/YYYY').toDate();
            const bDate = dayjs(b.fechainicio,'DD/MM/YYYY').toDate();
            if(aDate > bDate){
                return aDate-bDate
            } else {
                return bDate-aDate
            }
        },
        sortDirections: ['descend', 'ascend'],
        render: (date) => dayjs(new Date(date)).format('DD/MM/YYYY')
    },
    {
        title: 'Fecha Fin',
        dataIndex: 'fechafin',
        key: 'fechafin',
        sorter: (a,b) => {
            const aDate = dayjs(a.fechafin,'DD/MM/YYYY').toDate();
            const bDate = dayjs(b.fechafin,'DD/MM/YYYY').toDate();
            if(aDate > bDate){
                return aDate-bDate
            } else {
                return bDate-aDate
            }
        },
        sortDirections: ['descend', 'ascend'],
        render: (date) => dayjs(new Date(date)).format('DD/MM/YYYY')
    },
    {
        title: 'Código Campaña',
        dataIndex: 'codcupon',
        key: 'codcupon',
    },
    {
        title: 'Margen',
        dataIndex: 'margen',
        key: 'margen',
        render: (data) => String.Format('{0}%',data)
    },
    {
        title: 'Surtido',
        dataIndex: 'ind_surtido',
        key: 'ind_surtido',
        render: (data) => data ? 'SI': 'NO'
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado_disp',
        filters: [
            {
                text:'Borrador',
                value:'Borrador'
            },
            {
                text:'Activo',
                value:'Activo'
            },
            {
                text:'Inactivo',
                value:'Inactivo'
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.estado.indexOf(value) === 0,
        sorter: (a,b) => a.estado.length - b.estado.length,
        sortDirections: ['descend', 'ascend']
    },
    {
        title: '',
        dataIndex: 'estado',
        key: 'estado',
        render: (estado,deal) => estado === 'Borrador'? <div onClick={(ev) => changeState(ev)} disabled={deal.productos.length === 0 && deal.clientes.length === 0}>Activar</div> : <Switch onChange={(ev) => {changeState(ev)}} checked={estado === 'Activo'}></Switch>
    },
    {
        title: '',
        dataIndex: '',
        key: 'Actions',
        render: (deal) => <ItemActions key={String.Format('commercial-deals-{0}-actions',deal.id)} deal={deal}/>
    }
]
const columnsLines = [
    {
        title: 'Unidades Mínimas',
        dataIndex: 'udsminimas',
        key: 'udsminimas',
        sorter: (a,b) => a.udsminimas - b.udsminimas
    },
    {
        title: 'Unidades Máximas',
        dataIndex: 'udsmaximas',
        key: 'udsmaximas',
        sorter: (a,b) => a.udsmaximas - b.udsmaximas
    },
    {
        title: 'Descuento',
        dataIndex: 'descuento',
        key: 'descuento',
        sorter: (a,b) => a.descuento - b.descuento,
        render: (descuento) => String.Format('{0} %',descuento)
    },
    {
        title: 'Texto Equivalente',
        dataIndex: 'txtdescuento',
        key: 'txtdescuento'
    },
]

//methods
const changeState = (ev) =>
{
}
const renderTable= (items)=>{
    return <Table 
        className="commercial-deals-table" 
        dataSource={items} 
        columns={columnsToShow}
        expandedRowRender = {item => expandRow(item)}
        rowKey="idcondcomercial"
        pagination={{position:'both'}}
        locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
        size="middle"></Table>;
};
const expandRow = (item) => {
    return (
        <Table 
        className="commercial-deals-lines"
        dataSource={item.escalados}
        columns={columnsLines}
        size='small'
        pagination={false}
        rowKey='idescalado'
        >
        </Table>
    )
};

//components
const ViewCommercialDeals = ({
    list,
    type,
    loadFamilies,
    loadSubFamilies,
    loadProducts,
    loadUsers,
    loadBrands,
    loadSubBrands,
    loadDealTypes,
    showNewCommercialDeal,
    setCurrentCommercialDeal,
    token
}) =>{
    useEffect(()=>{
        loadFamilies(); 
        loadSubFamilies();
        loadProducts();
        loadBrands();
        loadSubBrands();
        loadUsers();  
        loadDealTypes();
    },[list, token,loadFamilies, loadSubFamilies, loadProducts, loadBrands, loadSubBrands, loadUsers,loadDealTypes]);
    return <div>
        <ButtonGroup className="commercial-deals-top-actions">
            <Button onClick={()=> {
                showNewCommercialDeal(true);
                setCurrentCommercialDeal({fechafin:new Date(),fechainicio:new Date(), estado:'Borrador'});
            }}>Nuevo</Button>
        </ButtonGroup>
        {type === "all"? renderTable(list):
         <div>sin resultados</div>}
         <FormCommercialDeal />
    </div>
};

//defs
ViewCommercialDeals.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    families:PropTypes.arrayOf(PropTypes.shape({})),
    subFamilies:PropTypes.arrayOf(PropTypes.shape({})),
    products:PropTypes.arrayOf(PropTypes.shape({})),
    users:PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
    showNewCommercialDeal: PropTypes.func.isRequired,
    newCommercialDealVisible: PropTypes.bool,
    setCurrentCommercialDeal: PropTypes.func,
    loadFamilies:PropTypes.func,
    loadSubFamilies:PropTypes.func,
    loadProducts:PropTypes.func,
    loadBrands:PropTypes.func,
    loadSubBrands:PropTypes.func,
    loadUsers:PropTypes.func,
    loadDealTypes: PropTypes.func
}

export default ViewCommercialDeals;