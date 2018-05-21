import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import UserAvatar, { UserAvatarPure } from './UserAvatar';
import { BrowserRouter } from 'react-router-dom';
import { RouterContext, StoreContext } from 'Src/tests/contextCreators';


const defaultProps = {
    username: '',
    userPermissions: {},
    avatar: '',
    dropdownLinks: [],
    showDropdown: false,
    toggleDropdown: () => {},
    onLogoutClicked: () => {},
    linkClicked: () => {},
    translations: {

    }
};

describe('userAvatar', () => {
    const component = mount(<StoreContext><RouterContext><UserAvatar/></RouterContext></StoreContext>);

    const getShowDropdownValue = () => component.find(UserAvatarPure).props().showDropdown;

    testRender(UserAvatarPure, defaultProps)();

    it('should not show dropdown initially', () => {
        expect(getShowDropdownValue()).toBeFalsy();
    });

    it('should show dropdown after clicking avatar', () => {
        component.find('.UserAvatar__avatar-icon').simulate('click');
        expect(getShowDropdownValue()).toBeTruthy();
        component.find('.UserAvatar__avatar-icon').simulate('click');
        expect(getShowDropdownValue()).toBeFalsy();
    });
});
