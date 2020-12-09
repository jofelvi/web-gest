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
import {Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';


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
    searchByState: '',
    searchByEntity: '',
    searchByType: '',
    pag: 0,
    count: 0,
    buttonIsvisible: false,
    searchByOrderDate: [],
    searchByOrderDateValue: [],
    visible: false,
    create_visible: false,
    loadingLine: false,
    order_id: 0,
    expandedKeys: [],
    expandFilters: false,
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

    this.props.fetchOrders(this.state.pag)
    this.props.fetchOrderStates( { } )
    this.refreshCount()
  }

  showModal = (id) => { this.setState({ visible: true, order_id: id }); };
  handleOk = () => { this.setState({ visible: false }); };
  handleCancel = () => { this.setState({ visible: false }); };
  handleCreateOk = () => { this.setState({ create_visible: false }); };
  handleCreateCancel = () => { this.setState({ create_visible: false }); };

  clearFilters = () => {
    this.setState({
      searchByClient: '',
      searchByOrderDateValue: [],
      searchByEntity: '',
      searchByOrdrId: '',
      searchByType: '',
      searchByState: '',
      searchByOrderDate: [],
      pag: 0,
      expandedKeys: [],

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
        searchByOrderDateValue: [
          moment(dateString[0]),
          moment(dateString[1])
        ]
      });
    }

  }

  refreshCount() {
    const { searchByOrderDate, searchByClient, searchByEntity, searchByType, searchByState } = this.state;


    this.props.countOrders({
      codentidad_cbim: searchByEntity,
      tipo: searchByType,
      codcli_cbim: searchByClient,
      dates: searchByOrderDate,
      codestado: searchByState
    })
  }

  isFilterActive = () => {
    return (
        this.state.searchByOrderDate.length !== 0 ||
        this.state.searchByClient !== '' ||
        this.state.searchByEntity !== '' ||
        this.state.searchByState !== '' ||
        this.state.searchByType !== '' ||
        this.state.searchByCodPedido !== ''
      );
  }

  onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys);
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

  handleSubmitOrdersSearch = () => {

    const { searchOrder } = this.props;
    const { pag, searchByState, searchByOrderDate, searchByClient, searchByCodPedido, searchByEntity, searchByType, searchByOrderId } = this.state;

    searchOrder({
      codentidad_cbim: searchByEntity,
      tipo: searchByType,
      codcli_cbim: searchByClient,
      codpedido_origen: searchByCodPedido,
      pages: pag,
      dates: searchByOrderDate,
      codestado: searchByState,
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
          <div className="table-filters-indas">
          <InputsContainer style={{width: '100%', marginBottom: 0, paddingBottom: 0}}>
            <Row style={{width: '100%', marginBottom: 0}}>
              <Col span={18} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Entidad <small>(Código, Nombre, Código Postal, Población, Provincia, Dirección)</small></span>
                <OrderFilterEntity
                    value={searchByEntity}
                    onChange={ (entity) => this.searchedValue('searchByEntity', entity) }
                    onChangeClient={ (client) => this.searchedValue('searchByClient', client) }
                />
              </Col>

              <Col span={6} style={{padding: '10px'}}>
                <span style={{padding: '10px'}}>Código Cliente</span>
                <InputBox
                    placeholder="Código Cliente"
                    value={searchByClient}
                    onChange={(event) => this.searchedValue('searchByClient', event.target.value)}
                    style={{width: '100%'}}
                />
              </Col>
            </Row>
          </InputsContainer>
          <InputsContainer hidden={!this.state.expandFilters} style={{width: '100%', marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0}}>
            <Row style={{width: '100%'}}>
              <Col span={8} style={{padding: '10px', paddingTop: 0}}>
                <span style={{padding: '10px'}}>Intervalo de fechas</span>
                <DatePickerFromTo
                    style={{width: '100%'}}
                    format={dateFormat}
                    onChange={this.searchedValueDate}
                    placeholder={['desde', 'hasta']}
                    value={this.state.searchByOrderDateValue}
                />
              </Col>
              <Col span={6} style={{padding: '10px', paddingTop: 0}}>
                <span style={{padding: '10px'}}>Cód. Pedido</span>
                <InputBox
                    placeholder="Cód. Pedido"
                    value={searchByCodPedido}
                    onChange={(event) => this.searchedValue('searchByCodPedido', event.target.value)}
                    style={{width: '100%',marginTop: '10px' }}
                />
              </Col>
              <Col span={5} style={{padding: '10px', paddingTop: 0}}>
                <span style={{padding: '10px'}}>Tipo</span>
                <Select
                    value={searchByType}
                    onChange={(value) => this.searchedValue('searchByType', value)}
                    style={{width: '100%', marginTop: '10px', marginLeft:10 }}
                >

                  <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                  <Option value="Pedidos">Pedidos</Option>
                  <Option value="Puntos">Puntos</Option>
                </Select>
              </Col>

              <Col span={5} style={{padding: '10px', paddingTop: 0}}>
                <span style={{padding: '10px'}}>Estado</span>
                <Select
                    value={searchByState}
                    onChange={(value) => this.searchedValue('searchByState', value)}
                    style={{width: '100%', marginTop: '10px', paddingLeft: 0, marginLeft:10 }}
                >
                  <Option value=""  style={{ color: '#CCC' }}>- Seleccione -</Option>
                  { this.props.states && this.props.states.map( (stateObject) => {
                    return (
                        <Option value={stateObject.codestado}>{stateObject.nombre}</Option>
                    );
                  } ) }
                </Select>
              </Col>

            </Row>

          </InputsContainer>
            <InputsContainer style={{width: '100%', marginTop: 0, paddingTop: 0}}>
            <Row style={{width: '100%'}}>
              <Col span={24} align="right">
                <div style={{alignSelf: 'flex-end'}}>
                  <a
                      style={{ fontSize: 12 }}
                      onClick={() => {
                        this.setState({expandFilters: !this.state.expandFilters});
                      }}
                  >
                    {this.state.expandFilters ? <React.Fragment><UpOutlined /> Mostar menos</React.Fragment> : <React.Fragment><DownOutlined /> Mostar más</React.Fragment>}
                  </a>

                  <Button
                      icon= 'search'
                      variant="primary"
                      style={{alignSelf: 'flex-end', margin: '0px 10px 0px 10px'}}
                      onClick={() => {
                        this.setState({ pag: 0 }, function () {
                          this.handleSubmitOrdersSearch()
                        })
                      }}
                  >Filtrar</Button>
                  <Button
                      icon= 'delete'
                      disabled={!this.isFilterActive()}
                      style={{alignSelf: 'flex-end', margin: '0px 0px 0px 0px'}}
                      onClick={this.clearFilters}
                  >Limpiar</Button>
                </div>
              </Col>
            </Row>

          </InputsContainer>
          </div>
          <TableContainer>
            <div class="table-actions">
              <Tooltip className="table-action-button" title={ this.state.expandedKeys.length > 0 ? "Contraer todas las celdas." : "Expandir todas las celdas." }>
              { this.state.expandedKeys.length > 0 && (<Button onClick={this.onCollapseAll} type="secondary">
                <ShrinkOutlined />
              </Button>) }
              { this.state.expandedKeys.length == 0 && (<Button onClick={this.onExpandAll} type="secondary">
                <ArrowsAltOutlined />
              </Button>) }

              </Tooltip>
            </div>
            <Table
                dataSource={modifyOrderDate(orders)}
                className="table"
                expandedRowRender = {order => (<OrderTableDetails order={order} />)}
                onExpandedRowsChange={this.onExpand}
                expandedRowKeys={this.state.expandedKeys}

                pagination={{
                  position:'both',
                  pageSize: LIMIT,
                  total: count,
                  onChange: (page, pageSize) => {
                    this.setState({ pag: (page-1) * pageSize }, function () { this.handleSubmitOrdersSearch() })
                  }
                }}
                scroll={{ x: true }}
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
                style="30%"
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
            visibility={this.state.visible && order}
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
                    dateOrder={Utils.renderDate(order.fecha_alta)}
                    stateOrder={order.nombre_estado}
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
