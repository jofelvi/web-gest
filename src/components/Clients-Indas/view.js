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
    Popconfirm
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
} from './constants';
import { 
    ContentContainer,  
    Label,
    InputsContainer,
    ContentContainerFilters,
 } from './styles';
import { Formik } from 'formik';
import { handleInput } from '../../lib/forms';

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
    const [id, setId] = useState('');
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
                        {record.idestado === 0? 
                            <Tooltip title="Activar">
                                <Popconfirm 
                                  okText="Confirmar" 
                                  cancelText="Cancelar" 
                                  onConfirm={(e) => {
                                    //console.info('estado actual inactivo');
                                    editClientIndas({ id: idcliente, idestado: 1 });
                                    setIsDataChange(true);
                                    // console.info('estado actual activo');
                                    // editClientIndas({id, idestado: 0 });
                                    handleOk(e);
                                  }} 
                                  onCancel={(e) => handleOk(e)}
                                  overlayStyle={{width: 'fit-content', whiteSpace: 'pre'}} 
                                  title={getMessageActivationAndName(record.nomcli_cbim, record.idestado)} 
                                  autoAdjustOverflow={true}
                                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                {/* {este switch onChange llama a un aviso de la segunda confirmación (modal como el de taskModal), si se confirma se llama al update de estado en las dos llamadas} */}
                                <Switch checked={false}></Switch>
                                </Popconfirm>
                                
                            </Tooltip>
                            :
                            <Tooltip title="Dar de baja">
                                <Popconfirm 
                                  okText="Confirmar" 
                                  cancelText="Cancelar" 
                                  onConfirm={(e) => {
                                    // console.info('estado actual activo');
                                    editClientIndas({ id: idcliente, idestado: 0 });
                                    setIsDataChange(true);
                                    handleOk(e);
                                  }} 
                                  onCancel={(e) => handleOk(e)}
                                  overlayStyle={{width: 'fit-content', whiteSpace: 'pre'}} 
                                  title={getMessageActivationAndName(record.nomcli_cbim, record.idestado)} 
                                  autoAdjustOverflow={true}
                                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                                {/* {este switch onChange llama a un aviso de la segunda confirmación (modal como el de taskModal), si se confirma se llama al update de estado en las dos llamadas} */}
                                  <Switch checked= {true}></Switch>    
                                </Popconfirm>
                                
                            </Tooltip>
                        }
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
            console.info({ page, pageSize, defaultCurrent: usersMeta.page, filterValues });
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
    const paginationFilteredClientsOptions =() => ({
        total: list.length >= 30 ? usersMeta.total : list.length ,
        pageSize: usersMeta.pageSize,
    });
    
    return (
        <div className="table-indas">
            <h2 className="table-indas-title">Clientes Transferindas</h2>
            <Formik
                    key = {formKey}
                    initialValues={formikInitialValue}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {    
                      // console.info({ id, values, filterValues });
                      if (values && values.email) {
                        setIsDataChange(true);
                        editClientIndas({id, email: values.email});   
                      }
                      if (values && (values.emailComo || values.nombreComo || values.codcli_cbim)) {
                        setIsFiltered(true);
                        // console.log({ values });
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
                        loadClientsIndas({ 
                          page: 1, 
                          emailComo: '', 
                          nombreComo: '', 
                          codcli_cbim: '', 
                        })
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
                  pagination={isFiltered ? paginationFilteredClientsOptions() : paginationOptions(filterValues)}
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