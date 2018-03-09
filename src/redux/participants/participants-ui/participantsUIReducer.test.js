import participantsUIReducer, { initialState } from './participantsUIReducer';

describe('participantsUIReducer', () => {
    it('should initialize correctly',  () => {
       expect(participantsUIReducer(undefined, {})).toEqual(initialState);
    });
});