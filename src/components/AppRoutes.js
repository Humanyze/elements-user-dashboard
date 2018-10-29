import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Deployment from './deployment/Deployment';
import ErrorManager from 'Common/error-manager/ErrorManager';
import { isUserAuthenticated } from 'Redux/common/auth/authReducer';
import LoadingUI from 'Common/loading/LoadingUI';
import { compose, lifecycle } from 'recompose';
import { setUserDataByAuthId } from 'Redux/common/userData/userDataActions';
import { getUserDataLoadStatus } from 'Redux/common/userData/userDataReducer';
import Logout from 'Src/components/action-routes/logout';


const onWillMount = lifecycle({
    componentDidMount() {
        this.props.setUserData();
    }
});


const AuthenticatedRoutes = compose(onWillMount)(({ path, userLoaded }) => {
    return userLoaded ? (
        <Switch>
            <Route component={Deployment}/>
        </Switch>) : <LoadingUI/>;

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
            userLoaded   : getUserDataLoadStatus(state),
        }
    ), { setUserDataByAuthId }, null,
    { pure: false }
)(AppRoutesPure);


export default AppRoutes;