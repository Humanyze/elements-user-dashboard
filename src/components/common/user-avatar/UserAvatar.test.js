import React from 'react';
import {shallow, mount} from 'enzyme';
import UserAvatar, { UserAvatarPure } from './UserAvatar';

const comp = mount(<UserAvatar />);

const getShowDropdownValue = () => comp.find(UserAvatarPure).props().showDropdown;

testRender(UserAvatar)();

it('should not show dropdown initially', () => {
    expect(getShowDropdownValue()).toBeFalsy();
});

it('should show dropdown after clicking avatar', () => {
    comp.find('.UserAvatar__image').simulate('click');
    expect(getShowDropdownValue()).toBeTruthy();
    comp.find('.UserAvatar__image').simulate('click');
    expect(getShowDropdownValue()).toBeFalsy();
});