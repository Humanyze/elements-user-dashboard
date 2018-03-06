import React from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router';
import {Switch, Route} from 'react-router-dom';

import Deployment from './deployment/Deployment';
import Login from "../Login";

const AuthenticatedRoutes = ({path}) => {
    return (
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


const AppRoutesPure = withRouter(({authenticated, match}) => {
    const { path } = match;
    return authenticated ? <AuthenticatedRoutes path={path}/> : <UnauthenticatedRoutes path={path}/>;

});

const AppRoutes = connect(
    (state) => ({authenticated: !!state.auth.tokenObj}), null, null,
    {pure: false}
)(AppRoutesPure);


export default AppRoutes;