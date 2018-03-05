import React from 'react';
import modalReducer, {initialState} from './modalReducer';
import * as ModalActions from './modalActions';

describe('modalReducer', () => {

    const modalObject = {
        type: "TEST_MODAL"
    };

    it('should initialize properly', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle openModal', () => {

        it('should handle an addition to new store', () => {
            const expected = {
                "modals": [
                    modalObject
                ]
            };

            expect(
                modalReducer(undefined, ModalActions.openModal(modalObject))
            ).toEqual(expected);
        });

        it('should allow for multiple modals to stack', () => {
            const initialState = {
                "modals": [
                    modalObject
                ]
            };

            const expected = {
                "modals": [
                    modalObject,
                    modalObject
                ]
            };

            expect(
                modalReducer(initialState, ModalActions.openModal(modalObject))
            ).toEqual(expected);

        })
    });


    it('should handle closeTopModal', () => {

        const initialState = {
            "modals": [
                modalObject
            ]
        };
        const expected = {
            "modals": []
        };

        expect(
            modalReducer(initialState, ModalActions.closeTopModal())
        ).toEqual(expected);

    });


    it('should handle closeAllModals', () => {

        const initialState = {
            "modals": [
                modalObject,
                modalObject
            ]
        };

        const expected = {
            "modals": []
        };

        expect(
            modalReducer(initialState, ModalActions.closeAllModals())
        ).toEqual(expected);

    });


});
