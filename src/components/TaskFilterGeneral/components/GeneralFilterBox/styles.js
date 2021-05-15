import styled from 'styled-components';

export const FilterBox = styled.div`
    position: absolute;
    background: white;
    z-index: 2;
    padding: 20px 30px;
    border: 1px solid #011529;
    padding-bottom: 45px;
    width: 310px;
    max-width: 100%;
`;

export const MainTitle = styled.h4`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 0;
`;

export const SubTitle = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 3px;
    margin-top: 14px;
`;

export const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: transparent;
    z-index: 1;
`;

export const CheckBoxContainer = styled.div`
    margin-left: 10px;
    margin-bottome: 3px;
    input {
        margin-right: 10px;
    }
`;

export const Validate = styled.button`
    background-color: transparent;
    color: #448fff;
    border: none;
    position: absolute;
    right: 10px;
    bottom: 10px;
`;

export const Reset = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    color: red;
    left: 10px;
    bottom: 10px;
`;
