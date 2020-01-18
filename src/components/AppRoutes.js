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


const LoginRedirect = () => <Route component={ () => window.location.assign('/login') }/>;

const AppRoutesPure = withRouter(({ authenticated, userLoaded, match, setUserDataByAuthId, }) => {

  if (!authenticated) {
    window.location.assign('/login');
    return null;
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
        : <LoginRedirect/>
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
