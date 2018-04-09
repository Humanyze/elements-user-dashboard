import * as errorActions from './errorActions';

import errorReducer, { getCurrentError, initialState } from './errorReducer';

describe('errorReducer', () => {

    const basicError = {
        message: 'This page does not exist',
        code: 404,
        priority: 1
    };

    const createErrorWithPriority = (priority) => ({ ...basicError, priority });

    it('should add  error to state when triggered', () => {

        const expectedState = {
            ...initialState,
            errors: [...initialState.errors, basicError]
        };

        expect(
            errorReducer(initialState, errorActions.addError(basicError))
        ).toEqual(expectedState);
    });

    it('should clear all errors on clear Error', () => {
        // could just expect it to equal initialState
        const startState = {
            ...initialState,
            errors: [
                basicError,
                basicError,
                basicError
            ]
        };

        const expectedState = {
            ...initialState,
            errors: []
        };

        expect(errorReducer(startState, errorActions.clearErrors())).toEqual(expectedState);
    });


    describe('getCurrentError', () => {


        const errorlessRootState = {
            error: initialState
        };

        const multiErrorRootState = {
            error: {
                ...initialState,
                errors: [
                    createErrorWithPriority(1),
                    createErrorWithPriority(2),
                    createErrorWithPriority(4),
                    createErrorWithPriority(3)
                ]
            }
        };

        it ('should return highest priority error', () => {
            expect(getCurrentError(multiErrorRootState)).toEqual(createErrorWithPriority(4));
        });

        it('should return undefined if no errors are present', () => {
           expect(getCurrentError(errorlessRootState)).toEqual(undefined);
        });
    });
});