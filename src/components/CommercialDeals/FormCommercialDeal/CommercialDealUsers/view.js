import React, { useEffect , useState} from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import {Table, Switch, Col, Button, Row, Input } from 'antd';
import {Formik} from 'formik';
import { handleInput } from '../../../../lib/forms';
import { SearchOutlined } from '@ant-design/icons';

//import getColumnSearchProps  from './SearchEmail';


// const getColumnSearchProps = dataIndex => ({
//     filterDropdown: ({valueEmail, loadUsers}) => (
//         <Formik
//                 onSubmit={(values) => { 
//                     console.log("values", values)   
//                     loadUsers({page: 1, emailComo: ''})       
                    
//                 }}
//             >
//             {(props) => {

//                 const {
//                     values,
//                     setFieldValue,
//                     handleSubmit,
//                     errors,
//                 } = props;
//             return(
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={node => {
//            console.log(node);
//           }}
//           id= "searchEmail"
//           placeholder={`Buscar ${dataIndex}`}
//           value={values.searchEmail}
//           onChange={handleInput(setFieldValue, 'searchEmail')}
//          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ width: 188, marginBottom: 8, display: 'block' }}
//         />
//         <Button
//           type="primary"
//           onClick={handleSubmit}
//           icon={<SearchOutlined />}
//           size="small"
//           style={{ width: 90, marginRight: 8 }}
//         >
//           Search
//         </Button>
//         <Button 
//         // onClick={() => handleReset(clearFilters)} 
//         size="small" 
//         style={{ width: 90 }}>
//           Reset
//         </Button>
//       </div>)}}
//       </Formik>
//     ),
//   });


// var columnsUsers=[
//     {
//         title: 'Apellido 1',
//         dataIndex: 'apellido1',
//         key: 'apellido1',
//         sorter: (a,b) => a.apellido1 - b.apellido1
//     },
//     {
//         title: 'Apellido 2',
//         dataIndex: 'apellido2',
//         key: 'apellido2',
//         sorter: (a,b) => a.apellido2 - b.apellido2
//     },
//     {
//         title: 'Nombre',
//         dataIndex: 'nomcli_cbim',
//         key: 'nomcli_cbim',
//         sorter: (a,b) => a.nomcli_cbim - b.nomcli_cbim
//     },
//     {
//         title: 'Email',
//         dataIndex: 'email',
//         key: 'email',
//         ...getColumnSearchProps('email'),
//         sorter: (a,b) => a.email - b.email
//     },
//     {
//         title: 'Asociado',
//         dataIndex: 'idestado',
//         key: 'idestado',
//         render: () => ( <Switch/>  )
//     }
// ];

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
                                console.log("on change")
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
    loadUsersByEmail,
    idCommercialDeal
})=> {
    useEffect(()=>{
        if(!updateFilterOfClient){
            change(currentCommercialDeal, updateClientsFilter, setUsersCommercialDeal, clientes, columnsUsers)
        } 
       
        updateClientsFilter(false);       
    },[currentCommercialDeal, updateFilterOfClient, clientes]);
console.log("emailComo", emailComo)
const getColumnSearchProps = (dataIndex, loadUsers, getUsersCount) => ({
    filterDropdown: ({ confirm, clearFilters }) => (
        <Formik
            onSubmit={(values) => { 
                console.log("values", values)
                getUsersCount({emailComo: values.emailComo})   
                loadUsers({page: 1, emailComo: values.emailComo})
                confirm()
              
                            
            }}
        >
        {(props) => {

            const {
                values,
                setFieldValue,
                handleSubmit,
                errors,
                } = props;
                return(
                    
                <div style={{ padding: 8 }}>
                    <Input
                        // ref={node => {
                        // console.log(node);
                        // }}
                        id= "emailComo"
                        placeholder={`Buscar ${dataIndex}`}
                        value={values.emailComo  || ' '  }
                        onChange={handleInput(setFieldValue, 'emailComo')}
                        // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
                            confirm()


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
    onFilterDropdownVisibleChange: visible => {
        console.log(visible)
        if (visible) {
          return {values : {emailComo: ''}}
        }
      },
    
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
        render: ({}, record) => ( <Switch
            id = "clienteAsociado" 
            checked= {clientes.find(cliente => cliente.idcliente === record.idcliente)} 
            onChange = {(e)=>{
                console.log("on change")
                updateClientsFilter(true);
                const clientesAsociados = getSelectedUsers(clientes, record);
                setUsersCommercialDeal({clientes: clientesAsociados })}}/>  )
    }
];

    const id = currentCommercialDeal && currentCommercialDeal.idcondcomercial

    const submitClients = (productos, escalados, clientes, id) =>{
        editCommercialDeal({id, values: {productos, escalados, clientes}})
    }
    const paginationOptions =(emailSearched) => ({
        onChange: (page) => {
            loadUsers({page: page, emailComo: emailSearched})
        },
        total: usersMeta.total,
        current: usersMeta.page,
        pageSize: usersMeta.pageSize,
    });
    return (
     
        <div>
             { commercialDealType != 0 ?
             <div>
            <Table 
                className="commercial-deals-products"
                dataSource={users}
                onChange = {(pagination, filters, sorter, data) => change(currentCommercialDeal,updateClientsFilter, setUsersCommercialDeal, clientes, columnsUsers)}
                columns={columnsUsers}
                size='small'
                loading={usersMeta.searchLoading}
                pagination={paginationOptions(emailComo)}
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
