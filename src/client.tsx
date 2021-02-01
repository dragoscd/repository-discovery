import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'use-http';

declare global {
  interface Window {
    __API_URL__: string;
    __GITHUB_TOKEN__: string;
  }
}

const API_URL = window.__API_URL__;
const GITHUB_TOKEN = window.__GITHUB_TOKEN__;

const fetchOptions = {
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
};

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Provider url={API_URL} options={fetchOptions}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
