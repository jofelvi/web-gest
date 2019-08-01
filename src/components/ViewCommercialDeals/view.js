import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Table, Row, Col} from 'antd';
import './styles.css';
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
    },
    {
        title: 'Fecha de Inicio',
        dataIndex: 'fechainicio',
        key: 'fechainicio',
    },
    {
        title: 'Fecha Fin',
        dataIndex: 'fechafin',
        key: 'fechafin',
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
        key: 'x',
        render: () => <a href="javascript:;">Detalle</a>,
    },
    {
        title: '',
        dataIndex: '',
        key: 'x',
        render: () => <a href="javascript:;">Editar</a>,
    },
    {
        title: '',
        dataIndex: '',
        key: 'x',
        render: () => <a href="javascript:;">Agregar Productos</a>,
    },
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
    type
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
        {type === "Offers"? renderTable(listOffers): 
         type === "Agreements"? renderTable(listAgreements): 
         type === "Plans"? renderTable(listPlans): 
         type === "Campaigns"? renderTable(listCampaigns): 
         <div>sin resultados</div>}
    </div>
};
 

const renderTable= (items)=>{
    return <Table 
        className="commercial-deals-table" 
        dataSource={items} 
        columns={columnsToShow}
        expandedRowRender = {item => expandRow(item)}></Table>;
};
const expandRow = (item) => {
    return  <div className="commercial-deals-lines">
                <Col md={{span:24}}><h3 className="commercial-deals-lines-title">Lineas de Escalado</h3></Col>
                {item.lineasescalado.map(line => {
                    return  <Row gutter={6} className="commercial-deals-lines-row">
                                <Col md={{span:5, offset:1}}><label>Unidades Mínimas: </label>{line.unidadesmin}</Col>
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
    type: PropTypes.string.isRequired
}

export default ViewCommercialDeals;