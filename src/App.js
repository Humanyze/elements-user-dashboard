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
import Logout from './components/action-routes/logout';


const {
  Header,
  ModalRoot,
  WithEnvClassWrapper,
  PrivateRoute,
} = elementsReact;

const GAToken = process.env.REACT_APP_GA_TRACKING_ID;
GAToken && initAnalytics(GAToken);

const enhanceCreator = (configOptions) => compose(
  withRouter,
  withAnalytics(configOptions)
);

export const landingRoute = '/landing';
export const loginRoute = '/login';
export const registerRoute = '/register';

const CorePure = () => (
  <div>
    <Header hideUserAvatar={true} />
    <Switch>
      <PrivateRoute component={LandingPage} path={landingRoute} />
      <Route component={Register} path={registerRoute}/>
      <Route component={Logout} path={'/logout'}/>
      <Route component={Login}/>
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
