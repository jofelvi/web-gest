import React, { useState } from 'react';

import { Row, Col, Icon } from 'antd';
import { FilterText, FilterContainer } from './styles';

const renderIcon = (name, filter) => {
  if (filter.sortBy === name) {
    return filter.sortOrder === 'asc' ? (
      <Icon type="up" />
    ) : (
      <Icon type="down" />
    );
  }
};

const TaskFilter = () => {
  const [currentFilter, setCurrentFilter] = useState({
    sortBy: 'name',
    sortOrder: 'asc'
  });

  return (
    <Row>
      <Col span={6}>
        <FilterContainer
          type="flex"
          justify="center"
          onClick={() =>
            setCurrentFilter({
              sortBy: 'name',
              sortOrder: !currentFilter.sortOrder
            })
          }
        >
          <Col>
            <FilterText>Task Name</FilterText>
            {renderIcon('name', currentFilter)}
          </Col>
        </FilterContainer>
      </Col>
      <Col span={6}>
        <FilterContainer type="flex" justify="center">
          <Col>
            <FilterText>Created</FilterText>
            {renderIcon('created', currentFilter)}
          </Col>
        </FilterContainer>
      </Col>
      <Col span={6}>
        <FilterContainer type="flex" justify="center">
          <Col>
            <FilterText>Priority</FilterText>
            {renderIcon('priority', currentFilter)}
          </Col>
        </FilterContainer>
      </Col>
      <Col span={6}>
        <FilterContainer type="flex" justify="center">
          <Col>
            <FilterText>Assignee</FilterText>
            {renderIcon('assignee', currentFilter)}
          </Col>
        </FilterContainer>
      </Col>
    </Row>
  );
};
export default TaskFilter;
