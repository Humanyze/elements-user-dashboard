import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Deployment from './deployment/Deployment';
import ErrorManager from './error-manager/ErrorManager';
import { isUserAuthenticated } from 'Redux/auth/authReducer';
import LoadingUI from 'Common/loading/LoadingUI';
import { compose, lifecycle } from 'recompose';
import { setUserDataByAuthId } from 'Redux/userData/userDataActions';
import { getUserDataLoadStatus } from 'Redux/userData/userDataReducer';
import Logout from 'Src/components/action-routes/logout';


const onWillMount = lifecycle({
    componentWillMount() {
        this.props.setUserData();
    }
});


const AuthenticatedRoutes = compose(onWillMount)(({ path, userLoaded }) => {
    return userLoaded ? (
        <Switch>
            <Route component={Deployment}/>
        </Switch>): null
        ;

});


const LoginRedirect = () => <Route component={() => window.location.href = '/login'}/>;

const AppRoutesPure = withRouter(({ authenticated, userLoaded, match, setUserDataByAuthId }) => {

    if (!authenticated) {
        window.location.href = '/login';
        return null;
    }

    const { path } = match;

    return (
        <div>
            <ErrorManager/>
            <Route path={'/logout'} component={Logout}/>
                {authenticated ?
                <AuthenticatedRoutes path={path}
                                     setUserData={setUserDataByAuthId}
                                     userLoaded={userLoaded}/> || <LoadingUI/>
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
    ), { setUserDataByAuthId }, null,
    { pure: false }
)(AppRoutesPure);


export default AppRoutes;