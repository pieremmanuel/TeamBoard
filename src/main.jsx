import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadSessionFromLocalStorage } from './utils/sessionStorage';
import { setSession } from './redux/slices/sessionSlice';

// Load session before rendering
const session = loadSessionFromLocalStorage();
if (session) {
  store.dispatch(setSession(session));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
