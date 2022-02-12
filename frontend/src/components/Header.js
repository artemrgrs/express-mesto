import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom'; 

function Header({ email, loggedIn, onSignOut }) {
  const location = useLocation();
  
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Mesto"/>
      {loggedIn ? (
      
        <div className="header__info-container">
          <p className="header__user-info">{email}</p>
          <button className='header__signout-button' onClick={onSignOut}>Выйти</button>
        </div>
          
        ) : ( 
          <Link to={location.pathname === "/sign-in" ? '/sign-up' : '/sign-in'}
            className="header__link">{location.pathname === "/sign-in" ? 'Регистрация' : 'Войти'}</Link> 
        )
      }
    </header>
  );
}

export default Header;