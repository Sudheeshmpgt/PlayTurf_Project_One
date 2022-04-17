import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './Store/usercontext'
import Search from './Store/searchcontext';
import {Theme} from './Theme'
import {ThemeProvider} from '@mui/material/styles'



ReactDOM.render(
  <React.StrictMode>
    <Search>
      <User>
        <BrowserRouter>
        <ThemeProvider theme={Theme}>
        <App />
        </ThemeProvider>
        </BrowserRouter>
      </User>
    </Search>
  </React.StrictMode>,
  document.getElementById('root')
);

