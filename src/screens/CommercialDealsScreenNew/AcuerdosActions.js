import React, { useState } from 'react';

import { Button, Dropdown, Menu, message, Modal, Spin } from 'antd';
import { DownOutlined, ExclamationCircleOutlined, ExportOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import { exportAcuerdosCom, updatePlansAcApi } from '../../modules/planes-compra/api';

const { confirm } = Modal;

const PlanesCompraActions = (props) => {
    const history = useHistory();
    const [exportLoading, setExportLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const { selectedRowKeys } = props;

    const confirmUpdatePlans = (keyName, valueName, key, value) => {
        const { selectedRowKeys } = props;
        const acuerdos = selectedRowKeys.join(', ');
        const messageContent =
            selectedRowKeys.length > 0
                ? `¿Desea cambiar \'${keyName}\' de los acuerdos comerciales ${acuerdos} a \'${valueName}\'?`
                : `¿Desea cambiar \'${keyName}\' del acuerdo comercial ${acuerdos} a \'${valueName}\'?`;
        confirm({
            title: `Confirmar acción`,
            icon: <ExclamationCircleOutlined />,
            content: messageContent,
            onOk: () => {
                updatePlans(key, value);
            },
            onCancel() {},
        });
    };

    const updatePlans = (key, value) => {
        const { selectedRowKeys, updateSelectedRowKeysNew, setUpdateEstados } = props;
        setLoading(false);
        let payload = {
            change: { [key]: value },
            plansIds: selectedRowKeys,
        };

        updatePlansAcApi(payload)
            .then(() => {
                updateSelectedRowKeysNew();
                setUpdateEstados();
                message.success('Cambio aplicado correctamente.');
            })
            .catch(() => {
                alert('No se ha podido realizar la operación. ');
                updateSelectedRowKeysNew();
            });
    };

    return (
        <div className='table-actions'>
            <div className='table-action-button'>
                <Button
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                    type='primary'
                    onClick={() => {
                        history.push('/acuerdos-comerciales/crear');
                    }}>
                    Nuevo
                </Button>
                <Button
                    type='link'
                    style={{ marginLeft: '3px', marginRight: '0px', paddingLeft: 0, paddingRight: 0 }}
                    onClick={() => {
                        setExportLoading(true);
                        exportAcuerdosCom(filters, () => setExportLoading(false));
                    }}>
                    {exportLoading ? <Spin /> : <ExportOutlined style={{ fontSize: '20px' }} />}
                </Button>
                {selectedRowKeys.length == 1 && (
                    <React.Fragment>
                        <Link
                            to={{
                                pathname: `/acuerdos-comerciales/${selectedRowKeys[0]}/editar`,
                                search: 'editar',
                            }}>
                            <Button type='link' style={{ marginLeft: '0px', marginRight: '0px' }}>
                                Editar
                            </Button>
                        </Link>

                        <Link
                            to={{
                                pathname: `/planes-de-compra/${selectedRowKeys[0]}/copiar`,
                                search: 'copiar',
                            }}>
                            <Button type='link' style={{ marginLeft: '0px', marginRight: '0px' }}>
                                Copiar
                            </Button>
                        </Link>
                    </React.Fragment>
                )}
                {selectedRowKeys.length >= 1 && (
                    <React.Fragment>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item
                                        key='1'
                                        onClick={() => {
                                            confirmUpdatePlans('Estado', 'Activo', 'idestado', '1');
                                        }}>
                                        Activo
                                    </Menu.Item>
                                    <Menu.Item
                                        key='2'
                                        onClick={() => {
                                            confirmUpdatePlans('Estado', 'Inactivo', 'idestado', '2');
                                        }}>
                                        Inactivo
                                    </Menu.Item>
                                </Menu>
                            }>
                            <Button disabled={loading} type='link' style={{ marginLeft: '0px', marginRight: '0px' }}>
                                {loading ? <Spin /> : 'Cambiar a'} <DownOutlined />
                            </Button>
                        </Dropdown>
                    </React.Fragment>
                )}
            </div>

            {selectedRowKeys.length > 0 && (
                <div style={{ width: '200px', paddingTop: '20px', float: 'right' }}>{selectedRowKeys.length} fila(s) seleccionada(s).</div>
            )}
        </div>
    );
};

export default PlanesCompraActions;

