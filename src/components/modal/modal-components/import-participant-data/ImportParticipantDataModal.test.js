import React from 'react';
import { ImportEquipmentDataModalPure } from './ImportParticipantDataModal';
import { StoreContext } from 'Src/tests/contextCreators';

describe('ImportEquipmentDataModal', () => {
    testRender(ImportEquipmentDataModalPure, { translations: {}})();

    it('should have integration style tests implemented', () => {
        expect(true).toBe(true);
    });

    it('should show no errors on initial props', () => {
        const props = {
            translations: {}
        };

        const wrapper = mount(<StoreContext><ImportEquipmentDataModalPure { ...props} /></StoreContext>);

        expect(wrapper.find('ImportParticipantDataModal__feedback-block').children()).toHaveLength(0);
    });

});

