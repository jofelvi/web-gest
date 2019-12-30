import React from 'react';
import { EditableFormRow, EditableCell } from './editableRow';
import { Table } from 'antd';

class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		if(!this.props.handleSave || typeof this.props.handleSave !== 'function') {
			throw "EditableTable: la propiedada 'handleSave' debe definirse";
		}
		this.columns = this.props.columns;
		this.state = {
			dataSource: this.props.dataSources,
		}
	};

	handleSave = row => {
		if(this.props.handleSave && typeof this.props.handleSave === 'function') {
			this.props.handleSave(row);
			this.setState({ dataSource: this.props.dataSource });
		}	else {
			throw "EditableTable: la propiedada 'handleSave' debe definirse";
		}
	};

	render() {
		const tableComponents = {
			body: {
				row: EditableFormRow,
				cell: EditableCell,
			},
		};
		const { dataSource } = this.props;
		const cols = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
        <Table
					className="table-indas"
					rowClassName={() => 'editable-row'}
          components={tableComponents}
          dataSource={dataSource}
          columns={cols}
					pagination={{ pageSize: 4 }}
        />
    );
	};
};

export { EditableTable };
