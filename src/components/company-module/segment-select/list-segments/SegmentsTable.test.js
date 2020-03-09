import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { defaultProps, withSegments } from './SegmentsTable.story'
import SegmentsTable from './SegmentsTable';

describe('Segments Table', () => {

    it('should sort the data by name when the sort button is clicked', () => {
        const wrapper = mount(<SegmentsTable {...defaultProps} {...withSegments} />);
        expect(wrapper.find('.td.name').first().text()).toBe("test_engagement");
        //expect(toJson(wrapper)).toMatchSnapshot('unsorted-segments');  /* this is causing node to crash */

        // The name column is sortable
        let node = wrapper.find({'data-test':'sort-name'});
        expect(node.find('.sortable').length).toBe(1);

        // it sorts ascending first
        node.simulate('click');
        node = wrapper.find({'data-test':'sort-name'});
        expect(node.find('.ascending').length).toBe(1);
        expect(wrapper.find('.td.name').first().text()).toBe("humanyze_engagement");
        //expect(toJson(wrapper)).toMatchSnapshot('sorted-ascending');  /* this is causing node to crash */

        // Then it sorts descending
        node.simulate('click');
        node = wrapper.find({'data-test':'sort-name'});
        expect(node.find('.ascending').length).toBe(1);
        expect(wrapper.find('.td.name').first().text()).toBe("test_engagement_4000");
        //expect(toJson(wrapper)).toMatchSnapshot('sorted-descending');  /* this is causing node to crash */

    });
});
