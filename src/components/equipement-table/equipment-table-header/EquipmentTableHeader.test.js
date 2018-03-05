import React from 'react';
import {shallow} from 'enzyme';
import EquipmentTableHeader from './EquipmentTableHeader';


const wrapper = shallow(<EquipmentTableHeader />);


it('should render', () => {
    expect(wrapper).toHaveLength(1);
});