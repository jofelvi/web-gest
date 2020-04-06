import styled from 'styled-components';
import { Row, Card } from 'antd';

export const Container = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CardCustom = styled(Card)`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ContentContainer = styled.div`
  flex-direction: column;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


export const TaskText = styled.h1`
  font-size: 24px;
`;

export const ProcessText = styled.span`
  font-weight: 400;
  font-size: 16px;
`;
export const ContainerTextArea = styled.div`
  width: 100%;
`;
export const ContainerTabs = styled.div`
  width: 100%;
`;

export const ContainerModal = styled.div`
  width: 100%;
`;

export const ContainerInputData = styled.div`
 width: 100%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 padding-bottom: 10px;
`;

export const Label = styled.h5`

`;
export const ContainerSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

`;


// export const ContentContainer = styled(Row)`
//   height: 20rem;
// `;
