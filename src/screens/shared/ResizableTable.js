import React from 'react';
import { Table } from 'antd';
import {Resizable} from "react-resizable";

const ResizableTitle = props => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={e => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: true }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

class ResizableTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: props.columns
        }
    }
    components = {
        header: {
            cell: ResizableTitle,
        },
    };

    handleResize = index => (e, { size }) => {
        this.setState(({ columns }) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });
    };

    render() {
        const columns = this.state.columns.map((col, index) => ({
            ...col,
            onHeaderCell: column => ({
                width: column.width,
                onResize: this.handleResize(index),
            }),
        }));

        const table_props = { ...this.props, columns: columns }

        return <Table bordered components={this.components} { ...table_props } />;
    }
}

export default ResizableTable;
