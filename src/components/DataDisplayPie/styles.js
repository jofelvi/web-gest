
import styled from "styled-components";
import { paddingDataDisplayPie, textBadgeColor, dataNumberColor, dataNumberBold, dataNumberSize, dataNumberPadding, textBadgeSize } from './constants'
export const ContainerData = styled.div`
display: flex;
width: 100px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: ${paddingDataDisplayPie};
margin-top: 5px;
       
`;

export const TextBadge = styled.span`
font-size: ${textBadgeSize};
line-height: 9px;
color: ${textBadgeColor};
display: flex;
align-items: flex-start;
white-space: normal;


`;
export const DataNumber = styled.span`
font-size: ${dataNumberSize};
color: ${dataNumberColor};
font-weight: ${dataNumberBold};
padding: ${dataNumberPadding};
aling-self: bottom;

  
`;