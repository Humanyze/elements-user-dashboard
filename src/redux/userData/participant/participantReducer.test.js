import participantReducer, {initialState} from './participantReducer';
import * as ParticipantActions from './participantActions';

describe('participantReducer', () => {


    it('should initialize properly', () => {
        expect(participantReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle participantDataRequest', () => {

        const expected = {
            ...initialState,
            requestPending: true
        };

        expect(
            participantReducer(initialState, ParticipantActions.participantDataFetchRequested())
        ).toEqual(expected);
    })
});
