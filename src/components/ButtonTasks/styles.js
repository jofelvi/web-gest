
import styled from "styled-components";
import { Button } from 'antd';
import {marginLeftButtonTask, buttonTaskTextSize, buttonTaskTextMarginTop} from './constants'

export const ButtonTask = styled(Button)`
min-width: 160px;
height: 80px;
margin-left:${marginLeftButtonTask};
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
 
export const ButtonText = styled.div`
font-size: ${buttonTaskTextSize};
margin-top: ${buttonTaskTextMarginTop};
`;
