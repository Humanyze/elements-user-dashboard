import React from 'react';
import authReducer, { initialState } from './authReducer';
import * as AuthActions from './authActions';

describe('authReducer', () => {


    it('should initialize properly', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle authRequestStart', () => {

        const expected = {
            ...initialState,
            requestPending: true
        };

        expect(
            authReducer(null, AuthActions.loginRequested())
        );
    });
});
