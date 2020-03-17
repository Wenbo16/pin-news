import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';
import logo from './logo.png'
import './Base.css';


const countries = ["Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


const Base: React.FC = () => {
  const [searchPrefix, setSearchPrefix] = useState('');
  const [searchResults, setSearchResults] = useState(countries);
  const [isAutocompleteOn, setIsAutocompleteOn] = useState(false);
  
  // close the result list when click elsewhere
  document.addEventListener('click', function(){
    setIsAutocompleteOn(false);
  });

  const onChangePrefixHandler = (e:any) => {
    let value = e.target.value;
    setSearchPrefix(value);
    if(value.length < 2) {
      setIsAutocompleteOn(false);
    } else {
      setIsAutocompleteOn(true);
    }
  }

  return (
    <div>
      <header className="header">
        <div className="search_section">
          <img className="logo" src={logo} alt="logo" />
          <form className="search_form">
            <input
              placeholder="input search text"
              style={{ width: 600 }}
              id="autocomplete-input"
              className="autocomplete"
              value={searchPrefix}
              onChange={e => onChangePrefixHandler(e)}
              autoComplete="off"
              autoFocus
            />
            {isAutocompleteOn && (
              <div id="search-results">
                  {searchResults.map((res, index) => (
                    <div className="search-results-item" key={index}>
                      <span className="search-results-text">{res}</span>
                    </div>
                  ))}
              </div>
            )}
          </form>
        </div>
        <div className="user_auth">
          {Auth.isUserAuthenticated() ? (
            <>
              <span>{Auth.getEmail()}</span>
              <Link to="/logout">Log out</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
            
      </header>
    </div>
  )
};

export default Base;
