import React from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Button, Row, Col, Tooltip} from 'antd';
import * as moment from 'moment';
import { LIMIT } from '../../constants';
// import './styles.css'
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
import {Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';


const { Link } = Anchor;

const dateFormat = 'YYYY/MM/DD';
const { Column } = Table;
const { Option } = Select;

class CatalogListScreen extends React.Component {
  state = {
    filters: { page: 0},
  }

  componentDidMount() {
    const { searchByOrderDate, searchByClient, searchByEntity, searchByType, searchByState } = this.state;

    this.props.fetchProducts(this.state.filters.page || 0 )

  }

  render() {
    const { products} = this.props;


    return (
      <Maincontainer>
        <div className="table-indas table-indas-new">
          <h2 className="table-indas-title">Catalogo</h2>
          <TableContainer>
            <Table
                dataSource={products}
                className="table"
                onExpandedRowsChange={this.onExpand}
                expandedRowKeys={this.state.expandedKeys}
                loading={this.props.loadingList}
                pagination={{
                  position:'both',
                  pageSize: LIMIT,
                  total: 999,
                  current: this.state.filters.page,
                  onChange: (page, pageSize) => {
                    this.setState({ filters: {...this.state.filters, page: page } })
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
            </Table>
          </TableContainer>
        </div>
      </Maincontainer>
    );
  }
};


CatalogListScreen.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  Products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CatalogListScreen;
