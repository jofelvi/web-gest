import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Table, Switch} from 'antd';

var columnsUsers=[
    {
        title: 'Apellido 1',
        dataIndex: 'apellido1',
        key: 'apellido1',
        sorter: (a,b) => a.apellido1 - b.apellido1
    },
    {
        title: 'Apellido 2',
        dataIndex: 'apellido2',
        key: 'apellido2',
        sorter: (a,b) => a.apellido2 - b.apellido2
    },
    {
        title: 'Nombre',
        dataIndex: 'nomcli_cbim',
        key: 'nomcli_cbim',
        sorter: (a,b) => a.nomcli_cbim - b.nomcli_cbim
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a,b) => a.email - b.email
    },
    {
        title: 'Asociado',
        dataIndex: 'idestado',
        key: 'idestado',
        render: (colVal, record) => {}
    }
];

//methods
const getRender = (currentCommercialDeal, record) => {
    console.log("entra al render");
    if(currentCommercialDeal.clientes !== null && currentCommercialDeal.clientes !== undefined){
        const exist = currentCommercialDeal.clientes.filter((cliente) => {
            return cliente.idcliente === record.idcliente
        }).length > 0;

        if(exist){
            return <Switch defaultChecked/>
        }  
    }
    return <Switch/>
    
}
const change = (currentCommercialDeal,updateClientsFilter)=>{
    updateClientsFilter(true);
    columnsUsers.map((el)=>{
       if(el.dataIndex === 'idestado'){
            
            el.render = ({},record) =>{ return getRender(currentCommercialDeal, record)};
       }
       
        return el;
    });
   
}

//componet
const CommercialDealsUsers = ({
    currentCommercialDeal,
    users,
    updateClientsFilter,
    updateFilterOfClient
})=> {
    useEffect(()=>{
        if(!updateFilterOfClient){
             change(currentCommercialDeal, updateClientsFilter)
   
        } 
       
        
    },[currentCommercialDeal, users, updateFilterOfClient]);
    return (
        <div>
            <Table 
                className="commercial-deals-products"
                dataSource={users}
                onChange = {() => change(currentCommercialDeal,updateClientsFilter)}
                columns={columnsUsers}
                size='small'
                pagination={true}
                rowKey='idcliente'
                locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
            ></Table>
        </div>);
};
CommercialDealsUsers.propTypes = {
    currentCommercialDeal: PropTypes.object ,
    users:PropTypes.arrayOf(PropTypes.shape({}))
}

export default CommercialDealsUsers;
