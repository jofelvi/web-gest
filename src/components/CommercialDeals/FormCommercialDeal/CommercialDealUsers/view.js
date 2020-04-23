import React, { useEffect , useState} from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {Table, Switch, Col, Button, Row, Input } from 'antd';
import {Formik} from 'formik';
import { handleInput } from '../../../../lib/forms';
import { SearchOutlined } from '@ant-design/icons';
import { 
    ColAsociado,
    LabelAsociado
} from './styles'


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

const change = (currentCommercialDeal,updateClientsFilter, setUsersCommercialDeal, clientes, columnsUsers)=>{
    updateClientsFilter(true);
    columnsUsers.map((el)=>{
       if(el.dataIndex === 'idestado'){
            el.render = ({},record) =>{ 
           
                return <Switch
                            id = "clienteAsociado" 
                            checked= {clientes.find(cliente => cliente.idcliente === record.idcliente)} 
                            onChange = {(e)=>{
                                //console.log("on change")
                                updateClientsFilter(true);
                                const clientesAsociados = getSelectedUsers(clientes, record);
                                setUsersCommercialDeal({clientes: clientesAsociados })}}/>
                            };
            
            }
       
        return el;
    });
   
}
const setByDefaultAsocietedClientFilter = (isNew, setAsociatedClients) => {
 
    if((isNew)){
        setAsociatedClients({isAsociatedClient: false})
    }else{
        setAsociatedClients({isAsociatedClient: true})
    } 

}

//componet
const CommercialDealsUsers = ({
    currentCommercialDeal,
    users,
    usersMeta,
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
    loadUsers,
    emailComo,
    getUsersCount,
    isAsociatedClient,
    setAsociatedClients,
    isNew,
    idCommercialDeal
})=> {
    useEffect(()=>{
        if(!updateFilterOfClient){
            change(currentCommercialDeal, updateClientsFilter, setUsersCommercialDeal, clientes, columnsUsers)
        } 
       
        updateClientsFilter(false);       
    },[currentCommercialDeal, updateFilterOfClient, clientes]);
    useEffect(()=>{
        setByDefaultAsocietedClientFilter(isNew, setAsociatedClients)
         
    },[isNew]);


    const getColumnSearchProps = (dataIndex, loadUsers, getUsersCount) => ({
        filterDropdown: ({ confirm }) => (
            <Formik
                initialValues={{ emailComo: '' }}
                onSubmit={(values, {resetForm}) => { 
                getUsersCount({emailComo: values.emailComo})   
                loadUsers({page: 1, emailComo: values.emailComo})
                resetForm({});
                confirm();                     
            }}        
            >
            {(props) => {
                const {
                    values,
                    setFieldValue,
                    handleSubmit,
                    handleReset,
                     errors,
                } = props;
                return(
                    <div style={{ padding: 8 }}>
                        <Input
                            id= "emailComo"
                            placeholder={`Buscar ${dataIndex}`}
                            value={values.emailComo  || ' '  }
                            onChange={handleInput(setFieldValue, 'emailComo')}
                            style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Buscar
                        </Button>
                        <Button 
                            onClick={() => {
                                getUsersCount({emailComo: ''});   
                                loadUsers({page: 1, emailComo: ''});
                                confirm();
                                handleReset();
                            }} 
                            size="small" 
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </div>
                )    
            }}
            </Formik>
        ),
    });


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
            ...getColumnSearchProps('email', loadUsers, getUsersCount),
            sorter: (a,b) => a.email - b.email
        },
        {
            title: 'Asociado',
            dataIndex: 'idestado',
            key: 'idestado',
            render: ( _, record) => ( 
                        <Switch
                            id = "clienteAsociado" 
                            checked= {clientes.find(cliente => cliente.idcliente === record.idcliente)} 
                            onChange = {(e)=>{
                                //console.log("on change")
                                updateClientsFilter(true);
                                const clientesAsociados = getSelectedUsers(clientes, record);
                                setUsersCommercialDeal({clientes: clientesAsociados })
                        }}/>
                    )
        }
    ];

    const id = currentCommercialDeal && currentCommercialDeal.idcondcomercial

    const submitClients = (productos, escalados, clientes, id) =>{
        editCommercialDeal({id, values: {productos, escalados, clientes}})
    }

    const handleToggle = (isAssociated) =>{
        if(isAssociated){
            setAsociatedClients({isAsociatedClient: false})
        }else if(!isAssociated){
            setAsociatedClients({isAsociatedClient: true})
        }
    }

    const paginationOptions =(emailSearched) => ({
        onChange: (page) => {
            loadUsers({page: page, emailComo: emailSearched})
        },
        total: usersMeta.total,
        current: usersMeta.page,
        pageSize: usersMeta.pageSize,
    });
    const paginationAsociatedClientsOptions =(emailSearched) => ({
        total: clientes.length,
        pageSize: usersMeta.pageSize,
    });
    return (
     
        <div>
             { commercialDealType != 0 ?
             <div>
                <Row>
                    <ColAsociado>
                        <LabelAsociado>
                            Clientes asociados
                        </LabelAsociado>
                        <Switch
                        id="filterAsociado" 
                        checked={isAsociatedClient} 
                        onChange={() => (handleToggle(isAsociatedClient))}/>
                    </ColAsociado>
                </Row>
                <Table 
                    className="commercial-deals-products"
                    dataSource={isAsociatedClient ? clientes : users}
                    onChange = {(pagination, filters, sorter, data) => change(currentCommercialDeal,updateClientsFilter, setUsersCommercialDeal, clientes, columnsUsers)}
                    columns={columnsUsers}
                    size='small'
                    loading={usersMeta.searchLoading}
                    pagination={isAsociatedClient ? paginationAsociatedClientsOptions(emailComo) : paginationOptions(emailComo)}
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
                        { currentCommercialDeal.estado === "Borrador" && (
                            <Button type="primary" htmlType="submit" onClick={(e)=>(submitClients(productos, escalados, clientes, id))}>
                                Guardar
                            </Button>
                        )}
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
