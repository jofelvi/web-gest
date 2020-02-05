
import styled from "styled-components";
import {marginDataDisplay, textBadgeColor, dataNumberColor, dataNumberBold, dataNumberPadding, dataNumberSize, textBadgeSize} from './constants';
export const ContainerData = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: ${marginDataDisplay};

       
`;

export const TextBadge = styled.span`
font-size: ${textBadgeSize}1.1em;
white-space: nowrap;
color: ${textBadgeColor};
display: flex;
align-items: center;

`;
export const DataNumber = styled.span`
font-size:  ${dataNumberSize}1.2em;
color: ${dataNumberColor}; 
font-weight: ${dataNumberBold};
padding: ${dataNumberPadding};

  
`;