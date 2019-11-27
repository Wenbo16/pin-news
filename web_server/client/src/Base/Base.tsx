import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import './Base.css';

const Base = () => {
  let history = useHistory();
  return (
    <div>
      <nav className="nav-bar indigo lighten-1">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            {' '}
            Pin News
          </a>
          <ul id="nav-mobile" className="right">
            {Auth.isUserAuthenticated() ? (
              <div>
                <li>{Auth.getEmail()}</li>
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              </div>
            ) : (
              <div>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
      <br />
    </div>
  )
};

export default Base;
