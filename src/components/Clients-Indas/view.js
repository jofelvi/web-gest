import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../lib/utils';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { 
    Table, 
    Icon, 
    Row, 
    Col, 
    Tooltip, 
    Button, 
    Switch, 
    Input,
    Modal,
    Popconfirm,
    Checkbox
} from 'antd';
import ModalTaskDetail from '../ModalTaskDetail';
import { returnTheLabelForData } from './utils';
import { 
    mapperInputData, 
    validationSchema, 
    listInputFilter, 
    messageAlertEmail,
    getMessageEditMail,
    getMessageActivationAndName,
    //info,
} from './constants';
import { 
    ContentContainer,  
    Label,
    InputsContainer,
    ContentContainerFilters,
 } from './styles';
import { Formik } from 'formik';
import { handleInput, handleInputChecked } from '../../lib/forms';

const columnsEntities = [
    {
        title: 'Código CBIM',
        dataIndex: 'codentidad_cbim',
        key: 'codentidad_cbim',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.codentidad_cbim - b.codentidad_cbim
    },
    {
        title: 'Razón social',
        dataIndex: 'nomentidad_cbim',
        key: 'nomentidad_cbim',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.nomentidad_cbim - b.nomentidad_cbim
    },
    {
        title: 'NIF',
        dataIndex: 'nif',
        key: 'nif',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.nif - b.nif
    },
    {
        title: 'Dirección',
        dataIndex: 'direccion',
        key: 'direccion',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.direccion - b.direccion
    },
    {
        title: 'Tipo Entidad',
        dataIndex: 'ind_esfarmacia',
        key: 'ind_esfarmacia',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.ind_esfarmacia - b.ind_esfarmacia,
        render: (ind_esfarmacia) => ind_esfarmacia? 'Farmacia': 'Otro',
    },
    {
        title: 'Fecha de alta',
        dataIndex: 'fecha_alta',
        key: 'fecha_alta',
        sorter: (a,b) => Utils.sortDates(a.fecha_alta,b.fecha_alta),
        sortDirections: ['descend', 'ascend'],
        render: (date) => Utils.renderDate(date)
    },
    {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
        sortDirections: ['descend', 'ascend'],
        sorter: (a,b) => a.estado - b.estado
    }
];


