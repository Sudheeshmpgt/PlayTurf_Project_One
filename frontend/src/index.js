import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './Store/usercontext'
import Search from './Store/searchcontext';

ReactDOM.render(
  <React.StrictMode>
    <Search>
      <User>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </User>
    </Search>
  </React.StrictMode>,
  document.getElementById('root')
);

