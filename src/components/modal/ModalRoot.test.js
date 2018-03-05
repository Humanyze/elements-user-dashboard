import React from 'react';
import {shallow} from 'enzyme';

import { ModalRootPure } from "./ModalRoot";
import MODAL_TYPES from './modalTypes';

describe("ModalRoot", () => {

    it('should return null if no modal is selected', () => {
        const wrapper = shallow(
            <ModalRootPure openModals={[]}
                           closeModal={() => {}} />
        );
        expect(wrapper.html()).toBe(null);
    });


    it('should return Modal Component if passed valid type', () => {
        const wrapper = shallow(
            <ModalRootPure openModals={[MODAL_TYPES.IMPORT_EQUIPMENT_MODAL]}
                           closeModal={() => {}} />
        );

        expect(wrapper.html()).not.toBe(null);
    });

    it('should return null and console.error if an invalid modal is passed', () => {
        const wrapper = shallow(
            <ModalRootPure openModals={['BAD_MODAL_TYPE_ERROR']}
                           closeModal={() => {}} />
        );

        expect(wrapper.html()).toBe(null);
    })
});