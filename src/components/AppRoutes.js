import React from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Deployment from './deployment/Deployment';
import { getCurrentError } from '../redux/error/errorReducer';
import ErrorPage from './error-page/ErrorPage';
import { isUserAuthenticated } from 'Redux/auth/authReducer';
import LoadingUI from 'Common/loading/LoadingUI';
import { compose, lifecycle } from 'recompose';
import { setUserDataByAuthId } from 'Redux/userData/userDataActions';
import { getUserDataLoadStatus } from 'Redux/userData/userDataReducer';

// import Login from '../Login';



const onWillMount = lifecycle({
    componentWillMount() {
        this.props.setUserData();
    }
});


const AuthenticatedRoutes = compose(onWillMount)(({ path, userLoaded }) => {
    return userLoaded && (
        <Switch>
            <Route component={Deployment}/>
            {/*<Route component={() => <Redirect to={`${path}`}/>}/>*/}
        </Switch>
    );
});


const LoginRedirect = () => <Route component={() => window.location.href='/login' }/>;

const AppRoutesPure = withRouter(({ authenticated, userLoaded, error, match, setUserDataByAuthId }) => {
    if (error) return <ErrorPage error={error}/>;

    if (!authenticated)  {
        window.location.href='/login';
        return null;
    }

    const { path } = match;

    return authenticated ?
        <AuthenticatedRoutes path={path}
                             setUserData={setUserDataByAuthId}
                             userLoaded={userLoaded}/> || <LoadingUI/>
        : <LoginRedirect />;

});

const AppRoutes = connect(
    (state) => (
        {
            authenticated: isUserAuthenticated(state),
            userLoaded: getUserDataLoadStatus(state),
            error: getCurrentError(state)
        }
    ), { setUserDataByAuthId  }, null,
    { pure: false }
)(AppRoutesPure);


export default AppRoutes;