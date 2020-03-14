import React from 'react';
import './App.css';
import NewsPanel from '../NewsPanel/NewsPanel';
import SideMenu from '../SideMenu/SideMenu.view';


const App = () => (
  <div>  
    <div className="container">
      <SideMenu />
      <NewsPanel />
    </div>
  </div>
);

export default App;