const ClientsIndas = ({
    list,
    entitiesIndas,
    editClientIndas,
    setCurrentClientEmail,
    currentEmail,
    formKey,
    setFilterValues,
    searchClientBy,
    wholesalersIndas,
    token,
    loadClientsIndas,
    usersMeta, 
    getClientsCount,
    loadEntitiesIndas,
    setFormKey,
    isEdited,
    filterValues
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleEditStateNonActive, setIsVisibleEditStateNonActive] = useState(false);
    const [isVisibleEditStateActive, setIsVisibleEditStateActive] = useState(false);
    const [id, setId] = useState('');
    const [clientState, setClientState] = useState();
    // const [currentEmail, setCurrentEmail] = useState('');
    const [inputKey, setInputKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [nameClient, setNameClient] = useState('')
    const [isDataChange, setIsDataChange] = useState(false);
    const [loadingEntities, setLoadingEntitities] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);
    const [searchText, setSearchText] = useState('');

    const showModal = () => {
      setIsVisible(true)
      };
   
    const handleOk = e => {
      setIsVisible(false)
    };
    const handleCancel = e => {
      setIsVisible(false)
    };
    const showModalEditStateActive = () => {
        setIsVisibleEditStateActive(true)
    };
    const handleOkEditStateActive = e => {
        setIsVisibleEditStateActive(false)
    };
    const handleCancelEditStateActive = e => {
        setIsVisibleEditStateActive(false)
    };

    const columnsClients = [
        {
            title: 'Código CBIM',
            dataIndex: 'codcli_cbim',
            key: 'codcli_cbim',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.codcli_cbim - b.codcli_cbim
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.nombre - b.nombre
        },
        {
            title: 'Primer Apellido',
            dataIndex: 'apellido1',
            key: 'apellido1',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.apellido1 - b.apellido1
        },
        {
            title: 'Segundo Apellido',
            dataIndex: 'apellido2',
            key: 'apellido2',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.apellido2 - b.apellido2
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.email - b.email
        },
        {
            title: 'Fecha de Alta',
            dataIndex: 'fecha_alta',
            key: 'fecha_alta',
            sorter: (a,b) => Utils.sortDates(a.fecha_alta,b.fecha_alta),
            sortDirections: ['descend', 'ascend'],
            render: (date) => Utils.renderDate(date),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            sortDirections: ['descend', 'ascend'],
            sorter: (a,b) => a.estado - b.estado
        },
        {
            title: '',
            dataIndex: 'idcliente',
            key: 'idcliente',
            sortDirections: ['descend', 'ascend'],
            render: (idcliente, record) => (
                <Row
                    type="flex"
                    align="middle"
                    justify="center"
                    gutter={16}
                >
                    <Col>
                        <Tooltip title="Detalle">
                            <Button icon="eye"></Button>
                        </Tooltip>
                    </Col>
                    <Col>
                        <Tooltip title="Editar">
                            {/* {esté boton llama a el modal} */}
                            <Button 
                                icon="edit" 
                                onClick={() => {
                                    setId(idcliente);
                                    setNameClient(record.nomcli_cbim);
                                    setCurrentClientEmail({ currentEmail: record.email });
                                    showModal();
                                }}></Button>
                        </Tooltip>
                    </Col>
                    <Col>
                            <div>
                                <Tooltip title={record. idestado=== 0 ? "Activar": "Dar de Baja"}>
                                <Switch 
                                    name='nonActive' 
                                    checked={record.idestado === 0 ? false : true} 
                                    onChange={() =>{
                                        showModalEditStateActive();
                                        setId(idcliente);
                                        setNameClient(record.nomcli_cbim);
                                        setClientState(record.idestado);
                                    }}
                                    ></Switch> 
                                </Tooltip>
                            </div>
                    </Col>
                    
                </Row>
            ),
            width:200
        }
    ];

    useEffect(() =>{
        if(list && list.length > 0){
            setLoading(false);
        }
    },[list, entitiesIndas]);

    useEffect(() =>{
        if(!isFiltered){
            getClientsCount({ emailComo: '', nombreComo: '', codcli_cbim: '' });
        }
        if (isDataChange) {
            loadClientsIndas({ 
                page: usersMeta.page, 
            });
        }
        setIsDataChange(false);
    },[isEdited]);

    useEffect(() => {
        if (isFiltered && isDataChange) {
            loadClientsIndas({ 
              page: usersMeta.page, 
              emailComo: filterValues ? filterValues.emailComo : "", 
              nombreComo: filterValues ? filterValues.nombreComo : "", 
              codcli_cbim: filterValues ? filterValues.codcli_cbim : "",
            });
        }
        setIsDataChange(false);
    },[isEdited]);

    const formikInitialValue = {
        email: currentEmail,
        ind_renovar_pass: false
    }
    //methods
    const showEntities = (client) => {
        var entities = entitiesIndas.filter(entity => entity.idcliente === client.idcliente);
        setLoadingEntitities(false);
        return (
            <div className="table-indas-expand">
                <h4 className="table-indas-title">Entidades</h4>
                <Table 
                    dataSource={entities} 
                    columns={columnsEntities}
                    rowKey="codentidad_cbim"
                    size="small"
                    loading={loadingEntities}
                ></Table>
            </div>
        );
    }
    const paginationOptions =(filterValues) => ({
        onChange: (page, pageSize, current) => {
            loadClientsIndas({ 
                page: page, 
                emailComo: filterValues.emailComo, 
                nombreComo: filterValues.nombreComo,
                codcli_cbim: filterValues.codcli_cbim 
            });
        },
        total: usersMeta.total,
        current: usersMeta.page,
        defaultCurrent: usersMeta.page,
        pageSize: usersMeta.pageSize,
    });
    const paginationFilteredClientsOptions =(filterValues) => {
        return ({
            onChange: (page, pageSize, current) => {
                loadClientsIndas({ 
                    page: page, 
                    emailComo: filterValues.emailComo, 
                    nombreComo: filterValues.nombreComo,
                    codcli_cbim: filterValues.codcli_cbim 
                });
            },
            total: list.length >= 30 ? usersMeta.total : list.length ,
            current: usersMeta.page,
            pageSize: usersMeta.pageSize,
        })
    }
    
    return (
        <div className="table-indas">
            <h2 className="table-indas-title">Clientes Transferindas</h2>
            <Formik
                    key = {formKey}
                    initialValues={formikInitialValue}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {   
                      if (values && values.email) {
                        setIsDataChange(true);
                        editClientIndas({id, email: values.email});   
                      }
                      if (values && (values.emailComo || values.nombreComo || values.codcli_cbim)) {
                        setIsFiltered(true);
                        setFilterValues({ 
                            mailComo: values ? values.emailComo : "", 
                            nombreComo: values ? values.nombreComo : "", 
                            codcli_cbim: values ? values.codcli_cbim : "" 
                        });
                        getClientsCount({
                            emailComo: values.emailComo, 
                            nombreComo: values.nombreComo, 
                            codcli_cbim: values.codcli_cbim 
                        });   
                        loadClientsIndas({ 
                            page: 1, 
                            emailComo: values.emailComo, 
                            nombreComo: values.nombreComo, 
                            codcli_cbim: values.codcli_cbim 
                        });
                      }
                    }}>
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    errors,
                    touched,
                }) => (
                <div>
                <ContentContainerFilters>
                    {listInputFilter.map(inputKeyFilter =>
                    <InputsContainer>
                        <Label>
                            {inputKeyFilter.label}
                        </Label>
                        <Input
                            id={inputKeyFilter.inputKey}
                            value={values[inputKeyFilter.inputKey]}
                            placeholder={inputKeyFilter.label}
                            onChange={handleInput(setFieldValue, inputKeyFilter.inputKey)}
                            onBlur={handleBlur}
                            style={{width: inputKeyFilter.inputKey === 'codcli_cbim' ? '100px' : '250px'}}
                        />
                        </InputsContainer>
                    )}
                    <div style={{alignSelf: 'flex-end'}}>
                    <Button
                      icon= 'search'
                      style={{alignSelf: 'flex-end', margin: '0px 10px'}}
                      onClick={(e) => handleSubmit()}
                    ></Button>
                    <Button
                      icon= 'delete'
                      style={{alignSelf: 'flex-end'}}
                      onClick={() => {
                        setIsFiltered(false);
                        setFormKey();
                        setFilterValues({
                          emailComo: '', 
                          nombreComo: '', 
                          codcli_cbim: '',
                        });
                        getClientsCount({ 
                            emailComo: '', 
                            nombreComo: '', 
                            codcli_cbim: '' 
                        });
                        loadClientsIndas({ 
                          page: 1, 
                          emailComo: '', 
                          nombreComo: '', 
                          codcli_cbim: '', 
                        });
                      }}
                    ></Button>
                    </div>
                </ContentContainerFilters>
                
                <Table 
                  dataSource={list} 
                  columns={columnsClients}
                  rowKey="idcliente"
                  expandedRowRender = {client => showEntities(client)}
                  size="middle"
                  pagination={isFiltered ? paginationFilteredClientsOptions(filterValues) : paginationOptions(filterValues)}
                  loading={loading}
                  scroll={{x:true}}
                ></Table>
                <ModalTaskDetail
                  visible={isVisible}
                  handleCancel={handleCancel}
                  titleModal={returnTheLabelForData(mapperInputData, inputKey)}
                  footer={[
                    <Button
                      key="back"
                      onClick={handleCancel}>
                      Atrás
                    </Button>,
                    <Popconfirm 
                        okText="Confirmar" 
                        cancelText="Cancelar" 
                        onConfirm={(e) => {
                            handleSubmit();
                            handleOk(e);
                        }} 
                        onCancel={(e) => handleOk(e)}
                        overlayStyle={{width: 'fit-content', whiteSpace: 'pre'}} 
                        title={getMessageEditMail(nameClient)} 
                        autoAdjustOverflow={true}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button
                      key="submit"
                      type="primary"
                      onClick={(e) => {
                        // sale el popover de la doble confirmación
                        // handleSubmit(e);
                        //handleOk(e);
                      }}>
                      Guardar
                    </Button>
                    </Popconfirm>
                  ]}
                    content={
                      <ContentContainer>
                        <Label>{'Editar Email'}
                        </Label>
                        <Input
                          id={'email'}
                          value={values.email}
                          onChange={handleInput(setFieldValue, 'email')}
                          onBlur={handleBlur}
                        />  
                      </ContentContainer> }>
                </ModalTaskDetail>
                <Modal
                    visible={isVisibleEditStateActive}
                    title={clientState === 0 ? 'Activar Cliente' : 'Baja de cliente'}
                    footer={[
                        <Popconfirm 
                            okText="Confirmar" 
                            cancelText="Cancelar" 
                            onConfirm={(e) => {
                                if (clientState === 0){
                                    editClientIndas({ id: id, idestado: 1, ind_renovar_pass: values.ind_renovar_pass });
                                }
                                else {
                                    editClientIndas({ id: id, idestado: 0, ind_renovar_pass: values.ind_renovar_pass});
                                }              
                                setIsDataChange(true);
                                handleOkEditStateActive(e);
                                setFormKey();
                            }} 
                            onCancel={(e) => {
                                setFormKey();
                                handleOkEditStateActive(e)}}
                            overlayStyle={{width: 'fit-content', whiteSpace: 'pre'}} 
                            title={getMessageActivationAndName(nameClient, clientState)} 
                            autoAdjustOverflow={true}
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                <Button onClick={(e) => {handleSubmit()}}>Aceptar</Button>
                        </Popconfirm>
                    ]}    
                >   
                    <Checkbox onChange={handleInputChecked(setFieldValue, 'ind_renovar_pass')} value={values.ind_renovar_pass}>
                        Enviar correo de renovación de contraseña.
                    </Checkbox> 
                </Modal> 
                </div>
                )}
                {/* { para cambio de email Modal en los buttons de guardar se llama a un aviso de la doble confirmación para cambiar el email y en este aviso ya se llama a las dos funciones de update} */}
                {/* { para cambio de estado se llama a un aviso de la doble confirmación para cambiar el email y en este aviso ya se llama a las dos funciones de update} */}
                {/* {elemento 1 Modal para cambio de email} */}
                {/* {elemento 2 Aviso para doble confirmación de email y estado} */}
            </Formik>
            
        </div>
    );

};

ClientsIndas.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})),
    entitiesIndas: PropTypes.arrayOf(PropTypes.shape({})),
    wholesalersIndas: PropTypes.arrayOf(PropTypes.shape({}))
}
export default ClientsIndas;