import participantReducer, { initialState } from './participantReducer';
import * as ParticipantActions from './participantActions';

describe('participantReducer', () => {


    it('should initialize properly', () => {
        expect(participantReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle participantDataRequestw', () => {

        const expected = {
            ...initialState,
            fetching: true
        };

        expect(
            participantReducer(initialState, ParticipantActions.participantDataFetchRequested())
        ).toEqual(expected);
    })
});
