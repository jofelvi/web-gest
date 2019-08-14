import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Table, Avatar } from 'antd';

const { Column, ColumnGroup } = Table;

const UsersListScreen = ({ fetchUsers, users, history }) => {
  useEffect(() => {
    fetchUsers({ history });
  }, [fetchUsers]);

  return (
    <Table dataSource={users}>
      <Column
        title="Avatar"
        dataIndex="picture.thumbnail"
        key="avatar"
        render={picture => <Avatar src={picture} />}
      />
      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="name.first" key="firstName" />
        <Column title="Last Name" dataIndex="name.last" key="lastName" />
      </ColumnGroup>
      <Column title="Age" dataIndex="dob.age" key="age" />
      <Column title="Address" dataIndex="location.street" key="address" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Phone" dataIndex="phone" key="phone" />
    </Table>
  );
};

UsersListScreen.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UsersListScreen;
