import React from "react";

import {
  HeaderContainer,
  Title,
  HeaderIconsContainer,
  LogoutButton,
} from "./styed";
import { useDispatch, useSelector } from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";
import { AppStore } from "../../store/store";
import { toggleDarkMode } from "../../store/reducers/appReducer";

const Header: React.FC = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <HeaderContainer>
      <Title>Weather App</Title>
      <HeaderIconsContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;
