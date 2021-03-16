import React from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Button, Row, Col, Tooltip} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../constants';
import './styles.css'
import {
  InputsContainer,
  Maincontainer,
  InputBox,
  DatePickerFromTo,
  PaginationButton,
  ButtonsContainer,
  SerachOrdersButton,
  MainContainerModal,
  TableContainer,
} from './styled';
import Utils from '../../lib/utils';
import ModalDetailOrder from '../../components/ModalDetailOrder';
import { } from './styled'
import InfoCardEntity from '../../components/InfoCardEntity/view';
import InfoCardClient from '../../components/InfoCardClient/view';
import InfoCardOrder from '../../components/InfoCardOrder/view';
import {modifyOrderDate, filterOrderType} from './utils';
import {countOrders, deleteOrderLineSetLoading} from "../../modules/orders/actions";
import ButtonGroup from "antd/lib/button/button-group";
import { Anchor } from 'antd';
import {LoadingOutlined, ArrowsAltOutlined, ShrinkOutlined, DeleteOutlined} from "@ant-design/icons";
import OrderStatusActions from './components/OrderStatusActions';
import OrderFilterEntity from './components/OrderFilterEntity';
import OrderTableDetails from './components/OrderTableDetails';
import OrderFilters from './components/OrderFilters';
import {Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';


const { Link } = Anchor;

const dateFormat = 'YYYY/MM/DD';
const { Column } = Table;
const { Option } = Select;

class OrderListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.savedState ? props.savedState : {
      filters: { page: 0},
      count: 0,
      buttonIsvisible: false,
      visible: false,
      loadingLine: false,
      order_id: 0,
      expandedKeys: [],
    };
    this.setLoadingLine = this.setLoadingLine.bind(this)
    this.setFilters = this.setFilters.bind(this)
  }

  setLoadingLine(status) {
    this.props.order = { ...this.props.order, loadingLine: status }
  }
  componentWillReceiveProps(newProps) {
    if (this.state.visible == true && newProps.client && newProps.entity && newProps.order) {
      this.setState({order_id: 0});
    }
    if (this.state.visible == true && newProps.client && newProps.entity && ! newProps.order) {
      //The current order was deleted, close modal, empty client and entity
      this.handleSubmitOrdersSearch();
    }
  }
  componentDidMount() {
    const { searchByOrderDate, searchByClient, searchByEntity, searchByType, searchByState } = this.state;

    this.props.fetchOrders(this.state.filters.page || 0 )
    this.props.fetchOrderStates( { } )
    this.props.fetchOrderProducts( { } )
    this.refreshCount()
  }

  showModal = (id) => { this.setState({ visible: true, order_id: id }); };
  handleOk = () => { this.setState({ visible: false }); };
  handleCancel = () => { this.setState({ visible: false }); };

  refreshCount() {
    const { filters } = this.state;
    this.props.countOrders(
        {
          codentidad_cbim: filters.searchByEntity || '',
          tipo: filters.searchByType,
          idproducto: filters.searchByProduct || '',
          codcli_cbim: filters.searchByClient || '',
          codpedido_origen: filters.searchByCodPedido || '',
          dates: filters.searchByOrderDate || '',
          codestado: filters.searchByState || '',
        })
  }

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };
  onExpandAll = () => {
    const expandedKeys = [];
    const expandMethod = arr => {
      arr.forEach(data => {
        expandedKeys.push(data.key);
      });
    };
    expandMethod(modifyOrderDate(this.props.orders));
    this.setState({ expandedKeys });
  };
  onCollapseAll = () => {
    this.setState({ expandedKeys: [] });
  };

  setFilters(filters) {
    this.setState({filters: filters}, this.handleSubmitOrdersSearch)
  }
  handleSubmitOrdersSearch = () => {
    const { searchOrder } = this.props;
    const { filters } = this.state;

    searchOrder({
      codentidad_cbim: filters.searchByEntity || '',
      tipo: filters.searchByType,
      idproducto: filters.searchByProduct || '',
      codcli_cbim: filters.searchByClient || '',
      codpedido_origen: filters.searchByCodPedido || '',
      pages: (filters.page-1)*LIMIT || 0,
      dates: filters.searchByOrderDate || '',
      codestado: filters.searchByState || '',
    })

   this.refreshCount()
  }

  render() {
    const { searchByClient, searchByCodPedido, searchByEntity, searchByType, searchByState } = this.state;
    const { orders, order, fetchOrderById, entity, client, count, deleteOrderLineById, deleteOrderLineSetLoading, deleteLineLoadingId, deleteLoadingId } = this.props;

    return (
      <Maincontainer>
        <div className="table-indas table-indas-new">
          <h2 className="table-indas-title">Pedidos</h2>
          <OrderFilters
            filters={this.state.filters}
            setFilters={this.setFilters}
          />
          <TableContainer>
            {orders.length > 0 && (<div class="table-actions">
              <Tooltip className="table-action-button" title={ this.state.expandedKeys.length > 0 ? "Contraer todas las celdas." : "Expandir todas las celdas." }>
              { this.state.expandedKeys.length > 0 && (<Button onClick={this.onCollapseAll} type="secondary">
                <ShrinkOutlined />
              </Button>) }
              { this.state.expandedKeys.length == 0 && (<Button onClick={this.onExpandAll} type="secondary">
                <ArrowsAltOutlined />
              </Button>) }
              </Tooltip>
            </div>)
            }
            <Table
                dataSource={modifyOrderDate(orders)}
                className="table"
                expandedRowRender = {order => (<OrderTableDetails order={order} />)}
                onExpandedRowsChange={this.onExpand}
                expandedRowKeys={this.state.expandedKeys}
                loading={this.props.loadingList}
                pagination={{
                  position:'both',
                  pageSize: LIMIT,
                  total: count,
                  current: this.state.filters.page,
                  onChange: (page, pageSize) => {
                    this.setState({ filters: {...this.state.filters, page: page } }, function () { this.handleSubmitOrdersSearch() })
                  }
                }}
                tableLayout="auto"
                scroll={{ x: 'calc(700px + 50%)'}}
            >

              <Column
                title="Núm. Pedido"
                dataIndex="codpedido_origen"
                key="codpedido_origen"
                align="center"
              />

              <Column
                title="Fecha Pedido"
                dataIndex="fecha_pedido"
                key="fecha_pedido"

              />

              <Column
                title="Nombre Entidad"
                dataIndex="nomentidad_cbim"
                key="nomentidad_cbim"

              />

              <Column
                title="Código Cliente"
                dataIndex="codcli_cbim"
                key="codcli_cbim"
                align="center"

              />

              <Column
                title="Tipo de Pedido"
                dataIndex="tipo"
                key="tipo"
              />

              <Column
                title="Mayorista"
                dataIndex="nombre_mayorista"
                key="nombre_mayorista"
              />

              <Column
                title="Estado"
                dataIndex="nombre_estado"
                key="nombre_estado"
                render={ ( txt, record, i ) => ( <OrderStatusActions order={ record } /> ) }
              />

              <Column
                key="operation"
                render={(text, row) => <Button onClick={() => {
                  const id = row.idpedido
                  this.showModal(id);
                  fetchOrderById({ id });
                }}>{this.state.order_id == row.idpedido && !order ? <LoadingOutlined /> : 'Ver detalle' }</Button>} />


            </Table>
          </TableContainer>
          <ModalDetailOrder
            visibility={this.state.visible && order != false}
            ok={this.handleOk}
            cancel={this.handleCancel}
            customFooter={[]}
            deleteLoadingId={deleteLoadingId}
            client={ client ? client : null }
            entity={ entity ? entity : null }
            order={ order ? order : null }
            content={
              <MainContainerModal>

                {client ?
                  <InfoCardClient
                    codClient={client.codcli_cbim}
                    nombreClient={client.nombre}
                    emailClient={client.email}
                    dateClient={Utils.renderDate(client.fecha_alta)}
                    stateClient={client.estado}
                  /> : ''}

                {entity ?
                  <InfoCardEntity
                    codEntity={entity.codentidad_cbim}
                    company={entity.nomentidad_cbim}
                    tEntity={entity.ind_esfarmacia === true ? 'FARMACIA' : 'SOCIEDAD'}
                    stateEntity={entity.estado}
                    addressEntity={entity.direccion}
                    zipcodeEntity={entity.codigo_postal}
                    cityEntity={entity.plobacion}
                    provinceEntity={entity.province}
                  /> : ''}

                {order ?
                  <div>
                  <InfoCardOrder
                    numOrder={order.codpedido_origen}
                    idOrder={order.idpedido}
                    dateOrder={Utils.renderDate(order.fecha_alta)}
                    stateOrder={order.nombre_estado}
                    nombreMayoristaOrder={order.nombre_mayorista}
                    codestadoOrder={order.codestado}
                    dateModOrder={order.fecha_modif === null ? '' : Utils.renderDate(order.fecha_modif)}
                    typeOrder={order.tipo}
                    codDiscountOrder={order.codcupon}
                    detailOrder={filterOrderType(order.tipo, order.lineas)}
                    loading={deleteLineLoadingId ? deleteLineLoadingId : false}
                    deleteOrderLineById={deleteOrderLineById}
                    deleteOrderLineSetLoading={deleteOrderLineSetLoading}
                  /> </div>: ''}


              </MainContainerModal>

            }
          ></ModalDetailOrder>
        </div>
      </Maincontainer>
    );
  }
};


OrderListScreen.propTypes = {
  countOrders: PropTypes.func.isRequired,
  searchOrder: PropTypes.func.isRequired,
  fetchOrders: PropTypes.func.isRequired,
  fetchOrderStates: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default OrderListScreen;
