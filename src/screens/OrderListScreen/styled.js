import styled from "styled-components";

import { Avatar, Col, Button, Input, DatePicker } from "antd";
const { RangePicker} = DatePicker;
export const Maincontainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export const InputsContainer = styled.div`
width: 96%;
 display: flex;
 padding: 20px;
 justify-content: space-around;
 align-items: center;

`;

export const InputBox = styled(Input)`
  width: 200px;
  height: 32px;
  margin: 10px;
`;

export const MainContainerModal = styled.div`
 display: flex;
 flex-direction: column;
 max-height: 95%;
 overflow: auto;
`;

export const DatePickerFromTo = styled(RangePicker)`
width: 200px;
margin: 10px

`;

export const TableContainer = styled.div`
max-width: 100%;
overflow: scroll;
`;

export const ButtonsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 20px;
`;
export const PaginationButton = styled(Button)`
background-color: rgba(0, 33, 64, 0.85);  
color: white;
margin-left: 30px;
display: flex;
align-items: center;
justify-content: center;


`;
export const SerachOrdersButton = styled(Button)`
background-color: rgba(0, 33, 64, 0.85);  
color: white;
max-width: 40px;
display: flex;
align-items: center;
justify-content: center;
`;
