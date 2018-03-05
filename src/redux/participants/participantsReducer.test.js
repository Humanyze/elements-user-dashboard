import React from 'react';
import participantsReducer, {initialState} from './participantsReducer';
import * as ParticipantsActions from './participantsActions';

describe('participantsReducer', () => {


    it('should initialize properly', () => {
        expect(participantsReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle participantsRequest', () => {

        const expected = {
            ...initialState,
            fetching: true
        };

        expect(
            participantsReducer(null, ParticipantsActions.participantsFetchStarted())
        )
    })
});
