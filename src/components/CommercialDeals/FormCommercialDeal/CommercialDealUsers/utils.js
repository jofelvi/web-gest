import React, { useEffect } from 'react';
import {Table, Switch, Col, Button, Row, Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
        //   ref={node => {
        //     searchInput = node;
        //   }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          //onChange={e =>(handleInput(value, 'descripcion'))}
         // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          //onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button 
        // onClick={() => handleReset(clearFilters)} 
        size="small" 
        style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    // filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    // onFilter: (value, record) =>
    //   record[dataIndex]
    //     .toString()
    //     .toLowerCase()
    //     .includes(value.toLowerCase()),
    // onFilterDropdownVisibleChange: visible => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select());
    //   }
    // },
    render: text => console.log("text",text)
    // dataIndex === 'email'? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       //searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text.toString()}
    //     />
    //   ) : (
    //     text
    //   ),
  });
