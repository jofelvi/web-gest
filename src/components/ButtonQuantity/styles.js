
import styled from "styled-components";
import { Button } from "antd";

const ButtonGroup = Button.Group;

export const ButtonPeriodContainer = styled(ButtonGroup)`
  margin: 0px 10px 0px 10px;
  
`;

export const ButtonNumeroPedidos = styled(Button)`
font-size: 10px !important; 
${props => props.selectedNumeroPedidos ?
  `
 color : #40a9ff !important;
 border: 1px solid #40a9ff !important;
 border-radius: 1px;
  `
 : 'border : 1px solid #D9D9D9;'};
`;
export const ButtonPVM = styled(Button)`
font-size: 10px !important; 

${props => props.selectedPVM ?
  `
 color : #40a9ff !important;
 border: 1px solid #40a9ff !important;
 border-radius: 1px;
  `
 : 'border : 1px solid #D9D9D9;'};
`;