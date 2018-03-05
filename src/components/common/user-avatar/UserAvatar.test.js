import React from 'react';
import {shallow} from 'enzyme';
import UserAvatar from './UserAvatar';

const wrapper = shallow(<UserAvatar />);

const findDropdown = () => wrapper.find('.UserAvatar__dropdown');

it('should render', () => {
    expect(wrapper).toHaveLength(1);
});

it('should not show dropdown initially', () => {
    expect(findDropdown()).toHaveLength(0);
});

it('should show show dropdown after clicking avatar', () => {
    wrapper.find('.UserAvatar__image').simulate('click');
    expect(findDropdown()).toHaveLength(1);    
    wrapper.find('.UserAvatar__image').simulate('click');    
    expect(findDropdown()).toHaveLength(0);        
});