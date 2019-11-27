import React from 'react';
import logo from './logo.png';
import './App.css';

import NewsPanel from '../NewsPanel/NewsPanel';

const App = () => (
  <div>
    {/* <img className="logo" src={logo} alt="logo" /> */}
    <div className="container">
      <NewsPanel />
    </div>
  </div>
);

export default App;
