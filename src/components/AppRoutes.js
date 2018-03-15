import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Deployment from './deployment/Deployment';
import Login from '../Login';
import { getCurrentError } from '../redux/error/errorReducer';
import ErrorPage from './error-page/ErrorPage';

const AuthenticatedRoutes = ({ path, userLoaded }) => {
    return userLoaded && (
        <Switch>
            <Route component={Deployment}/>
            {/*<Route component={() => <Redirect to={`${path}`}/>}/>*/}
        </Switch>
    );
};


const UnauthenticatedRoutes = ({ path }) => (
    <Switch>
        <Route path={`${path}login`} component={Login}/>
        <Route component={() => <Redirect to='/login'/>}/>
    </Switch>
);


const AppRoutesPure = withRouter(({ authenticated, userLoaded, error, match }) => {
    if (error) return <ErrorPage error={error}/>;

    const { path } = match;

    return authenticated ?
        <AuthenticatedRoutes path={path}
                             userLoaded={userLoaded}/>
        : <UnauthenticatedRoutes path={path}/>;

});

const AppRoutes = connect(
    (state) => (
        {
            authenticated: !!state.auth.tokenObj,
            userLoaded: !!state.user.user.user,
            error: getCurrentError(state)
        }
    ), null, null,
    { pure: false }
)(AppRoutesPure);


export default AppRoutes;