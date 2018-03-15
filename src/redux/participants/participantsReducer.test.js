import participantsReducer, {
    initialState,
    getParticipantSelectedById,
    getTotalParticipantsCount,
    getRequestPendingStatus,
    getParticipantsById,
    getAllParticipants
} from './participantsReducer';
import {participantsFetchStarted} from './participantsActions';

describe('participantsReducer', () => {
    const expectedName = 'oneNameExpected';

    const mockParticipantsById = {
        '1': {
            id  : '1',
            name: 'lol'
        },
        '2': {
            id  : '2',
            name: expectedName
        },
        '3': {
            id  : '3',
            name: 'haha'
        }
    };

    it('should initialize properly', () => {
        expect(participantsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle participantsRequest', () => {
        const expected = {
            ...initialState,
            requestPending: true
        };
        expect(
            participantsReducer(undefined, participantsFetchStarted())
        ).toEqual(expected);
    });

    describe('getParticipantById', () => {
        it('should return a participant By its Id', () => {
            const state = {
                participants: {
                    participantsById: mockParticipantsById
                }
            };
            expect(getParticipantSelectedById('2')(state).name).toEqual(expectedName);
        });
    });

    describe('getTotalParticipantsCount', () => {
        it('should return stored value in totalParticipantsCount', () => {
            const count = 141;
            const state = {
                participants: {
                    totalParticipantsCount: count
                }
            };

            expect(getTotalParticipantsCount(state)).toBe(count);
        });
    });
    describe('getTotalParticipantsCount', () => {

    });

    describe('getRequestPendingStatus', () => {

    });

    describe('getParticipantsById', () => {
        it('should return value of participantsById', () => {
            const state = {
                participants: {
                    participantsById: mockParticipantsById
                }
            };
            expect(getParticipantsById(state)).toEqual(mockParticipantsById);
        });
    });

    describe('getAllParticipants', () => {
        const state = {
            participants: {
                participantsById: mockParticipantsById
            }
        };
        const expectedArray = [
            {
                id  : '1',
                name: 'lol'
            }, {
                id  : '2',
                name: expectedName
            }, {
                id  : '3',
                name: 'haha'
            }
        ];
        expect(
            getAllParticipants(state)).toEqual(expectedArray);
    });
});
