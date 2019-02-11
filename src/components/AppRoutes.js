import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { elementsReact, elementsRedux } from 'ElementsWebCommon';

import { compose, lifecycle } from 'recompose';
import Logout from 'Src/components/action-routes/logout';

import Digital from './digital/Digital';

const { ErrorManager, LoadingUI } = elementsReact;
const {
  authSelectors: { isUserAuthenticated },
  userDataSelectors: { getUserDataLoadStatus },
  userDataActions: { setUserDataByAuthId },
} = elementsRedux;

const didMount = lifecycle({
  componentDidMount() {
    this.props.setUserData();
  },
});

const AuthenticatedRoutes = compose(didMount)(({ userLoaded }) => {
  return userLoaded ? (
    <Switch>
      <Route component={Digital} />
    </Switch>
  ) : (
    <LoadingUI />
  );
});

const LoginRedirect = () => <Route component={() => (window.location.href = '/login')} />;

const AppRoutesPure = ({ authenticated, userLoaded, setUserDataByAuthId }) => {
  if (!authenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div>
      <ErrorManager />
      <Route path={'/logout'} component={Logout} />
      {authenticated ? <AuthenticatedRoutes setUserData={setUserDataByAuthId} userLoaded={userLoaded} /> : <LoginRedirect />}
    </div>
  );
};

const AppRoutes = connect(
  (state) => ({
    authenticated: isUserAuthenticated(state),
    userLoaded: getUserDataLoadStatus(state),
  }),
  { setUserDataByAuthId },
  null,
  { pure: false }
)(AppRoutesPure);

export default AppRoutes;
