import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Input } from 'antd';
import Auth from '../Auth/Auth';
import logo from './logo.png'
import './Base.css';

const { Search } = Input;

const Base = () => {
  let history = useHistory();
  return (
    <div>
      <header className="header">
        {/* <a href="/" className="brand-logo"> */}
          <img className="logo" src={logo} alt="logo" />
        {/* </a> */}
        <div className="search_form">
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 600 }}
          />
        </div>

        <div className="user_auth">
          <ul>
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
            
      </header>
    </div>
  )
};

export default Base;
