import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Table, Switch} from 'antd';

var columnsProducts=[
    {
        title: 'Familia',
        dataIndex: 'familia',
        key: 'familia',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Sub Familia',
        dataIndex: 'subfamilia',
        key: 'subfamilia',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcioncorta',
        key: 'descripcioncorta',
        sorter: (a,b) => a.unidadesmin - b.unidadesmin
    },
    {
        title: 'Estado',
        dataIndex: 'indactivo',
        key: 'indactivo',
        filters: [
            {
                text:'Activo',
                value:true
            },
            {
                text:"Inactivo",
                value:false
            }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.indactivo == value,
        render: (indactivo) => <Switch checked={indactivo}></Switch>
    }
];


const CommercialDealsUsers = ({
    currentCommercialDeal
})=> {
    useEffect(()=>{
    },[currentCommercialDeal]);
    return (
        <div>
            <Table 
                className="commercial-deals-products"
                dataSource={currentCommercialDeal.products}
                columns={columnsProducts}
                size='small'
                pagination={true}
                rowKey='codindas'
                locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
            ></Table>
        </div>);
};
CommercialDealsUsers.propTypes = {
    currentCommercialDeal: PropTypes.object 
}

export default CommercialDealsUsers;
