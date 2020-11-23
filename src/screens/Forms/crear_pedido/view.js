
import React from 'react';
import 'antd/dist/antd.css';
import {Button, Modal, Popconfirm, Description, Table, Input, AutoComplete} from 'antd';
import ButtonGroup from "antd/lib/button/button-group";
import {DeleteOutlined, LoadingOutlined} from "@ant-design/icons";
import _ from 'underscore';

import {
    InfoContainer,
    DescriptionContainer,
    TableContainer,
} from './styles';
const { Option } = AutoComplete;

const { Column } = Table;


class ModalCreateOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lines: [
                { codnacional: '', nombre: '', cantidad: '', descuento: '', saved: false, puntos_acumulados_unidad: ''}
            ],
            productOptions: []
        }
        this.onProductSearch = this.onProductSearch.bind(this);
        props.loadProducts();
    }

    componentWillReceiveProps(newProps) {

    }

    componentDidMount() {

    }

    onProductSelect(data, index) {
        var lines = this.state.lines
        const line = lines[index]
        lines[index] = { ...line, codnacional: data }
        //this.setState({ lines: lines, productOptions: [] })
    }
    onProductSearch(searchText) {
        var options = []
        if ( searchText && this.props.products && this.props.products.length > 0) {
            console.log('--- FILTERING: '+searchText)
            const mappedProducts = _.map(this.props.products, (product) => {
                return {value: product.codnacional }
            })
            const filteredProducts = _.filter(mappedProducts, (product) => {
                return product.value.search(searchText) > -1;
            })
            console.log(mappedProducts)
            console.log(filteredProducts)
            options = filteredProducts;
        }


        console.log('--- binding options')
        console.log(options)

        this.setState({ productOptions: options })

    }

    render = () => {
        const { visibility, ok, cancel  } = this.props;
        const { productOptions, lines  } = this.state;
        return (
            <div>
                <Modal
                    title="Crear pedido"
                    visible={visibility}
                    destroyOnClose={true}
                    onOk={ok}
                    onCancel={cancel}
                    width= {900}
                    bodyStyle = {{height: '600px'}}
                >
                    <TableContainer>
                        <Table dataSource={this.state.lines} pagination={false}>
                            <Column
                                title="Cod. Indas"
                                dataIndex="----codigo indas"
                                key="codnacional"
                                render={ (text, row, index) => {
                                    return row.saved ? (row.codnacional) : (
                                        <AutoComplete
                                            onSelect={(data) => { alert(data) }}
                                            onSearch={this.onProductSearch}
                                            placeholder={"Cod Indas"}
                                        >
                                            {productOptions.map((obj: string) => (
                                                <Option key={obj.value} value={obj.value}>
                                                    {obj.value}
                                                </Option>
                                            ))}
                                        </AutoComplete>
                                        );
                                }}
                            />
                            <Column
                                title="Nombre Producto"
                                dataIndex="nombre"
                                key="nombre"
                            />
                            <Column
                                title="Unidades"
                                dataIndex="cantidad"
                                key="cantidad"

                                render={ (text, row, index) => {
                                    return row.saved ? (row.codnacional) : (
                                        <Input
                                            value={row.cantidad}
                                            onChange={(e) => {
                                                var lines = this.state.lines
                                                const line = lines[index]
                                                lines[index] = { ...line, cantidad: e.currentTarget.value }
                                                this.setState({ lines: lines })
                                            }}
                                        />
                                    );
                                }}
                            />
                            <Column
                                title="Descuento"
                                dataIndex="descuento"
                                key="descuento"

                                render={ (text, row, index) => {
                                    return row.saved ? (row.descuento) : (
                                        <Input
                                            value={row.descuento}
                                            onChange={(e) => {
                                                var lines = this.state.lines
                                                const line = lines[index]
                                                lines[index] = { ...line, descuento: e.currentTarget.value }
                                                this.setState({ lines: lines })
                                            }}
                                        />
                                    );
                                }}
                            />
                            <Column
                                title="Puntos Acomulados"
                                dataIndex="puntos_acumulados_unidad"
                                key="puntos_acumulados_unidad"
                            />
                            <Column
                                title="Actions"
                                key="actions"
                                render={() => {
                                    return (
                                        <Button>
                                            Save
                                        </Button>
                                    );
                                }}
                            />
                        </Table>
                    </TableContainer>
                </Modal>

            </div>
        )
    }
}


ModalCreateOrder.propTypes = {

};
export default ModalCreateOrder;

