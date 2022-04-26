import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './Store/usercontext'
import Search from './Store/searchcontext';
import { Theme } from './Theme'
import { ThemeProvider } from '@mui/material/styles'
import Turf from './Store/turfcontext';
import Filter from './Store/filtercontext';
import FilterCategory from './Store/filtercategorycontrext';
import FilterPrice from './Store/filterpricecontext';
import TurfView from './Store/turfviewcontext';


ReactDOM.render(
  <React.StrictMode>
    <Search>
      <TurfView>
        <FilterPrice>
          <FilterCategory>
            <Filter>
              <Turf>
                <User>
                  <BrowserRouter>
                    <ThemeProvider theme={Theme}>
                      <App />
                    </ThemeProvider>
                  </BrowserRouter>
                </User>
              </Turf>
            </Filter>
          </FilterCategory>
        </FilterPrice>
      </TurfView>
    </Search>
  </React.StrictMode>,
  document.getElementById('root')
);

