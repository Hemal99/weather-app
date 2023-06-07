import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8rem;
`;
export const Title = styled.h1`
  color: ${({ theme }) => theme.appTitleColor};
  font-size: 2.2rem;
`;
export const GithubLink = styled.a`
  margin-left: 1rem;
  svg {
    fill: ${({ theme }) => theme.appTitleColor};
  }
  &:hover svg {
    fill: #20546a;
  }
`;
export const HeaderIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  /* Add your desired styles here */
  padding: 8px 16px;
  background-color: #20546a;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  /* Add any additional styles or hover effects */
  &:hover {
    background-color: #0077cc;
  }
`;
