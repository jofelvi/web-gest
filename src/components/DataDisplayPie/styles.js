
import styled from "styled-components";
import { paddingDataDisplayPie, textBadgeColor, dataNumberColor, dataNumberBold, dataNumberSize, dataNumberPadding, textBadgeSize } from './constants'
export const ContainerData = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: ${paddingDataDisplayPie};

       
`;

export const TextBadge = styled.span`
font-size: ${textBadgeSize};
white-space: nowrap;
color: ${textBadgeColor};
display: flex;
align-items: center;

`;
export const DataNumber = styled.span`
font-size: ${dataNumberSize};
color: ${dataNumberColor};
font-weight: ${dataNumberBold};
padding: ${dataNumberPadding};

  
`;