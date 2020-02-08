import React from 'react';
import ReactDOM from 'react-dom';
import './Global.scss';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import * as Sentry from '@sentry/browser';

// TODO:  Set up separate dsn's for qa, develop, and production once we move to self hosted
Sentry.init({ dsn: 'https://4836424eaaa046c29e7024b09682cc3e@sentry.io/2217351' , });

const { store, } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));

unregister();
