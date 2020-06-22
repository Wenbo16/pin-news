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
      <header>
        <nav>
          <div className="search_container">
            <div className="logo"><img src={logo} alt="logo" /></div>
            <form>
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
          <ul className="user_auth">
            {Auth.isUserAuthenticated() ? (
              <>
                <li><span>{Auth.getEmail()}</span></li>
                <li><Link to="/logout">Log out</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  )
};

export default Base;
