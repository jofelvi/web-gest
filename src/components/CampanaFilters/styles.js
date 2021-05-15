import styled from "styled-components";

export const VisibleFiltersContainer = styled.div`
    width: 70%;
    padding: 10px;
`;

export const CampaignCouponInputContainer = styled.div``;

export const Label = styled.label``;

export const HiddenFiltersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
`;

export const DatePickerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

export const StateSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    padding-left: 20px;
`;

export const FiltersButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    > a,
    button {
        margin: 0px 5px;
    }
`;

export const ShowMoreButton = styled.a`
    > span {
        margin-right: 5px;
    }
`;