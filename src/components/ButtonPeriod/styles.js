
import styled from "styled-components";
import { Button } from "antd";

const ButtonGroup = Button.Group;

export const ButtonPeriodContainer = styled(ButtonGroup)`
margin: 0px 10px 0px 10px;
font-size: 10px;
`;

export const ButtonPerMonth = styled(Button)`
font-size: 10px !important; 
${props => props.selectedMonth ?
    `
   color : #40a9ff !important;
   border: 3px solid #40a9ff !important;
   border-radius: 3px
    `
   : 'border : 1px solid #D9D9D9;'};

`;

export const ButtonPerYear = styled(Button)`
font-size: 10px !important; 

${props => props.selectedYear ?
    `
   color : #40a9ff !important;
   border: 3px solid #40a9ff !important;
   border-radius: 3px
    `
   : 'border : 1px solid #D9D9D9;'};
`;

export const ButtonPerDay = styled(Button)`

font-size: 10px !important; 
${props => props.selectedDay ?
    `
   color : #40a9ff !important;
   border: 3px solid #40a9ff !important;
   border-radius: 3px
    `
   : 'border : 1px solid #D9D9D9;'};
`;

export const ButtonPerHour = styled(Button)`
font-size: 10px !important; 
${props => props.selectedHour ?
    `
   color : #40a9ff !important;
   border: 3px solid #40a9ff !important;
   border-radius: 3px
    `
   : 'border : 1px solid #D9D9D9;'};

`;