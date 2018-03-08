import userReducer, {initialState} from './userReducer';
import * as UserActions from './userActions';

describe('userReducer', () => {


    it('should initialize properly', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle userRequest', () => {

        const expected = {
            ...initialState,
            requestPending: true
        };

        expect(
            userReducer(initialState, UserActions.userDataFetchRequested())
        ).toEqual(expected);
    });


    it('should set userdata on fetch-successful', () => {
        const userData = {
            username: 'demo',
        };
        const expected = {
            ...initialState,
            user: userData
        };

        expect(
            userReducer(initialState, UserActions.userDataFetchSuccessful(userData))
        ).toEqual(expected);
    });

    it('should set requestPending to false on failure', () => {
        const startState = {
            ...initialState,
            requestPending: true
        };

        expect(userReducer(startState, UserActions.userDataFetchFailed())).toEqual(initialState);
    })
});
