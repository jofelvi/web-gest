
import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
   width: 100%;
   display: flex;
   padding: 5px;
   flex-direction: row;
   justify-content: center;
   align-items: flex-end;

`;
export const ContainerDataLabel = styled.div`
   width: 75%;
   display: flex;
   padding: 5px 9px 0px 5px;
   flex-direction: row;
   justify-content: flex-start; 
   align-items: flex-end;

`;


export const ContainerData = styled.div`
  margin: 0px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
`;

export const ButtonCustom = styled(Button)`

`;
export const Label = styled.span`
   width: 60%;
   margin: 0px;
   font-weight: 700;
   font-size: 12px;
   color: rgba(0, 0, 0, 0.85);
   padding-right: 5px;

`;


