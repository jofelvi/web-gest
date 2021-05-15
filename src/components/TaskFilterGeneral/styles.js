import styled from 'styled-components';

export const TriggerFilterButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70px;
    cursor: pointer;
    padding: 8px 7px;
    background-color: transparent;
    border: 1px grey solid;
    outline: none;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
    &:hover {
        background-color: white;
        border: 1px white solid;
    }
`;

export const TextButton = styled.p`
    margin: 0;
    padding: 0;
    line-height: 1;
`;

export const BottomSpacedDiv = styled.div`
    margin-bottom: 15px;
`;