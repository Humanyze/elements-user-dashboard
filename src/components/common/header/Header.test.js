import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';


const wrapper = shallow(<Header/>);


it('should render', () => {
    expect(wrapper).toHaveLength(1);
});