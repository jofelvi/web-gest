
import styled from "styled-components";
import { Button as AntdButton } from "antd";

const ButtonGroup = AntdButton.Group;

export const ButtonContainer = styled(ButtonGroup)`
  margin: 0px 10px 0px 10px;
  font-size: 10px;
`;

export const Button = styled(AntdButton)`
  font-size: 10px !important; 
  ${props => props.selected ?
  `
    color : #40a9ff !important;
    border: 1px solid #40a9ff !important;
    border-radius: 1px
  ` : `
    border : 1px solid #D9D9D9;
  `};
`;
