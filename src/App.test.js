import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import createStore from './redux/createStore';
import { loginSuccessful } from 'ReduxCommon/auth/authActions';
import { userDataFetchSuccessful } from 'ReduxCommon/user-data/user/userActions';
import { mapUserResponse } from 'ReduxCommon/user-data/user/userResponseMapper';

// https://github.com/react-ga/react-ga/issues/133
jest.mock('react-ga');
// jest.mock('./elements-web-common/redux/AxiosRequestService', () => ({
//   getRequestWithAuth: jest.fn((url, bearerToken) => {
//       debugger;
//       console.log(url);
//       return Promise.resolve(42)
//   }),
// }));

describe('Application Startup', () => {
    let store = null;
    const { location } = window;

    beforeEach(() => {
        delete window.location;
        window.location =  {
            assign: jest.fn()
        };
        store = createStore().store;
    });

    afterEach(() => {
        window.location = location;
    })

    it('unAuthenticated render redirects', () => {
        const div = document.createElement('div');

        ReactDOM.render(<Provider store={store}><App/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(jest.isMockFunction(window.location.assign));
        expect(window.location.assign).toHaveBeenCalledTimes(2);
        expect(window.location.assign).toHaveBeenCalledWith('/login');
    });

    it('Authenticated user renders without crashing', () => {
        const div = document.createElement('div');
        const action = loginSuccessful({
            authInfo: {
                access_token: "8eb63d2effaa37989bbfc65a42d020148d438032",
                token_type: "Bearer",
                expires_in: 2419200,
                user_id: 325,
            }
        });

        store.dispatch(action);

        //TODO:  How to keep this up to date?
        const User = mapUserResponse({
            "date_joined": "2016-05-31T13:20:03",
            "email": "demo@humanyze.com",
            "features": {
                "deployment_dashboard": true,
                "digital_dashboard": true,
                "executive_dashboard": true,
                "individual_dashboard": true,
                "management_dashboard": true,
                "resource_uri": "/api/v1/userfeatures/325/",
                "show_1week": true,
                "user": "/api/v1/user/325/"},
                "first_name": "",
                "id": 325,
                "is_active": true,
                "is_staff": true,
                "is_superuser": true,
                "last_login": "2020-01-17T18:22:42",
                "last_name": "",
                "profile": {
                    "language": "en",
                    "resource_uri": "/api/v1/userprofile/325/",
                    "user": "/api/v1/user/325/"
                },
                "resource_uri": "/api/v1/user/325/",
                "roles": [
                    "/api/v1/role/mgr-part-dataset-5/",
                    "/api/v1/role/executive-dataset-5/",
                    "/api/v1/role/executive-dataset-22/",
                    "/api/v1/role/account-admin-dataset-5/",
                    "/api/v1/role/mgr-part-dataset-41/",
                    "/api/v1/role/executive-dataset-41/",
                    "/api/v1/role/account-admin-dataset-45/",
                    "/api/v1/role/deployment-admin-dataset-45/",
                    "/api/v1/role/executive-dataset-45/",
                    "/api/v1/role/deployment-admin-dataset-50/",
                    "/api/v1/role/participant-dataset-50/",
                    "/api/v1/role/deployment-admin-dataset-154/",
                    "/api/v1/role/executive-dataset-154/",
                    "/api/v1/role/executive-dataset-156/"
                ],
                "username": "demo@humanyze.com"
            });
        store.dispatch(userDataFetchSuccessful(User));

        ReactDOM.render(<Provider store={store}><App/></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);

        expect(jest.isMockFunction(window.location.assign));
        expect(window.location.assign).not.toHaveBeenCalled();
    });
});
