import React, { useEffect, useState } from 'react';

import {Button, Spin, Row, Col, Skeleton, ConfigProvider} from 'antd';
import locale from "antd/es/locale/es_ES";
import {Maincontainer} from "../../../lib/styled";
import ClientsFilters from "../../ClientsScreen/components/Filters";
import ClientsActions from "../../ClientsScreen/components/Actions";
import ClientsTable from "../../ClientsScreen/components/Table";

import EstadisticasTablaPedidosPorGrupo from '../components/EstadisticasTablaPedidosPorGrupo';
import EstadisticasTablaClientes from '../components/EstadisticasTablaClientes';
import EstadisticasTablaPedidos from '../components/EstadisticasTablaPedidos';
import EstadisticasActionsFilters from '../components/EstadisticasActionsFilters';



const EstadisticasView = ({
    statsPedidos, statsPedidosPorGrupo, statsClientes, fetchStatsPedidos, fetchStatsPedidosPorGrupo, fetchStatsClientes,
    statsPedidosLoading, statsPedidosPorGrupoLoading, statsClientesLoading, fetchStatsSetLoading
}) => {
    const [ filters, setFilters ] = useState( { grupo: 'año' } );

    useEffect( () => {
        fetchStatsSetLoading({} );
        fetchStatsPedidos( filters );
        fetchStatsPedidosPorGrupo( filters );
        fetchStatsClientes( filters );
    }, [filters])

    return (
        <ConfigProvider locale={ locale }> <Maincontainer>
            <div className="table-indas table-indas-new">
                <EstadisticasActionsFilters
                    key={'filters'}
                    setFilters={ setFilters }
                    loading={ statsPedidosLoading || statsClientesLoading || statsPedidosPorGrupoLoading }
                    filters={ filters }
                />
                <hr />
                <div style={{ marginTop:'20px'}}>
                        <h2>Actividad</h2>
                        <EstadisticasTablaPedidos
                            key={'tabla_pedidos'}
                            data={statsPedidos}
                            filters={ filters }
                            loading={ statsPedidosLoading }
                        />
                        <h2>Ventas por grupo</h2>
                        <EstadisticasTablaPedidosPorGrupo
                            data={ statsPedidosPorGrupo }
                            filters={ filters }
                            loading={ statsPedidosPorGrupoLoading }
                        />

                        <h2>Altas</h2>
                        <EstadisticasTablaClientes
                            key={'tabla_clientes'}
                            data={statsClientes}
                            filters={ filters }
                            loading={statsClientesLoading}

                        />
                </div>
            </div>
        </Maincontainer></ConfigProvider>)


};
export default EstadisticasView;
