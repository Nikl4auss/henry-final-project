import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react'
import {store} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Auth0Provider 
      domain='dev-a6gv3ggc.us.auth0.com'
      clientId='lYYnCzrqH2clZw5C6FiRsJA6jAPInZmG'
      redirectUri='http://localhost:3000/home'
      cacheLocation="localstorage"
      >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
  </Provider>
);
