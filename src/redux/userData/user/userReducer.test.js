import userReducer, {initialState} from './userReducer';
import * as UserActions from './userActions';

describe('userReducer', () => {


    it('should initialize properly', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle userRequest', () => {

        const expected = {
            ...initialState,
            fetching: true
        };

        expect(
            userReducer(initialState, UserActions.userDataFetchRequested())
        ).toEqual(expected);
    })
});
