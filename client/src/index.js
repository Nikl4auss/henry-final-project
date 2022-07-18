import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Auth0ProviderWithHistory from './components/Admin/Auth0ProviderWithHistory.jsx'
import { store } from './store';
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
