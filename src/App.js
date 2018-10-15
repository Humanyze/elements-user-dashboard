import React from 'react';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import { compose } from 'recompose';
import withAnalytics, { initAnalytics } from 'react-with-analytics';
import Header from 'Common/header/Header';
import AppRoutes from './components/AppRoutes';
import ModalRoot from './components/modal/ModalRoot';
import RouterPaths from 'RouterPaths';


initAnalytics(process.env.REACT_APP_GA_TRACKING_ID);

const enhanceCreator = (configOptions) => compose(
  withRouter,
  withAnalytics(configOptions)
);

const CorePure = () => (
  <div>
    <Header/>
    <AppRoutes/>
    <ModalRoot/>
  </div>
);

const Core = enhanceCreator({ basename: RouterPaths.basePath  })(CorePure);

const App = () => (
  <div>
    <Router basename={RouterPaths.basePath}>
      <Core />
    </Router>
  </div>
);

export default App;
