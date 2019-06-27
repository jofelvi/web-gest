import styled from 'styled-components';
import { Col } from 'antd';

export const Container = styled.div`
  cursor: pointer;
  padding: 0 10px;
  margin: 10px 0;
  border-right: ${({ selected }) => (selected ? '3px solid #2d61af' : 'none')};
  &:hover {
    border-right: 3px solid #448fff;
  }
`;

export const TaskTitle = styled.h1`
  font-weight: 600;
  font-size: 18px;
  padding: 5px 0;
`;

export const PriorityContainer = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;
