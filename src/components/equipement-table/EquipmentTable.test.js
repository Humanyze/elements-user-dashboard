import React from 'react';
import { shallow } from 'enzyme';
import EquipmentTable from './EquipmentTable';

const wrapper = shallow(<EquipmentTable />);

it('should render', () => {
    expect(wrapper).toHaveLength(1);
});