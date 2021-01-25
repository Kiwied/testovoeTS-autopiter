import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

import './NavBar.css';
import { IOrg } from "../../interfaces";

interface NavBarProps {
  setResult(newResult: {}): void
  setSuggestions(newSuggestions: []): void
  savedResults: IOrg[]
}

export const NavBar: React.FC<NavBarProps> = ({ setResult, setSuggestions,
                                                savedResults }) =>
{
  // переменная для определения текущего роута
  const location = useLocation();

  // "отчистка" страницы при переходе на нее обратно с '/saved'
  const handleClearPage = () => {
    if (location.pathname !== '/') {
      setResult({});
      setSuggestions([]);
    }
  }

  return (
    <nav className="navigation">
      <NavLink exact to="/"
               className="navigation__link"
               activeClassName="navigation__link navigation__link_active"
               onClick={handleClearPage}
      >Новая организация</NavLink>

      <NavLink to="/saved"
               className="navigation__link"
               activeClassName="navigation__link navigation__link_active"
      >Сохраненные организации ({savedResults.length})</NavLink>
    </nav>
  )
}
