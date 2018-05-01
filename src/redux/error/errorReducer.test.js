import * as errorActions from './errorActions';
import ErrorMessageTypes from './errorMessageTypes';
import errorReducer, { getAllFlashErrors, getTopFatalError, initialState } from './errorReducer';

describe('errorReducer', () => {
    it('should initialize properly', () => {
        expect(errorReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle an add Flash', () => {

        const errorAction = errorActions.addFlashError(ErrorMessageTypes.participantExportFailure);

        const { payload } = errorAction;
        const expected = {
            ...initialState,
            flashErrorIds: [payload.id],
            flashErrorsById: {
                [payload.id]: payload
            }
        };

        expect(errorReducer(
            initialState, errorAction
        )).toEqual(expected);
    });


    it('should be able to remove flash errors by Id', () => {


        const errorAction = errorActions.addFlashError({ ...ErrorMessageTypes.participantExportFailure, id: "1" });

        const errorActionRep = errorActions.addFlashError({ ...ErrorMessageTypes.participantExportFailure, id: "2"  });

        const { payload } = errorAction;
        const { payload: payloadRep } = errorActionRep;

        const initial = {
            ...initialState,
            flashErrorIds: [payload.id, payloadRep.id],
            flashErrorsById: {
                [payload.id]: payload,
                [payloadRep.id]: payloadRep
            }
        };

        const expected = {
            ...initialState,
            flashErrorIds: [payload.id],
            flashErrorsById: {
                [payload.id]: payload
            }
        };

        const removeAction = errorActions.removeFlashErrorById(payloadRep.id);

        expect(errorReducer(
            initial, removeAction
        )).toEqual(expected);

    });


    it("should be able to create a fatal error", () => {

        const errorAction = errorActions.addFatalError(ErrorMessageTypes.userFetchFailure);

        const { payload } = errorAction;
        const expected = {
            ...initialState,
            fatalErrors: [errorAction.payload]
        };

        expect(errorReducer(
            initialState, errorAction
        )).toEqual(expected);
    });


    describe('getAllFlashErrors', () => {

        it('should return an empty array when no errors are present', () => {
            expect(getAllFlashErrors({ error: errorReducer(initialState, {})})).toEqual([]);
        });


        it('should selected errors when present', () => {
            const errorAction = errorActions.addFlashError(ErrorMessageTypes.participantExportFailure);

            const state = {error: errorReducer(initialState, errorAction)};

            const expected = [ errorAction.payload ];
            const flashErrors = getAllFlashErrors(state);
            expect(flashErrors).toEqual(expected);
        });
    });

    describe('getTopFatalError', () => {
        it('should return an empty object if no fatal errors are present', () => {
            expect(getTopFatalError({ error: errorReducer(initialState, {})})).toEqual({});
        })
    })



});