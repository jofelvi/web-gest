import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Col, Icon } from 'antd';

import { FilterContainer, FilterText } from './styles';

const renderIcon = ({ name, sortOrder }, sortBy) => {
  if (name === sortBy && sortOrder === 'desc') {
    return <Icon type='down' />;
  }
  return <Icon type='up' />;
};

const fetchOrderedTaskList = (filter, pathname, fetchTaskList) => {
  if (pathname.includes('/user')) {
    return fetchTaskList({ type: 'user', sortOrder: filter });
  }
  if (pathname.includes('/group')) {
    return fetchTaskList({ type: 'group', sortOrder: filter });
  }
  return fetchTaskList({ type: 'all', sortOrder: filter });
};

const TaskFilterItem = ({
  name,
  text,
  sortBy,
  setTaskListFilter,
  fetchTaskList,
  pathname,
}) => {
  const [filter, setFilter] = useState({ name, sortOrder: 'asc' });
  useEffect(() => {
    if (filter.name !== sortBy) {
      setFilter({ ...filter, sortOrder: 'asc' });
    }

    fetchOrderedTaskList(filter.sortOrder, pathname, fetchTaskList);
  }, [filter.sortOrder]);

  return (
    <FilterContainer
      type='flex'
      justify='center'
      onClick={() => {
        setTaskListFilter({
          sortBy: filter.name,
        });

        return filter.sortOrder === 'asc'
          ? setFilter({ ...filter, sortOrder: 'desc' })
          : setFilter({ ...filter, sortOrder: 'asc' });
      }}
    >
      <Col>
        <FilterText>{text}</FilterText>
        {renderIcon(filter, sortBy)}
      </Col>
    </FilterContainer>
  );
};

TaskFilterItem.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setTaskListFilter: PropTypes.func.isRequired,
};

export default TaskFilterItem;
