import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import axios from 'axios';

function fetr() {
  for (let i = 0; i < 100000; i++) {
    console.log(i);
  }
}

fetr();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
);
