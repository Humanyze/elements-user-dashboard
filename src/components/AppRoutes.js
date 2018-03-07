import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import {Switch, Route} from 'react-router-dom';

import Deployment from './deployment/Deployment';
import Login from "../Login";

const AuthenticatedRoutes = ({path, userLoaded}) => {
    return userLoaded  && (
        <Switch>
            <Route path={`${path}deployments`} component={Deployment}/>
            <Route component={() => <Redirect to='/deployments'/>}/>
        </Switch>
    );
};


const UnauthenticatedRoutes = ({path}) => (
    <Switch>
        <Route path={`${path}login`} component={Login}/>
        <Route component={() => <Redirect to='/login'/>}/>
    </Switch>
);


const AppRoutesPure = withRouter(({authenticated, userLoaded,  match}) => {
    const { path } = match;
    return authenticated ?
        <AuthenticatedRoutes path={path}
                             userLoaded={userLoaded}/>
        : <UnauthenticatedRoutes path={path}/>;

});

const AppRoutes = connect(
    (state) => ({authenticated: !!state.auth.tokenObj, userLoaded: !!state.user.user.user }), null, null,
    {pure: false}
)(AppRoutesPure);


export default AppRoutes;