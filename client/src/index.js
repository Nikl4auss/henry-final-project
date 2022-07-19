import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import { Auth0Provider } from '@auth0/auth0-react'
import {store} from './redux/store';

import { Provider } from 'react-redux';
import Auth0ProviderWithHistory from './components/Admin/Auth0ProviderWithHistory.jsx'

import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
);
