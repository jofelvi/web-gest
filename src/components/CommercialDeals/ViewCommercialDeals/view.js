import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Col, Button, Switch} from 'antd';
import './styles.css';
import { String} from 'typescript-string-operations';
import * as dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ButtonGroup from 'antd/lib/button/button-group';
import ItemActions from './ItemActions';
import FormCommercialDeal from '../FormCommercialDeal';
dayjs.extend(customParseFormat)

const columnsToShow = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a,b) => a.id - b.id,
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
        dataIndex: 'tipocondicion',
        key: 'tipocondicion',
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
        onFilter: (value, record) => record.tipocondicion.indexOf(value) === 0,
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
    },
    {
        title: 'Código Campaña',
        dataIndex: 'codigocampania',
        key: 'codigocampania',
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
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
        sortDirections: ['descend', 'ascend'],
        render: (estado,deal) => estado === 'Borrador'? <a disabled={!deal.products}>Activar</a> : <Switch checked={estado === 'Activo'}></Switch>
    },
    {
        title: '',
        dataIndex: '',
        key: 'Actions',
        render: (deal) => <ItemActions key={String.Format('commercial-deals-{0}-actions',deal.id)} deal={deal}/>
    }
]
const ViewCommercialDeals = ({
    list,
    type,
    showNewCommercialDeal,
    setCurrentCommercialDeal
}) =>{
    useEffect(()=>{
    },[list]);
    return <div>
        <ButtonGroup className="commercial-deals-top-actions">
            <Button onClick={()=> {
                showNewCommercialDeal(true);
                setCurrentCommercialDeal({fechafin:new Date(),fechainicio:new Date(), estado:'Borrador'});
            }}>Nuevo</Button>
            <Button>Eliminar</Button>
        </ButtonGroup>
        {type === "all"? renderTable(list):
         <div>sin resultados</div>}
         <FormCommercialDeal />
    </div>
};
 

const renderTable= (items)=>{
    return <Table 
        className="commercial-deals-table" 
        dataSource={items} 
        columns={columnsToShow}
        expandedRowRender = {item => expandRow(item)}
        rowSelection={rowSelection}
        rowKey="id"
        pagination={{position:'both'}}
        locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
        size="middle"></Table>;
};
const rowSelection = {
  };

const columnsLines = [
    {
        title: 'Unidades Mínimas',
        dataIndex: 'unidadesmin',
        key: 'unidadesmin',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Unidades Máximas',
        dataIndex: 'unidadesmax',
        key: 'unidadesmax',
        sorter: (a,b) => a.unidadesmax - b.unidadesmax
    },
    {
        title: 'Descuento',
        dataIndex: 'descuesto',
        key: 'descuesto',
        sorter: (a,b) => a.descuesto - b.descuesto,
        render: (descuesto) => String.Format('{0} %',descuesto)
    },
    {
        title: 'Texto Equivalente',
        dataIndex: 'textoequivalencia',
        key: 'textoequivalencia'
    },
]
const expandRow = (item) => {
    return (
        <Table 
        className="commercial-deals-lines"
        dataSource={item.lineasescalado}
        columns={columnsLines}
        size='small'
        pagination={false}
        rowKey='id'
        >
        </Table>
    )
};

ViewCommercialDeals.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
    showNewCommercialDeal: PropTypes.func.isRequired,
    newCommercialDealVisible: PropTypes.bool,
    setCurrentCommercialDeal: PropTypes.func
}

export default ViewCommercialDeals;