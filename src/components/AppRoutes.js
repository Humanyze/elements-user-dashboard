import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Deployment from './deployment/Deployment';
import { compose, lifecycle } from 'recompose';
import Logout from 'Src/components/action-routes/logout';

import { elementsReact, elementsRedux } from 'ElementsWebCommon';
const { ErrorManager, LoadingUI, } = elementsReact;
const {
  authSelectors: { isUserAuthenticated, },
  userDataSelectors: { getUserDataLoadStatus, },
  userDataActions: { setUserDataByAuthId, },
} = elementsRedux;

const onWillMount = lifecycle({
  componentDidMount() {
    this.props.setUserData();
  },
});


const AuthenticatedRoutes = compose(onWillMount)(({ path, userLoaded, }) => {
  return userLoaded ? (
    <Switch>
      <Route component={Deployment}/>
    </Switch>) : <LoadingUI/>;

});


const LoginRedirect = (props) => {
  const { currentLocation, } = props;

  const url = currentLocation ? `/login?next=${encodeURIComponent(currentLocation)}` : '/login';
  return (
    <Route component={ () => window.location.assign(url) }/>
  );
};

const AppRoutesPure = withRouter(({ authenticated, userLoaded, match, setUserDataByAuthId, location, }) => {

  if (!authenticated) {
    return (
      <LoginRedirect currentLocation={location} />
    );
  }

  const { path, } = match;

  return (
    <div>
      <ErrorManager/>
      <Route path={'/logout'} component={Logout}/>
      {authenticated ?
        <AuthenticatedRoutes path={path}
          setUserData={setUserDataByAuthId}
          userLoaded={userLoaded}/>
        : <LoginRedirect currentLocation={location}/>
      }
    </div>
  );

});

const AppRoutes = connect(
  (state) => (
    {
      authenticated: isUserAuthenticated(state),
      userLoaded: getUserDataLoadStatus(state),
    }
  ), { setUserDataByAuthId, }, null,
  { pure: false, }
)(AppRoutesPure);


export default AppRoutes;
