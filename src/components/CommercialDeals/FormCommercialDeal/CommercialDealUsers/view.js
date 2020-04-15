import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Table, Switch, Col, Button, Row} from 'antd';

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
        render: () => ( <Switch/>  )
    }
];

//methods
const getSelectedUsers = (clientes, record ) => {
    if(!clientes.length){
        return [{idcliente: record.idcliente, nombre: record.nombre}];
    }else{
        const clientesFiltered = clientes.filter( cliente => cliente.idcliente !== record.idcliente )
       if(clientes.length === clientesFiltered.length ){
            return [...clientes, {idcliente: record.idcliente, nombre: record.nombre }];
        }
       
        return clientesFiltered;
    }    
  
}

const change = (currentCommercialDeal,updateClientsFilter, setUsersCommercialDeal, clientes)=>{
    updateClientsFilter(true);
    columnsUsers.map((el)=>{
       if(el.dataIndex === 'idestado'){
            el.render = ({},record) =>{ 
           
                return <Switch
                    id = "clienteAsociado" 
                    checked= {clientes.find(cliente => cliente.idcliente === record.idcliente)} 
                    onChange = {(e)=>{
                        updateClientsFilter(true);
                        const clientesAsociados = getSelectedUsers(clientes, record);
                        setUsersCommercialDeal({clientes: clientesAsociados })}}/>
                    };
            
            }
       
        return el;
    });
   
}

//componet
const CommercialDealsUsers = ({
    currentCommercialDeal,
    users,
    updateClientsFilter,
    updateFilterOfClient,
    onClickNext,
    onClickBack,
    currentStep,
    commercialDealType,
    editCommercialDeal,
    setUsersCommercialDeal,
    productos,
    escalados,
    clientes,
    idCommercialDeal
})=> {
    useEffect(()=>{
        if(!updateFilterOfClient){
             change(currentCommercialDeal, updateClientsFilter, setUsersCommercialDeal, clientes)
        } 
        updateClientsFilter(false);       
    },[currentCommercialDeal, users, updateFilterOfClient, setUsersCommercialDeal, clientes]);
    
    const submitClients = (productos, escalados, clientes, id) =>{
        editCommercialDeal({id, values: {productos, escalados, clientes}})
    }
    return (
       
        <div>
             { commercialDealType != 0 ?
             <div>
            <Table 
                className="commercial-deals-products"
                dataSource={users}
                onChange = {(pagination, filters, sorter, data) => change(currentCommercialDeal,updateClientsFilter, setUsersCommercialDeal, clientes)}
                columns={columnsUsers}
                size='small'
                pagination={true}
                rowKey='idcliente'
                locale={{filterConfirm:'ok', filterReset:'limpiar',filterTitle:'filtro'}}
            ></Table>
             <Row gutter={8} type="flex">
                        {currentStep > 0 ?  
                            <Col>
                                <Button type="primary" htmlType="submit" onClick={onClickBack}>
                                    Atrás
                                </Button>
                            </Col>
                        : ''}
                        
                            <Col> 
                                <Button type="primary" htmlType="submit" onClick={onClickNext}>
                                    Siguiente
                                </Button>
                            </Col>
                            <Col> 
                                <Button type="primary" htmlType="submit" onClick={(e)=>(submitClients(productos, escalados, clientes, idCommercialDeal))}>
                                    Guardar
                                </Button>
                            </Col>
                        
                    </Row>
                    </div>
                    : <span>'no aplica'</span>}
        </div>);
};
CommercialDealsUsers.propTypes = {
    currentCommercialDeal: PropTypes.object ,
    users:PropTypes.arrayOf(PropTypes.shape({}))
}

export default CommercialDealsUsers;
