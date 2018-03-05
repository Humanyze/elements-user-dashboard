import React from 'react';
import modalReducer, {initialState} from './modalReducer';
import * as ModalActions from './modalActions';

describe('modalReducer', () => {

    const modalType = "TEST_MODAL";

    it('should initialize properly', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState);
    });


    it('should handle openModal', () => {

        it('should handle an addition to new store', () => {
            const expected = {
                "modals": [
                    modalType
                ]
            };

            expect(
                modalReducer(undefined, ModalActions.openModal(modalType))
            ).toEqual(expected);
        });

        it('should allow for multiple modals to stack', () => {
            const initialState = {
                "modals": [
                    modalType
                ]
            };

            const expected = {
                "modals": [
                    modalType,
                    modalType
                ]
            };

            expect(
                modalReducer(initialState, ModalActions.openModal(modalType))
            ).toEqual(expected);

        })
    });


    it('should handle closeTopModal', () => {

        const initialState = {
            "modals": [
                modalType
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
                modalType,
                modalType
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
