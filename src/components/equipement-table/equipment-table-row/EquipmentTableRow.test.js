import React from 'react';
import {shallow} from 'enzyme';
import EquipmentTableRow from './EquipmentTableRow';

const requiredParams = {
element: {alias: 'test'}
};


const wrapper = shallow(<EquipmentTableRow element={requiredParams.element}/>);


it('should render', () => {
    expect(wrapper).toHaveLength(1);
});