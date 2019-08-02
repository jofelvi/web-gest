import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Col, Button} from 'antd';
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
    }/*,
    {
        title: 'Tipo de Condición',
        dataIndex: 'tipocondicion',
        key: 'tipocondicion',
    }*/,
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
    },
    {
        title: '',
        dataIndex: '',
        key: 'Actions',
        render: (deal) => <ItemActions key={String.Format('commercial-deals-{0}-actions',deal.id)} deal={deal}/>
    }
]
const ViewCommercialDeals = ({
    loadOffers,
    loadAgreements,
    loadPlans,
    loadCampaigns,
    list,
    listAgreements,
    listOffers,
    listPlans,
    listCampaigns,
    type,
    showNewCommercialDeal,
    newCommercialDealVisible,
    setCurrentCommercialDeal
}) =>{
    useEffect(()=>{
        if(list != null){ 
            loadCampaigns(list);
            loadOffers(list);
            loadAgreements(list);
            loadPlans(list);
        }
    },[list, loadPlans, loadCampaigns, loadOffers, loadAgreements]);
    return <div>
        <ButtonGroup className="commercial-deals-top-actions">
            <Button onClick={()=> {
                showNewCommercialDeal(true);
                setCurrentCommercialDeal({});
            }}>Nuevo</Button>
            <Button>Eliminar</Button>
        </ButtonGroup>
        {type === "Offers"? renderTable(listOffers): 
         type === "Agreements"? renderTable(listAgreements): 
         type === "Plans"? renderTable(listPlans): 
         type === "Campaigns"? renderTable(listCampaigns): 
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
        rowKey="id"></Table>;
};
const rowSelection = {
  };
const expandRow = (item) => {
    return  <div className="commercial-deals-lines" key={String.Format('commercial-deals-lines-{0}',item.id)}>
                <Col md={{span:24}}><h3 className="commercial-deals-lines-title">Lineas de Escalado</h3></Col>
                {item.lineasescalado.map((line,i) => {
                    return  <Row gutter={6} className="commercial-deals-lines-row" key={String.Format('commercial-deals-lines-{0}-line-{1}',item.id,i)}>
                                <Col md={{span:6}}><label>Unidades Mínimas: </label>{line.unidadesmin}</Col>
                                <Col md={{span:6}}><label>Unidades Máximas: </label>{line.unidadesmax}</Col>
                                <Col md={{span:6}}><label>Descuento: </label>{line.descuesto}</Col>
                                <Col md={{span:6}}><label>Texto Equivalente: </label>{line.textoequivalencia}</Col>
                            </Row>;
                })}
            </div>
};

ViewCommercialDeals.propTypes = {
    loadOffers: PropTypes.func.isRequired,
    loadAgreements: PropTypes.func.isRequired,
    loadPlans: PropTypes.func.isRequired,
    loadCampaigns: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({})),
    listAgreements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listOffers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listPlans: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    listCampaigns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    type: PropTypes.string.isRequired,
    showNewCommercialDeal: PropTypes.func.isRequired,
    newCommercialDealVisible: PropTypes.bool,
    setCurrentCommercialDeal: PropTypes.func
}

export default ViewCommercialDeals;