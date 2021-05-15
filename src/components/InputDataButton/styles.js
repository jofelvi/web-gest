
import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
   width: 100%;
   display: flex;
   padding: 5px;
   flex-direction: row;
   justify-content: flex-start;
   align-items: flex-end;
   flex-wrap: wrap;
`;
export const ContainerDataLabel = styled.div`
   width: 80%;
   display: flex;
   padding: 5px 9px 0px 5px;
   flex-direction: row;
   justify-content: flex-start; 
   align-items: flex-end;

`;

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: row;
   align-items: flex-end;
   padding-bottom: 5px;
   padding-left: 5px;
   flex: 0 50%;
   justify-content:  stretch;
`;


export const ContainerData = styled.div`
  margin: 0px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 10px;
  padding-right: 10px;
`;

export const ButtonCustom = styled(Button)`

`;
export const Label = styled.span`
   width: fit-content;
   margin: 0px;
   font-weight: 700;
   font-size: 0.7em;
   color: rgba(0, 0, 0, 0.85);
   padding-right: 5px;
   white-space: nowrap;

`;


