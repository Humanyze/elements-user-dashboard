import React from 'react';
import { connect } from 'react-redux';
import {  Switch, Route } from 'react-router-dom';

import ErrorManager from 'Common/error-manager/ErrorManager';
import { isUserAuthenticated } from 'Redux/common/auth/authReducer';
import LoadingUI from 'Common/loading/LoadingUI';
import { compose, lifecycle } from 'recompose';
import { setUserDataByAuthId } from 'Redux/common/userData/userDataActions';
import { getUserDataLoadStatus } from 'Redux/common/userData/userDataReducer';
import Logout from 'Src/components/action-routes/logout';

import Digital from './digital/Digital';

const onWillMount = lifecycle({
    componentDidMount() {
        this.props.setUserData();
    },
});


const AuthenticatedRoutes = compose(onWillMount)(({ userLoaded }) => {
    return userLoaded ? (
        <Switch>
            <Route component={Digital}/>
        </Switch>) : <LoadingUI/>
        ;

});

const LoginRedirect = () => <Route component={() => window.location.href = '/login'}/>;

const AppRoutesPure = ({ authenticated, userLoaded, setUserDataByAuthId }) => {

    if (!authenticated) {
        window.location.href = '/login';
        return null;
    }

    return (
        <div>
            <ErrorManager/>
            <Route path={'/logout'} component={Logout}/>
            {authenticated ?
                <AuthenticatedRoutes setUserData={setUserDataByAuthId}
                                     userLoaded={userLoaded}/>
                : <LoginRedirect/>
            }
        </div>
    );
};

const AppRoutes = connect(
    (state) => (
        {
            authenticated    : isUserAuthenticated(state),
            userLoaded       : getUserDataLoadStatus(state),
        }
    ), { setUserDataByAuthId }, null,
    { pure: false }
)(AppRoutesPure);

export default AppRoutes;
