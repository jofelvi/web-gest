import React, { useEffect } from 'react';
import {Table, Switch, Col, Button, Row, Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {Formik} from 'formik'
import { handleInput } from '../../../../../lib/forms';

const getColumnSearchProps = dataIndex =>
    (
        {
    filterDropdown: ({loadUsers}) => (
        <Formik
                onSubmit={(values) => { 
                    console.log("values", values)   
                    loadUsers({page: 1, emailComo: values.searchEmail})       
                    
                }}
            >
            {(props) => {

                const {
                    values,
                    setFieldValue,
                    handleSubmit,
                    errors,
                } = props;
            return(
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
           console.log(node);
          }}
          id= "searchEmail"
          placeholder={`Buscar ${dataIndex}`}
          value={values.searchEmail}
          onChange={handleInput(setFieldValue, 'searchEmail')}
         // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
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
      </div>)}}
      </Formik>
    ),
  });

  export default getColumnSearchProps;
