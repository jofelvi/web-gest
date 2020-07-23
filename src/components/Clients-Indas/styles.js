import styled from 'styled-components';
import { Checkbox } from 'antd';
export const ContentContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

export const Label = styled.h5`
  margin-bottom: 5px;
`;
export const InputsContainer = styled.div`
width: 250px;
`;

export const ContentContainerFilters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const TextContainer = styled.div`
  padding: 0px 0px 10px 0px;

  b {
    font-size: 18px;
  }
`;
export const CheckboxPasswordReset = styled(Checkbox)`
  padding: 10px 0px 10px 0px;
`;
export const ConfirmationText = styled.div`
  padding: 10px 0px 10px 0px;
`;

