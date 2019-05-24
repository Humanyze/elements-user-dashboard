import React from 'react';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';

import { compose } from 'recompose';
import withAnalytics, { initAnalytics } from '@humanyze/react-with-analytics';
import { elementsReact, routerPaths } from 'ElementsWebCommon';
import Register from './components/register/Register';
const { Header, ModalRoot, WithEnvClassWrapper, } = elementsReact;


const GAToken = process.env.REACT_APP_GA_TRACKING_ID;
GAToken && initAnalytics(GAToken);

const enhanceCreator = (configOptions) => compose(
  withRouter,
  withAnalytics(configOptions)
);

const CorePure = () => (
  <div>
    <Header hideUserAvatar={true} />
    <Register />
    <ModalRoot />
  </div>
);

const Core = enhanceCreator({ basename: routerPaths.basePath, })(CorePure);

const App = () => (
  <WithEnvClassWrapper>
    <Router basename={routerPaths.basePath}>
      <Core />
    </Router>
  </WithEnvClassWrapper >
);

export default App;
