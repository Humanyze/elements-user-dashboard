import React from 'react';
import participantsReducer, { initialState } from './participantsReducer';
import { participantsFetchStarted } from './participantsActions';

describe('participantsReducer', () => {


    it('should initialize properly', () => {
        expect(participantsReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle participantsRequest', () => {

        const expected = {
            ...initialState,
            requestPending: true
        };

        expect(
            participantsReducer(null, participantsFetchStarted())
        );
    });
});
