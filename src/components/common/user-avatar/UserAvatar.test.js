import React from 'react';
import {shallow, mount} from 'enzyme';
import UserAvatar, { UserAvatarPure } from './UserAvatar';
import createStore from 'Redux/createStore';

import {Provider} from 'react-redux';
const { store } = createStore();


const comp = mount(<Provider store={store}><UserAvatar/></Provider>);

const getShowDropdownValue = () => comp.find(UserAvatarPure).props().showDropdown;

testRender(UserAvatarPure)();

it('should not show dropdown initially', () => {
    expect(getShowDropdownValue()).toBeFalsy();
});

it('should show dropdown after clicking avatar', () => {
    comp.find('.UserAvatar__image').simulate('click');
    expect(getShowDropdownValue()).toBeTruthy();
    comp.find('.UserAvatar__image').simulate('click');
    expect(getShowDropdownValue()).toBeFalsy();
});