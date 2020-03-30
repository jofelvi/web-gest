import styled from "styled-components";
import { Row, Col } from 'antd';

export const TasksListRow = styled(Row)`
    overflow: auto;
    max-height: 100vh;
`;
export const TaskListCol = styled(Col)`
    overflow: scroll;
`;
