import React from 'react';
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route
} from 'react-router-dom';

import { compose } from 'recompose';
import withAnalytics, { initAnalytics } from '@humanyze/react-with-analytics';
import { elementsReact, routerPaths } from 'ElementsWebCommon';
import Register from './components/register/Register';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login/Login';

const {
  Header,
  ModalRoot,
  WithEnvClassWrapper,
} = elementsReact;

const GAToken = process.env.REACT_APP_GA_TRACKING_ID;
GAToken && initAnalytics(GAToken);

const enhanceCreator = (configOptions) => compose(
  withRouter,
  withAnalytics(configOptions)
);

export const landingRoute = '/landing';
export const loginRoute = '/login';

const CorePure = () => (
  <div>
    <Header hideUserAvatar={true} />
    <Switch>
      <Route component={Login} path={loginRoute} />
      <Route component={LandingPage} path={landingRoute} />
      <Route component={Register}/>
    </Switch>
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
