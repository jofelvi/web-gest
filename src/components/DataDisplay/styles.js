
import styled from "styled-components";
import {marginDataDisplay, textBadgeColor, dataNumberColor, marginDataDisplayClients, dataNumberBold, dataNumberPadding, dataNumberSize, textBadgeSize} from './constants';
export const ContainerData = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
${props => props.clientsData ?
    `padding: ${marginDataDisplayClients};`
   : `padding: ${marginDataDisplay};`};       
`;

export const TextBadge = styled.span`
font-size: ${textBadgeSize};
white-space: nowrap;
color: ${textBadgeColor};
display: flex;
align-items: center;

`;
export const DataNumber = styled.span`
font-size:  ${dataNumberSize};
color: ${dataNumberColor}; 
font-weight: ${dataNumberBold};
padding: ${dataNumberPadding};

  
`;