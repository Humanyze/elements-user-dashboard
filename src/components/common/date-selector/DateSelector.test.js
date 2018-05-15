import React from 'react';
import { DateSelectorPure } from './DateSelector';
import { mount } from 'enzyme/build/index';
import Moment from 'moment';

describe('fileUploadSelector', () => {

    const defaultProps = {
        translations: {},
        onChange: () => {},
        date: Moment()
    };

    testRender(DateSelectorPure, defaultProps)();


    it('should show the placeholder if not passed a date', () => {
        const component = mount(<DateSelectorPure {...defaultProps} date={null}/>);
        expect(component.find('.DateSelector__select-date-text')).toHaveLength(1);
    });

    it('should show the date if passed a date', () => {
        const component = mount(<DateSelectorPure {...defaultProps}/>);
        expect(component.find('.DateSelector__date-text')).toHaveLength(1);
    });
});

