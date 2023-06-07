import styled from "styled-components";

export const ForecastContainer = styled.div`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.forecastPanelBgColor};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  overflow: hidden;
`;
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.panelTitleColor};
`;
export const ForecastItems = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;

  > :last-child {
    margin-right: 0;
  }
`;

export const ForecastItemsInitial = styled.div`
  display: flex;
  margin-left: 8rem;
  margin-right: 8rem;
  justify-content: space-between;
  overflow-x: auto;

  > :last-child {
    margin-right: 0;
  }
`;

export const ForecastItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #4581c5;
  border-radius: 15px;
  padding: 1.5rem;
  align-items: center;
  margin-top: 1rem;
  h6 {
    font-weight: 600;
    font-size: 1.125rem;
    color: #4581c5;
  }
  svg {
    width: 4rem;
    height: 4rem;
    margin: 0.7rem 0;
  }
  p {
    font-weight: 600;
    font-size: 1.125rem;
    color: #4a6fa1;
  }
  span {
    font-size: 1.125rem;
    color: #4a6fa1;
    width: 5rem;
    text-align: center;
  }

  &:hover {
    background-color: #fff;
    color: black;
  }
`;
