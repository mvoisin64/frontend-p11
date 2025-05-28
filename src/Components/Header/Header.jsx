import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userslice';



const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useSelector((state) => state.user);



  return (
    <header className="header">
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/public/img/argentBankLogo.avif"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div className="main-nav-right">
          {isLoggedIn ? (
            <div className="nav-authenticated">
              <Link className="main-nav-item" to="/user">
                <i className="fa fa-user-circle"></i>
                <span>{userName}</span>
              </Link>
              <Link
                className="main-nav-item"
                to="/"
                onClick={() => {
                  dispatch(logout());
                  localStorage.removeItem('token');
                }}
              >
                <i className="fa fa-sign-out"></i>
                <span>Sign Out</span>
              </Link>
            </div>
          ) : (
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              <span id="signintext">Sign In</span>
            </Link>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Header;