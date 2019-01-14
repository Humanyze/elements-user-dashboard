import React from 'react';
import ReactDOM from 'react-dom';
import './Global.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import { EventTrackingProvider } from 'Common/event-tracking-provider/EventTrackingProvider';

import mixpanel from 'mixpanel-browser';
import Raven from 'raven-js';
const { store } = createStore();

mixpanel.init('23071668534d0dd256d9c4e570d30052');
const raven = Raven.config('https://d5d5ac2c4f7744d782b534b892ae3fc5@sentry.io/1221842').install();



// FIND HOOK LUCAS EVENT TRACKER
ReactDOM.render(
    <EventTrackingProvider mixpanel={mixpanel} raven={raven}>
      <Provider store={store}>
        <App/>
      </Provider>
    </EventTrackingProvider>
  , document.getElementById('root'));

  registerServiceWorker();
