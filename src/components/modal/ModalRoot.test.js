import React from 'react';
import {mount, shallow} from 'enzyme';

import {ModalRootPure} from "./ModalRoot";
import MODAL_TYPES from './modalTypes';
import createStore from '../../redux/createStore';
import {Provider} from "react-redux";

describe("ModalRoot", () => {
    it('should return null if no modal is selected', () => {
        const wrapper = shallow(
            <ModalRootPure openModal={{}}
                           closeModal={() => {
                           }}/>
        );
        expect(wrapper.html()).toBe(null);
    });

    it('should return null if invalid ModalType is passed', () => {
        const wrapper = shallow(
            <ModalRootPure openModal={{type: 'BAD_MODAL_TYPE_ERROR'}}
                           closeModal={() => {
                           }}/>
        );

        expect(wrapper.html()).toBe(null);
    });

    it('should return Modal Component if passed valid type', () => {
        const { store } = createStore();

        const wrapper = mount(
            <Provider store={store}>
                <ModalRootPure openModal={{type: MODAL_TYPES.IMPORT_EQUIPMENT_MODAL}}
                               closeModal={() => {
                               }}/>
            </Provider>
        );

        expect(wrapper.html()).not.toBe(null);
    });
});