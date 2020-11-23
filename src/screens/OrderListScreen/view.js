import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Row, Col } from 'antd';
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
import ModalCreateOrder from '../Forms/crear_pedido';
import { Anchor } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";

import {Select } from 'antd';
const { Link } = Anchor;

const dateFormat = 'YYYY/MM/DD';
const { Column } = Table;
const { Option } = Select;

class OrderListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.setLoadingLine = this.setLoadingLine.bind(this)
  }
  state = {
    searchByClient: '',
    searchByCodPedido: '',
    searchByEntity: '',
    searchByType: '',
    pag: 0,
    count: 0,
    buttonIsvisible: false,
    searchByOrderDate: [],
    visible: false,
    create_visible: false,
    loadingLine: false,
    order_id: 0,
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
    const { searchByOrderDate, searchByClient, searchByEntity, searchByType } = this.state;

    this.props.fetchOrders(this.state.pag)
    this.refreshCount()
  }

  showModal = (id) => { this.setState({ visible: true, order_id: id }); };
  handleOk = () => { this.setState({ visible: false }); };
  handleCancel = () => { this.setState({ visible: false }); };
  showCreateModal = () => { this.setState({ create_visible: true }); };
  handleCreateOk = () => { this.setState({ create_visible: false }); };
  handleCreateCancel = () => { this.setState({ create_visible: false }); };

  clearFilters = () => {
    this.setState({
      searchByClient: '',
      searchByEntity: '',
      searchByType: '',
      searchByOrderDate: [],
      pag: 0,
    }, function() {
      this.props.fetchOrders(this.state.pag)
      this.refreshCount()
    })

  }


  searchedValue = (key, value) => {

    this.setState({ [key]: value })
  }

  searchedValueDate = (dateString) => {
    if (dateString[0] && dateString[1]) {

      this.setState({
        ...this.state,
        searchByOrderDate: [
          moment(dateString[0]).startOf('day').toDate().toISOString(),
          moment(dateString[1]).endOf('day').toDate().toISOString(),
        ],
      });
    }

  }

  refreshCount() {
    const { searchByOrderDate, searchByClient, searchByEntity, searchByType } = this.state;


    this.props.countOrders({
      codentidad_cbim: searchByEntity,
      tipo: searchByType,
      codcli_cbim: searchByClient,
      dates: searchByOrderDate
    })
  }

  isFilterActive = () => {
    return (
        this.state.searchByOrderDate.length !== 0 ||
        this.state.searchByClient !== '' ||
        this.state.searchByEntity !== '' ||
        this.state.searchByType !== ''
      );
  }

  handleSubmitOrdersSearch = () => {

    const { searchOrder } = this.props;
    const { pag, searchByOrderDate, searchByClient, searchByCodPedido, searchByEntity, searchByType } = this.state;

    searchOrder({
      codentidad_cbim: searchByEntity,
      tipo: searchByType,
      codcli_cbim: searchByClient,
      codpedido_origen: searchByCodPedido,
      pages: pag,
      dates: searchByOrderDate
    })

   this.refreshCount()

  }

  render() {
    const { searchByClient, searchByCodPedido, searchByEntity, searchByType } = this.state;
    const { orders, order, fetchOrderById, entity, client, count, deleteOrderLineById, deleteOrderLineSetLoading } = this.props;

    return (
      <Maincontainer>
        <div className="table-indas">
          <h2 className="table-indas-title">Pedidos</h2>
          <InputsContainer>
            <Row style={{width: '100%'}}>
              <Col span={5} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Intervalo de fechas</span>
                <DatePickerFromTo
                    style={{width: '100%'}}
                    format={dateFormat}
                    onChange={this.searchedValueDate}
                    placeholder={['desde', 'hasta']}
                />
              </Col>
              <Col span={5} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Código Cliente</span>
                <InputBox
                    placeholder="Código Cliente"
                    value={searchByClient}
                    onChange={(event) => this.searchedValue('searchByClient', event.target.value)}
                    style={{width: '100%'}}
                />
              </Col>
              <Col span={5} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Código de Entidad</span>
                <InputBox
                    placeholder="Código Entidad"
                    value={searchByEntity}
                    onChange={(event) => this.searchedValue('searchByEntity', event.target.value)}
                    style={{width: '100%'}}
                />
              </Col>
              <Col span={5} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Tipo</span>
                <Select
                    value={searchByType}
                    placeholder="Select a option and change input text above"
                    onChange={(value) => this.searchedValue('searchByType', value)}
                    style={{width: '100%', marginTop: '10px' }}
                >
                  <Option value="">Todos</Option>
                  <Option value="Pedidos">Pedidos</Option>
                  <Option value="Puntos">Puntos</Option>
                </Select>
              </Col>
            <Col span={4}>
              <div style={{alignSelf: 'flex-end'}}>
                <Button
                    icon= 'search'
                    style={{alignSelf: 'flex-end', margin: '40px 10px 0px 10px'}}
                    onClick={() => {
                      this.setState({ pag: 0 }, function () {
                        this.handleSubmitOrdersSearch()
                      })
                    }}
                ></Button>
                <Button
                    icon= 'delete'
                    disabled={!this.isFilterActive()}
                    style={{alignSelf: 'flex-end', margin: '40px 0px 0px 0px'}}
                    onClick={this.clearFilters}
                ></Button>
              </div>
            </Col>
            </Row>
          </InputsContainer>
          <TableContainer>
            <ButtonGroup className="orders-top-actions">
              <Button onClick={this.showCreateModal}>Nuevo</Button>
            </ButtonGroup>
            <Table
                dataSource={modifyOrderDate(orders)}
                className="table"
                pagination={{
                  position:'both',
                  pageSize: LIMIT,
                  total: count,
                  onChange: (page, pageSize) => {
                    this.setState({ pag: (page-1) * pageSize }, function () { this.handleSubmitOrdersSearch() })
                  }
                }}
                scroll={{ x: true }}
            >

              <Column
                title="Nº pedido"
                dataIndex="codpedido_origen"
                key="codpedido_origen"
              />

              <Column
                title="Fecha"
                dataIndex="fecha_pedido"
                key="fecha_pedido" />

              <Column
                title="Entidad"
                dataIndex="nomentidad_cbim"
                key="nomentidad_cbim" />

              <Column
                title="Cod. Cliente"
                dataIndex="codcli_cbim"
                key="codcli_cbim"

              />

              <Column
                title="Tipo"
                dataIndex="tipo"
                key="tipo" />

              <Column
                title="Mayorista"
                dataIndex="nombre_mayorista"
                key="nombre_mayorista" />

              <Column
                title="Estado"
                dataIndex="nombre_estado"
                key="nombre_estado" />

              <Column
                title="Ver detalle"
                key="operation"
                render={(text, row) => <Button onClick={() => {
                  const id = row.idpedido
                  this.showModal(id);
                  fetchOrderById({ id });
                }}>{this.state.order_id == row.idpedido && !order ? <LoadingOutlined /> : 'Ver detalle' }</Button>} />

            </Table>
          </TableContainer>
          <ModalCreateOrder
              visibility={this.state.create_visible}
              ok={this.handleCreateOk}
              cancel={this.handleCreateCancel}
          >
          </ModalCreateOrder>
          <ModalDetailOrder
            visibility={this.state.visible && order}
            ok={this.handleOk}
            cancel={this.handleCancel}
            customFooter={[]}
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
                    dateOrder={Utils.renderDate(order.fecha_alta)}
                    stateOrder={order.estado}
                    dateModOrder={order.fecha_modif === null ? '' : Utils.renderDate(order.fecha_modif)}
                    typeOrder={order.tipo}
                    codDiscountOrder={order.codcupon}
                    detailOrder={filterOrderType(order.tipo, order.lineas)}
                    loading={order && order.loadingLine ? order.loadingLine : false}
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
  history: PropTypes.shape({}).isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default OrderListScreen;
