import styled from "styled-components";

import { Button, Input, DatePicker } from "antd";
const { RangePicker} = DatePicker;

export const ChartContainer = styled.div`
  width: 30%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StaticticsContainer = styled.div`
 min-width: 98%;
  height: 70%;
  padding: 40px;
  background-color: white;
  display: flex;
  flex-direction: row;
  overflow: auto;
  align-items: center;
  justify-content: space-around;
`;



