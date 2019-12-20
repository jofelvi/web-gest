import React from 'react';
import { EditableFormRow, EditableCell } from './editableRow';
import { Table } from 'antd';

class EditableTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = this.props.columns;
		this.isDidUpdate = false;
		this.state = {
			dataSource: this.props.dataSources,
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if(!this.isDidUpdate && 
				Array.isArray(prevProps.dataSource) && prevProps.dataSource.length !== 0 &&
				prevState.dataSource !== prevProps.dataSource) {
			this.setState({ dataSource: prevProps.dataSource });
			this.isDidUpdate = true;
		}
	}

	handleSave = row => {
		//console.log("handleSave.row:", row);
		const newData = [...this.state.dataSource];
		const index = newData.findIndex(item => row.codindas === item.codindas);
		const item = newData[index];
		//console.log("handleSave.newData:", newData);
		//console.log("handleSave.item:", item);
		newData.splice(index, 1, {
			...item,
			...row,
		});
		this.setState({ dataSource: newData });
		//console.log("handleSave.dataSource:", this.state.dataSource);
		if(this.props.updateData && typeof this.props.updateData === 'function') {
			this.props.updateData(newData);
		}
	};

	render() {
		const tableComponents = {
			body: {
				row: EditableFormRow,
				cell: EditableCell,
			},
		};
		const { dataSource } = this.state;
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
          components={tableComponents}
          dataSource={this.state.dataSource}
          columns={cols}
					pagination={{ pageSize: 4 }}
        />
    );
	};
};

export { EditableTable };
