import React from 'react';
import ReactDOM from 'react-dom';
import './Global.scss';
import App from './App';
import { unregister } from './registerServiceWorker';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';

/* As of v13.0.0 of react-dates, this project relies on react-with-styles. If you want to continue using
   CSS stylesheets and classes, there is a little bit of extra set-up required to get things going. As such,
   you need to import react-dates/initialize to set up class names on our components. This import should go
   at the top of your application as you won't be able to import any react-dates components without it.

  Note: This component assumes box-sizing: border-box is set globally in your page's CSS.
 */
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


const { store, } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('root'));

unregister();
