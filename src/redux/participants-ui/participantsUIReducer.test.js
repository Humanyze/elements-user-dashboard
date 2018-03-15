import participantsUIReducer, {
    initialState,
    getCurrentPageNumber,
    getLimitPerPage,
    getTotalPageCount
} from './participantsUIReducer';
import * as participantsUIActions from './participantsUIActions';

describe('participantsUIReducer', () => {
    it('should initialize correctly', () => {
        expect(participantsUIReducer(undefined, {})).toEqual(initialState);
    });

    it('should set a page when setPage is received', () => {
        const pageNum = 4;
        const expectedState = {
            ...initialState,
            currentPageNumber: pageNum
        };
        expect(participantsUIReducer(undefined, participantsUIActions.setPage(pageNum))).toEqual(expectedState);
    });

    it('should set the limit perPage when setLimit is received', () => {
        const newLimit = 40;
        const expectedState = {
            ...initialState,
            limitPerPage: newLimit
        };
        expect(participantsUIReducer(undefined, participantsUIActions.setLimit(newLimit))).toEqual(expectedState);
    });

    describe('getCurrentPageNumber', () => {
        it('should return value of currentPageNumber', () => {
            const pageNum = 5;
            const state = {
                participantsUI: {
                    currentPageNumber: pageNum
                }
            };
            expect(getCurrentPageNumber(state)).toEqual(pageNum);
        });

    });

    describe('getLimitPerPage', () => {
        it('should return value of LimitPerPage', () => {
            const limit = 40;
            const state = {
                participantsUI: {
                    limitPerPage: limit
                }
            };
            expect(getLimitPerPage(state)).toEqual(limit);
        });
    });

    describe('getPageCount', () => {
        it('should return expected number of pages when participants is larger than limit', () => {
            const limit = 40;
            const totalParticipantss = 250;
            const expectedPages = 7;
            const state = {
                participants  : {
                    totalParticipantsCount: totalParticipantss
                },
                participantsUI: {
                    limitPerPage: limit
                }
            };
            expect(getTotalPageCount(state)).toEqual(expectedPages);
        });
        it('should return one page is limit is larger than participants', () => {
           const limit = 100;
           const totalParticipantss = 45;
           const expectedPages = 1;
            const state = {
                participants  : {
                    totalParticipantsCount: totalParticipantss
                },
                participantsUI: {
                    limitPerPage: limit
                }
            };
            expect(getTotalPageCount(state)).toEqual(expectedPages);
        });

        it('should be able to handle a totalParticipantsCount of 0', () => {
            const state = {
                participants  : {
                    totalParticipantsCount: 0
                },
                participantsUI: {
                    limitPerPage: 40
                }
            };
            expect(getTotalPageCount(state)).toEqual(1);
        });

    });

});